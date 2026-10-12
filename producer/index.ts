import { createClient } from "redis";

async function main() {
    const client = await createClient()
    .on("error", (err) => console.log("Redis client error", err))
    .connect()

    const res = await client.xAdd('uptime-watch:website', "*", {
        url: "https://youtube.com",
        id: "1"
    })
    console.log(res);
    client.destroy()
}

main();