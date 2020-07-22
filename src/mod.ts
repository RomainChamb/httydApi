import { Application } from "https://deno.land/x/oak@v6.0.1/mod.ts";
import * as log from "https://deno.land/std@0.61.0/log/mod.ts"

const app = new Application();
const PORT = 8000;

await log.setup({
    handlers: {
        console: new log.handlers.ConsoleHandler("INFO"),
        file: new log.handlers.FileHandler("ERROR", {
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










