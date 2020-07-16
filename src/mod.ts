import { join } from "https://deno.land/std@0.61.0/path/mod.ts";

import { FileReader } from "../models/fileReader.ts"

interface Viking {
    id: number;
    firstName: string;
    lastName: string;
    tribe: string;
    gender: string;
    height: string;
    eyes: string;
    weapon: string;
    location: string;
    image: string;
}


const vikingsList = (await new FileReader().readJson("data", "vikings.json") as Array<Viking>).filter((viking: Viking) => viking.id === 1);

console.log(vikingsList);




