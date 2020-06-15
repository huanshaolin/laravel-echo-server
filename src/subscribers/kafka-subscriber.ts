import {Subscriber} from "./subscriber";
var Kafka = require("node-rdkafka");
import { Log } from './../log';

export class KafkaSubscribe implements Subscriber {
    /**
     * Kafka consumer
     */
    private consumer:any;

    /**
     * Create a new instance of subcriber
     * Example option :
     * options require 2 key: config connect and name topic
     * topic must is array string
     */
    constructor(private options:any) {
        this.consumer = new Kafka.KafkaConsumer(options.databaseConfig.kafka, {
            "auto.offset.reset": "beginning"
        })
    }
    /**
     * Subscribe to events to broadcast.
     */
    subscribe(callback):Promise<any> {
        return new Promise((resolve,reject)=>{
            this.consumer.on("error", function(err) {
              console.log("=====================",err)
                reject(err)
            })
            this.consumer.on("ready", function(arg) {
                Log.success(`Consumer ${arg.name} ready`);
                this.consumer.subscribe(this.options.otherConfig.kafkaTopics);
                this.consumer.consume();
                resolve();
              });

            this.consumer.on("data", function(message) {
              if(!this.options.databaseConfig.kafka["enable.auto.commit"]){
                this.consumer.commit(message);
              }
                
              try {
                message = JSON.parse(message.value.toString());

                if (this.options.devMode) {
                    Log.info("Channel: " + message.channel);
                    Log.info("Event: " + message.event);
                }
                callback(message.channel, message);
              } catch (e) {
                  if (this.options.devMode) {
                      Log.info("No JSON message");
                  }
              }
              });
            this.consumer.on("disconnected", function(arg) {
                process.exit();
              });
            this.consumer.on('event.error', function(err) {
                console.error(err);
                reject(err)
              });
            this.consumer.on('event.log', function(log) {
                console.log(log);
            });
        })
    }
}