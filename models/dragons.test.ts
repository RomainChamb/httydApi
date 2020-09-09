import { assertEquals } from "https://deno.land/std@0.61.0/testing/asserts.ts";
import { filterDragonsById, getRandomDragons } from "./dragons.ts";

const DRAGON_ID_1 = {
    "id": 1,
    "name": "Toothless",
    "species": "Night Fury",
    "class": "Strike",
    "attack": "High",
    "speed": "Maximum",
    "armor": "Medium",
    "firepower": "Medium",
    "shotLimit": "High",
    "venom": "N/A",
    "jawStrength": "Low",
    "stealth": "Very High",
    "description": "Loyal and empathic with boundless, puppy-like energy",
    "image": "TBD",
    "classImage": "TBD"
};

const DRAGON_ID_2 = {
    "id": 2,
    "name": "Stormfly",
    "species": "Deadly Nadder",
    "class": "Traker",
    "attack": "Low",
    "speed": "Low",
    "armor": "Medium",
    "firepower": "High",
    "shotLimit": "High",
    "venom": "Maximum",
    "jawStrength": "Low",
    "stealth": "Medium",
    "description": "Precise and cunning in battle, yet warm and affectionate with friends old and new",
    "image": "TBD",
    "classImage": "TBD"
};

const DRAGON_ID_3 = {
    "id": 3,
    "name": "Barf & Belch",
    "species": "Hideous Zippleback",
    "class": "Mystery",
    "attack": "Low",
    "speed": "Medium",
    "armor": "Low",
    "firepower": "High",
    "shotLimit": "High",
    "venom": "N/A",
    "jawStrength": "Low",
    "stealth": "Maximum",
    "description": "Truly a split personality! Barf & Belch are each fiercely independent, yet inextricably linked",
    "image": "TBD",
    "classImage": "TBD"
};

Deno.test("Filter dragons by id", async () => {
    const filtered = await filterDragonsById(1, [
        DRAGON_ID_1,
        DRAGON_ID_2,
        DRAGON_ID_3
    ]);
    assertEquals(filtered, [DRAGON_ID_1]);
});

Deno.test("get a random number of Dragons", async () => {
    const randomDragons = await getRandomDragons(2, [
        DRAGON_ID_1,
        DRAGON_ID_2,
        DRAGON_ID_3
    ]);
    assertEquals(randomDragons.length, 2);
});