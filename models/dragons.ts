import { FileReader } from "../models/fileReader.ts"
import * as log from "https://deno.land/std@0.61.0/log/mod.ts";

interface Dragon {
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

async function retrieveAndConvertData(): Promise<Array<Dragon>> {
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