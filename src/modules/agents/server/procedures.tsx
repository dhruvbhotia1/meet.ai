import React from 'react';
import { createTRPCRouter, protectedProcedure} from '@/trpc/init';
import {z} from 'zod';
import { db } from '@/db';
import {agents} from "@/db/schema";
import {eq} from 'drizzle-orm';
import {agentsInsertSchema} from "@/modules/agents/schema";

import {getTableColumns} from "drizzle-orm";


export const agentsRouter = createTRPCRouter({

    getOne: protectedProcedure.input(z.object({id: z.string()})).query(async ({input, ctx}) => {
        const [existingAgent] = await db.select({
            ...getTableColumns(agents),

        }).from(agents).where(eq(agents.id, input.id));

        await new Promise((resolve) => setTimeout(resolve, 5000));

        return existingAgent;
    }),

    // here we are doing a query to get one agent by id, we are using the protectedProcedure which will validate the user session before executing the query.


    getMany: protectedProcedure.query(async () => {
        const data = await db.select().from(agents);

        await new Promise((resolve) => setTimeout(resolve, 5000));

        return data;
    }),

    // here we are doing a query to get many agents.

    create: protectedProcedure.input(agentsInsertSchema).mutation(async ({input, ctx}) => {
        const [createdAgent] = await db.insert(agents).values({...input, userId: ctx.auth.user.id}).returning();
        return createdAgent;
    })

    //here we are doing a mutation to the db to create an agent, we are using the protectedProcedure which will validate the user session before executing the mutation.
    //  first protectedProcedure will validate the session and the user and then it will take an input which is a zod schema defined in schema.ts file, then it will execute the mutation method which will run an async function that will use drizzle ORM to insert an agent into the database
    //.insert takes a param which is the table name and the it takes values which is an object containing the input in .values we spread the input and also add the userId from the context we got from protectedProcedure.

})


//here the agentsRouter is created using the createTRPCRouter function which we have already defined in the init.ts (nothing but t.router({}))

//this router have a couple endpoints like getOne, getMany, and create, names could be anything logic matters.
//then, this agentsRouter is imported in the _app.ts file where we create the appRouter and add the agentsRouter under the agent key.






const Procedures = () => {
    return (
        <div>

        </div>
    );
};

export default Procedures;