import { join } from "https://deno.land/std@0.61.0/path/mod.ts";
import * as log from "https://deno.land/std@0.61.0/log/mod.ts";

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