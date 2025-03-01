import { kafka } from "./client.js";

async function init() {
    const admin = kafka.admin(); 
    console.log("admin connecting...");
    await admin.connect();
    console.log("admin connected...");

    console.log("creating topic [rider-updates]...");
    await admin.createTopics({
        topics: [{
            topic: 'rider-updates',
            numPartitions: 2,
        }]
    })
    console.log("topic created [rider-updates]");
    console.log("disconnecting admin...");
    await admin.disconnect();
    console.log("admin disconnected");
}

init();
