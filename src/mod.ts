import { Application, Context } from "./deps.ts";
import { log } from "./deps.ts";

import api from "./api.ts";

const app = new Application();
const PORT = 8001;

const fileHandler = new log.handlers.FileHandler("INFO", {
    filename: "./log/httydLog.txt",
    formatter: "{datetime} - {levelName} : {msg}",
    mode: 'a',
});

await log.setup({
    handlers: {
        console: new log.handlers.ConsoleHandler("INFO"),
        file: fileHandler,
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
    fileHandler.flush();
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










