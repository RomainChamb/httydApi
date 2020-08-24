import * as log from "https://deno.land/std@0.61.0/log/mod.ts";

import { Dragon, retrieveAndConvertData as getAllDragons } from "./dragons";
import { Viking, retrieveAndConvertData as getAllVikings } from "./vikings"

interface Characters {
    type: "Dragon" | "Viking";
    payload: Dragon | Viking
}

async function retrieveCharacters(): Promise<Array<Characters>> {
    log.info("Retrieving all characters start...");
    const dragons: Array<Characters> = (await getAllDragons()).map((dragon: Dragon) => Object.assign({
        type: "Dragon",
        payload: dragon
    }));
    const vikings: Array<Characters> = (await getAllVikings()).map((viking: Viking) => Object.assign({
        type: "Viking",
        payload: viking
    }));
    const characters: Array<Characters> = dragons.concat(vikings);
    log.info("Retrieving all characters end...");
    return characters;
}