const Echo = require("./dist");
const { constants } = require('crypto');
var options = {
    authHost: process.env.AUTH_HOST,
    authEndpoint: process.env.AUTH_ENDPOINT,
    clients: [],
    database: 'sqlite',
    databaseConfig: {
        redis: {},
        sqlite: {
            databasePath: '/database/laravel-echo-server.sqlite'
        },
        kafka:{
            "group.id": "a830y1na-echo",
            "metadata.broker.list": "207.46.227.84:9092,207.46.227.84:9093,207.46.227.84:9094",
            "socket.keepalive.enable": true,
            // "debug": "generic,broker,security",
            'enable.auto.commit':true,
        },
        rabbimmq:{
            uri:process.env.RABBITMQ_URI,
            queue:process.env.RABBITMQ_QUEUE,
            durable:true
        }
    },
    devMode: true,
    host: "0.0.0.0",
    port: 6001,
    protocol: "http",
    socketio: {},
    secureOptions: constants.SSL_OP_NO_TLSv1,
    sslCertPath: '',
    sslKeyPath: '',
    sslCertChainPath: '',
    sslPassphrase: '',
    subscribers: {
        http: true,
        redis: false,
        kafka:false,
        rabbitmq:true
    },
    apiOriginAllow: {
        allowCors: false,
        allowOrigin: '',
        allowMethods: '',
        allowHeaders: ''
    },
    otherConfig:{
        kafkaTopics:["a830y1na-default"],
    }
};

Echo.run(options);
