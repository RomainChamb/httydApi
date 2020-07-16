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
    return  await new FileReader().readJson("data", "vikings.json") as Array<Viking>
}

export async function getOne(id: string) {
}

export async function getAll() {
}

export async function getRandom(number: number) {
}

