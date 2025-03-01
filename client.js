const {Kafka} = require("kafkajs");

exports.kafka = new Kafka({
    brokers: ["192.168.31.134:9092"],
    clientId: "my-app",
});