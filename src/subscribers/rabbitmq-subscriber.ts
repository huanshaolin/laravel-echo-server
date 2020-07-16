import {Subscriber,RabbitMQOption} from "./subscriber";
import { Log } from './../log';
import * as amqp from "amqplib/callback_api";

export class RMQSubscribe implements Subscriber {

    private option:RabbitMQOption;

    /**
     * Create a new instance of subcriber
     * Example option :
     * options require 2 key: config connect and name topic
     * topic must is array string
     */
    constructor(private options:any) {
        this.option = options.databaseConfig.rabbimmq as RabbitMQOption
    }
    /**
     * Subscribe to events to broadcast.
     */
    subscribe(callback):Promise<any> {
        return new Promise((resolve,reject)=>{
            console.log(this.option)
            amqp.connect(this.option.uri, (error, connection)=> {
                if(error) reject(error);
                connection.createChannel((error, channel) =>{
                    if(error) reject(error);
                    var queue = this.option.queue;

                    channel.assertQueue(queue, {
                        durable: this.option.durable
                    });
                    channel.prefetch(1);
                    console.log(" [*] Waiting for messages in %s", queue);
                    channel.consume(queue, (msg)=> {
                        try {
                            Log.info("===="+msg.content.toString())
                            let message = JSON.parse(msg.content.toString());

                            if (this.options.devMode) {
                                Log.info("Channel: " + message.channel);
                                Log.info("Event: " + message.event);
                            }
                            callback(message.channel, message);
                            channel.ack(msg);
                        } catch (e) {
                            if (this.options.devMode) {
                                Log.info("No JSON message");
                            }
                        }
                    }, {
                        noAck: false
                    });
                    resolve();
                });
            });
        })
    }
}