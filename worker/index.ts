import { createClient } from "redis";

async function main() {
    const client = await createClient()
    .on("error", (err) => console.log("Redis Cilent Error", err))
    .connect();

    const res = await client.xReadGroup(process.env.REGIONS, process.env.WORKER_NAME, {
        key: "uptime-watch:website",
        id: ">"
    }, {
        COUNT: 2
    })

    if (!res) {
        client.destroy();
        return;
    }
}