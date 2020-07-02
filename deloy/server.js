const Echo = require("./dist");
const { constants } = require('crypto');
var options = {
    authHost: 'http://app:8001',
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
            "metadata.broker.list": "moped-01.srvs.cloudkafka.com:9094,moped-02.srvs.cloudkafka.com:9094,moped-03.srvs.cloudkafka.com:9094",
            "socket.keepalive.enable": true,
            "security.protocol": "SASL_SSL",
            "sasl.mechanisms": "SCRAM-SHA-256",
            "sasl.username": "a830y1na",
            "sasl.password": "ShGeGU7mi30Yp0tyUpYXBNmQF2kiyvBu",
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
