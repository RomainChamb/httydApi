import { desc, task, sh, run } from "https://deno.land/x/drake@v1.2.5/mod.ts";

desc("Run API")
task("start", [], async function() {
    await sh (
        "deno run --allow-write=\"./log/\" --allow-net --allow-read=\"./data/\" src/mod.ts"
    );
});

desc("Test API")
task("test", [], function() {
    sh(
        "deno test"
    );
});

run();

