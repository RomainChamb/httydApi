import { FileReader } from "../models/fileReader.ts"
import * as log from "https://deno.land/std@0.61.0/log/mod.ts";

export interface Viking {
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

export async function retrieveAndConvertData(): Promise<Array<Viking>> {
    log.info("Retrieving and converting data start...");
    const vikings = await new FileReader().readJson("data", "vikings.json") as Array<Viking>;
    log.info(`Retrieving and converting data end...`)
    return vikings;
}

export async function filterVikingById(id: number, vikings: Array<Viking>): Promise<Array<Viking>> {
    log.info(`Filtering vikings with id = ${id}`);
    return vikings.filter((viking: Viking) => viking.id === id);
}

export async function getOne(id: number): Promise<Viking | Error> {
    log.info("GetOne viking start...")
    const vikingsList = await retrieveAndConvertData();
    const viking = await filterVikingById(id, vikingsList);
    if (viking !== null && viking !== undefined && viking.length > 0) {
        log.info("GetOne end viking...")
        return viking[0];
    }
    log.error(`No viking found for the id = ${id}`);
    throw new Error(`The viking with the id: ${id} doesn't exist`);
}

export async function getAll(): Promise<Array<Viking> | Error> {
    log.info("GetAll vikings start...")
    const vikings = await retrieveAndConvertData();
    if (vikings !== null && vikings !== undefined && vikings.length > 0) {
        log.info("GetAll vikins end...")
        return vikings;
    }
    throw new Error("No Viking found !");
}

export async function getRandom(number: number): Promise<Array<Viking> | Error> {
    log.info("GetRandom start...");
    const vikings = await retrieveAndConvertData();
    if (number === 0) {
        log.error("Impossible to search for 0 viking");
        throw new Error("Please choose a number higher than 0");
    } else if (number > vikings.length) {
        log.error(`${number} is higher than the number of vikings : ${vikings.length}`);
        throw new Error(`Please choose a number higher than 0 and lower than ${vikings.length}`);
    } else if (vikings !== null && vikings !== undefined && vikings.length > 0) {
        return await getRandomVikings(number, vikings);
    }
    log.error("No available data");
    throw new Error("No Viking found !");
}

export async function getRandomVikings(number: number, vikings: Array<Viking>): Promise<Array<Viking>> {
    const randomVikings = new Map<number, Viking>();
    while (randomVikings.size < number) {
        const randomId = Math.floor((Math.random() * vikings.length) + 1);
        if (randomVikings.size === 0) {
            const viking = await filterVikingById(randomId, vikings);
            randomVikings.set(randomId, viking[0]);
        } else if (!randomVikings.has(randomId)) {
            const viking = await filterVikingById(randomId, vikings);
            randomVikings.set(randomId, viking[0]);
        }
    }
    log.info(`${number} random viking(s) found!`);
    return [...randomVikings.values()];
}

