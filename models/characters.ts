import { log } from "../src/deps.ts";

import { Dragon, retrieveAndConvertData as getAllDragons } from "./dragons.ts";
import { Viking, retrieveAndConvertData as getAllVikings } from "./vikings.ts"

export interface Character {
    type: string;
    payload: Dragon | Viking
}

async function retrieveCharacters(): Promise<Array<Character>> {
    log.info("Retrieving all characters start...");
    const dragons: Array<Character> = (await getAllDragons()).map((dragon: Dragon) => Object.assign({
        type: "Dragon",
        payload: dragon
    }));
    const vikings: Array<Character> = (await getAllVikings()).map((viking: Viking) => Object.assign({
        type: "Viking",
        payload: viking
    }));
    const characters: Array<Character> = dragons.concat(vikings);
    log.info("Retrieving all characters end...");
    return characters;
}

export async function getAll(): Promise<Array<Character> | Error> {
    log.info("GetAll Character start...");
    const characters = await retrieveCharacters();
    if (characters != null && characters != undefined && characters.length > 0) {
        log.info("GetAll Character end...")
        return characters;
    }
    throw new Error("No characters found !");
}

export async function getRandom(number: number): Promise<Array<Character> | Error> {
    log.info("GetRandom start...");
    const characters = await retrieveCharacters();
    if (number === 0) {
        log.error("Impossible to search for 0 characters");
        throw new Error("Please choose a number higher than 0");
    } else if (characters != null && characters != undefined && number > characters.length) {
        log.error(`${number} is higher than the number of vikings : ${characters.length}`);
        throw new Error(`Please choose a number higher than 0 and lower than ${characters.length}`);
    } else if (characters != null && characters != undefined && characters.length > 0) {
        return await getRandomCharacters(number, characters);
    }
    log.error("No available data");
    throw new Error("No Characters found !");
}

export async function getRandomCharacters(number: number, characters: Array<Character>) {
    const randomCharacters = new Map<number, Character>();
    while (randomCharacters.size<number) {
        const randomType = Math.floor(Math.random() * 2) === 0 ? "Dragon" : "Viking";
        const filteredByType = filterByType(randomType, characters);
        const randomId = Math.floor((Math.random() * filteredByType.length) + 1);
        if (randomCharacters.size === 0) {
            const randomCharacter = filterById(randomId, filteredByType);
            randomCharacters.set(randomId, randomCharacter[0]);
        } else if (!randomCharacters.has(randomId)) {
            const randomCharacter = filterById(randomId, filteredByType);
            randomCharacters.set(randomId, randomCharacter[0]);
        }
    }
    log.info(`${number} character(s) found!`);
    return [...randomCharacters.values()];
}

export function filterByType(type: String, characters: Array<Character>): Array<Character> {
    log.info(`Filtering with type : ${type}`);
    return characters.filter((character: Character) => character.type === type);
}

export function filterById(id: number, characters: Array<Character>): Array<Character> {
    log.info(`Filtering with id : ${id}`);
    return characters.filter((character: Character) => character.payload.id === id);
}
