import { Router } from "./deps.ts";

import * as vikings from "../models/vikings.ts";
import * as dragons from "../models/dragons.ts";
import * as characters from "../models/characters.ts"

const router = new Router();

router.get("/", (ctx) => {
    ctx.response.body = `
Welcome on the How To Train You Dragon API
An API made by a fan who ❤️ every 🐉

Here you can :
    - get all vikings : /vikings
    - get one viking : /vikings/id
    - get a number of random vikings : /vikings/random/number
    - get all dragons : /dragons
    - get one dragon : /dragons/id
    - get a number of random dragons : /dragons/random/number
    - get all characters : /characters
    - get a number of random characters : /characters/random/number
`
});

router.get("/vikings", async (ctx) => {
    ctx.response.body = await vikings.getAll();
});

router.get("/vikings/:id", async (ctx) => {
    if (ctx.params?.id && !isNaN(Number(ctx.params?.id))) {
        try {
            ctx.response.body = await vikings.getOne(Number(ctx.params?.id));
        } catch (err) {
            ctx.throw(404, err.message);
        } 
    } else {
        ctx.throw(400, "Bad request");
    }
});

router.get("/vikings/random/:number", async (ctx) => {
    if (ctx.params?.number && !isNaN(Number(ctx.params?.number))) {
        try {
            ctx.response.body = await vikings.getRandom(Number(ctx.params?.number));
        } catch (err) {
            ctx.throw(404, err.message);
        }  
    } else {
        ctx.throw(400, "Bad request");
    }
});

router.get("/dragons", async (ctx) => {
    ctx.response.body = await dragons.getAll();
});

router.get("/dragons/:id", async (ctx) => {
    if (ctx.params?.id && !isNaN(Number(ctx.params?.id))) {
        try {
            ctx.response.body = await dragons.getOne(Number(ctx.params?.id));
        } catch (err) {
            ctx.throw (404, err.message);
        }
    } else {
        ctx.throw (400, "Bad request");
    }
});

router.get("/dragons/random/:number", async (ctx) => {
    if (ctx.params?.number && !isNaN(Number(ctx.params?.number))) {
        try {
            ctx.response.body = await dragons.getRandom(Number(ctx.params?.number));
        } catch (err) {
            ctx.throw (404, err.message);
        }
    } else {
        ctx.throw (400, "Bad request");
    }
});

router.get("/characters", async (ctx) => {
    ctx.response.body = await characters.getAll()
});

router.get("/characters/random/:number", async (ctx) => {
    if (ctx.params?.number && !isNaN(Number(ctx.params?.number))) {
        try {
            ctx.response.body = await characters.getRandom(Number(ctx.params?.number));
        } catch (err) {
            ctx.throw(404, err.message);
        }
    } else {
        ctx.throw(400, "Bad request");
    }
});

export default router;