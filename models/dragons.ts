import { log } from "../src/deps.ts";

import { FileReader } from "../models/fileReader.ts"

export interface Dragon {
    id: number;
    name: string;
    species: string;
    class: string;
    attack: string;
    speed: string;
    armor: string;
    firepower: string;
    shotLimit: string;
    venom: string;
    jawStrength: string;
    stealth: string;
    description: string;
    image: string;
    classImage: string;
}

export async function retrieveAndConvertData(): Promise<Array<Dragon>> {
    log.info("Retrieving and converting data start...");
    const dragons = await new FileReader().readJson("data", "dragons.json") as Array<Dragon>;
    log.info(`Retrieving and converting data end...`)
    return dragons;
}

export async function filterDragonsById(id: number, dragons: Array<Dragon>): Promise<Array<Dragon>> {
    log.info(`Filtering dragons with id = ${id}`);
    return dragons.filter((dragon: Dragon) => dragon.id === id);
}

export async function getOne(id: number): Promise<Dragon | Error> {
    log.info('GetOne dragon start...');
    const dragonList = await retrieveAndConvertData();
    const dragon = await filterDragonsById(id, dragonList);
    if (dragon !== null && dragon !== undefined && dragon.length > 0) {
        log.info("GetOne dragon end...");
        return dragon[0];
    } else {
        log.error(`No dragon found for the id = ${id}`);
        throw new Error(`The dragon with the id: ${id} doesn't exist`);
    }
}

export async function getAll(): Promise<Array<Dragon> | Error> {
    log.info("GetAll dragons start...")
    const dragonList = await retrieveAndConvertData();
    if (dragonList !== null && dragonList !== undefined && dragonList.length > 0) {
        log.info("GetAll dragons end...")
        return dragonList;
    }
    throw new Error("Now dragons found !")
}

export async function getRandom(number: number): Promise<Array<Dragon> | Error> {
    log.info("GetRandom start...");
    const dragons = await retrieveAndConvertData();
    if (number === 0) {
        log.error("Impossible to search for 0 dragon");
        throw new Error("Please choose a number higher than 0");
    } else if (number > dragons.length) {
        log.error(`${number} is higher than the number of vikings : ${dragons.length}`);
        throw new Error(`Please choose a number higher than 0 and lower than ${dragons.length}`);
    } else if (dragons !== null && dragons !== undefined && dragons.length > 0) {
        return await getRandomDragons(number, dragons);
    }
    log.error("No available data");
    throw new Error("No Dragons found !");
}

export async function getRandomDragons(number: number, vikings: Array<Dragon>): Promise<Array<Dragon>> {
    const randomDragons = new Map<number, Dragon>();
    while (randomDragons.size < number) {
        const randomId = Math.floor((Math.random() * vikings.length) + 1);
        if (randomDragons.size === 0) {
            const viking = await filterDragonsById(randomId, vikings);
            randomDragons.set(randomId, viking[0]);
        } else if (!randomDragons.has(randomId)) {
            const viking = await filterDragonsById(randomId, vikings);
            randomDragons.set(randomId, viking[0]);
        }
    }
    log.info(`${number} random viking(s) found!`);
    return [...randomDragons.values()];
}