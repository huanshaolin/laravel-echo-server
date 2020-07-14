export interface Subscriber {
    /**
     * Subscribe to incoming events.
     *
     * @param  {Function} callback
     * @return {void}
     */
    subscribe(callback: Function): Promise<any>;
}

export interface RabbitMQOption {
    //Uri connect rabbitmq example: amqp://guest:guest@localhost:5672/
    uri:string

    //Name queue connect to rabbitmq
    queue:string

    durable:boolean
}