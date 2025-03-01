import { kafka } from "./client.js";
import readLine from "readline";

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init() {
  const producer = kafka.producer();
  console.log("Connecting producer...");
  await producer.connect();
  console.log("Producer connected!");

  rl.setPrompt(">");
  rl.prompt();
  rl.on("line", async function (line) {
    const [riderName, location] = line.split(" ");
    await producer.send({
      topic: "rider-updates",
      messages: [
        {
          partition: location.toLocaleLowerCase() === "north" ? 0 : 1,
          key: "location-updates",
          value: JSON.stringify({ name: riderName, location }),
        },
      ],
    });
  }).on("close", async () => {
    await producer.disconnect();
  });

}

init();
