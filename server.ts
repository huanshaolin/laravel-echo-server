const Echo = require("./src");
const { constants } = require('crypto');

var options = {
    authHost: 'http://localhost:8000',
    authEndpoint: '/auth/broadcasting',
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
        kafka:true,
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
