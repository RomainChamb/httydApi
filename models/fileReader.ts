import { join } from "https://deno.land/std@0.61.0/path/mod.ts";
import { Viking } from "./VikingInterface.ts";

export class FileReader {

    constructor() {}
    
    async readJson(directory: string, fileName: string) {
        const path = join(directory, fileName);
    
        const dataString = await Deno.readTextFile(path);
        return JSON.parse(dataString);
    }

}