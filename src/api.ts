import { Router } from "https://deno.land/x/oak@v6.0.1/mod.ts";

import * as vikings from "../models/vikings.ts";

const router = new Router();

router.get("/", (ctx) => {
    ctx.response.body = `
Welcome on the How To Train You Dragon API
An API made by a fan who ❤️ every 🐉

Here you can :
    - get all vikings : /vikings
    - get one vikings : /vikings/id
    - get a random number of vikings : /vikings/random/number
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


export default router;