import { configDotenv } from "dotenv";
configDotenv();
import mqtt from "mqtt";
import { createClient } from 'redis';

const mqttTopics:string[] = [
    "sensors/temperature_in",
    "sensors/temperature_out",
    "sensors/humidity",
    "sensors/pressure"
]

const mqttClient = mqtt.connect(process.env.MQTT_BROKER_URL, {
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD
});

const redisClient = createClient({url: process.env.REDIS_URL});
redisClient.on('error', (error) => console.log('redis client error: ', error));
redisClient.on('connect', () => console.log('redis client connected'))
redisClient.connect();
const pubClient = redisClient.duplicate();
pubClient.connect();

// MQTT handlers
mqttClient.on('message', async (topic:string, message:Buffer, packet: mqtt.IPublishPacket) => {
    // caching the value once received
    const payload = {
        value: message.toString(),
        timestamp: new Date().toISOString()
    }
    await redisClient.json.set(topic, '$', payload);
    pubClient.publish('new_value', topic);
});

// subscribing to given topics once connected
mqttClient.on('connect', () => {
    console.log("connected to broker");
    mqttClient.subscribe(mqttTopics);
})

console.log("service started!");