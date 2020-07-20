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

async function retrieveAndConvertData(): Promise<Array<Viking>> {
    return await new FileReader().readJson("data", "vikings.json") as Array<Viking>;
}

export async function filterVikingById(id: number, vikings: Array<Viking>): Promise<Array<Viking>> {
    return vikings.filter((viking: Viking) => viking.id === id);
}

export async function getOne(id: number): Promise<Viking | Error> {
    const vikingsList = await retrieveAndConvertData();
    const viking = await filterVikingById(id, vikingsList);
    if (viking !== null && viking !== undefined && viking.length > 0) {
        return viking[0];
    }
    throw new Error(`The viking with the id: ${id} doesn't exist`);
}

export async function getAll(): Promise<Array<Viking> | Error> {
    const vikings = await retrieveAndConvertData();
    if (vikings !== null && vikings !== undefined && vikings.length > 0) {
        return vikings;
    }
    throw new Error("No Viking found !");
}

export async function getRandom(number: number): Promise<Array<Viking> | Error> {
    const vikings = await retrieveAndConvertData();
    if (number === 0) {
        throw new Error("Please choose a number higher than 0");
    } else if (number > vikings.length) {
        throw new Error(`Please choose a number higher than 0 and lower than ${vikings.length}`);
    } else if (vikings !== null && vikings !== undefined && vikings.length > 0) {
        return await getRandomVikings(number, vikings);
    }
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
    return [...randomVikings.values()];
}

