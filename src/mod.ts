import { Application, Context } from "https://deno.land/x/oak@v6.0.1/mod.ts";
import * as log from "https://deno.land/std@0.62.0/log/mod.ts";

import api from "./api.ts";

const app = new Application();
const PORT = 8000;

await log.setup({
    handlers: {
        console: new log.handlers.ConsoleHandler("INFO"),
        file: new log.handlers.FileHandler("INFO", {
            filename: "./log/httydLog.txt",
            formatter: "{datetime} - {levelName} : {msg}",
            mode: 'a',
        }),
    },
    loggers: {
        default: {
            level: "INFO",
            handlers: ["console", "file"],
        },
    },
});

app.addEventListener("error", (event) => {
    log.error(event.error.message);
});

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.response.body = "Internal server error.";
        throw err;
    }
});

app.use(api.routes());
app.use(api.allowedMethods());

if (import.meta.main) {
    log.info(`Starting on port : ${PORT}....`);
    await app.listen({
        port: PORT,
    });
}










