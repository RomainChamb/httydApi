import { assertEquals } from "https://deno.land/std@0.61.0/testing/asserts.ts"

import { filterVikingById, getRandomVikings } from "./vikings.ts";

const VIKING_ID_1 = {
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
};

const VIKING_ID_2 = {
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
};

const VIKING_ID_3 = {
    "id": 3,
    "firstName": "Fishlegs",
    "lastName": "Ingerman",
    "tribe": "Hooligan",
    "gender": "Male",
    "height": "5'9\"",
    "eyes": "Green",
    "hair": "Blonde",
    "weapon": "Dragon knowledge",
    "location": "Berk",
    "image": "TBD",
};

const VIKING_ID_4 = {
    "id": 4,
    "firstName": "Ruffnut",
    "lastName": "Thorston",
    "tribe": "Hooligan",
    "gender": "Female",
    "height": "5'9\"",
    "eyes": "Blue",
    "hair": "Blonde",
    "weapon": "Spear",
    "location": "Berk",
    "image": "TBD"
}

const VIKING_ID_5 = {
    "id": 5,
    "firstName": "Tuffnut",
    "lastName": "Thorston",
    "tribe": "Hooligan",
    "gender": "Male",
    "height": "5'9\"",
    "eyes": "Blue",
    "hair": "Blonde",
    "weapon": "Spear",
    "location": "TBD",
    "image": "TBD"
}

const VIKING_ID_6 = {
    "id": 6,
    "firstName": "Snotloud",
    "lastName": "Jorgenson",
    "tribe": "Hooligan",
    "gender": "Male",
    "height": "5'3\"",
    "eyes": "Blue",
    "hair": "Brown",
    "weapon": "Hammer",
    "location": "Berk",
    "image": "TBD"
}

Deno.test("filter viking by id", async () => {
    const filtered = await filterVikingById(1, [
        VIKING_ID_1,
        VIKING_ID_2,
        VIKING_ID_3
    ]);
    assertEquals(filtered, [
        VIKING_ID_1,
    ]);
});

Deno.test("get a random number of Viking", async () => {
    const randomVikings = await getRandomVikings(2, [
        VIKING_ID_1,
        VIKING_ID_2,
        VIKING_ID_3,
        VIKING_ID_4,
        VIKING_ID_5,
        VIKING_ID_6
    ]);
    assertEquals(randomVikings.length, 2);
});
