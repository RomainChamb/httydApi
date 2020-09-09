import { log, join } from "../src/deps.ts";

export class FileReader {

    constructor() {}
    
    async readJson(directory: string, fileName: string) {
        log.info("readJson start");
        const path = join(directory, fileName);
        log.info(`Reading json from path : ${path}`);
        const dataString = await Deno.readTextFile(path);
        log.info("readJson end")
        return JSON.parse(dataString);
    }

}