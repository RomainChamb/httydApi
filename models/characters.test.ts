import { assertEquals } from "https://deno.land/std@0.61.0/testing/asserts.ts";
import { Character, filterByType } from "./characters.ts";

const CHARACTER_ID_1: Character = {
    type: "Dragon",
    payload: {
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
    }
};

const CHARACTER_ID_2 = {
    type: "Dragon",
    payload : {
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
    }
};

const CHARACTER_ID_3 = {
    type: "Viking",
    payload: {
        "id": 1,
        "firstName": 'Hiccup "Horrendous"',
        "lastName": "Haddock III",
        "tribe": "Hooligan",
        "gender": "Male",
        "height": "6'11\"",
        "eyes": "Green",
        "hair": "Auburn",
        "weapon": "blade",
        "location": "Berk",
        "image": "TBD",
    }
};

const CHARACTER_ID_4 = {
    type: "Viking",
    payload: {
        "id": 2,
        "firstName": "Astrid",
        "lastName": "Hofferson",
        "tribe": "Hooligan",
        "gender": "Female",
        "height": "5'9\"",
        "eyes": "Blue",
        "hair": "Blonde",
        "weapon": "Axe",
        "location": "Berk",
        "image": "TBD",
    }
};

Deno.test("filter characters by type", async () => {
    const filtered = await filterByType("Viking", [
        CHARACTER_ID_1,
        CHARACTER_ID_2,
        CHARACTER_ID_3,
        CHARACTER_ID_4
    ]);
    assertEquals(filtered.length, 2);
    assertEquals(filtered[0].type, "Viking");
    assertEquals(filtered[1].type, "Viking");
});