import React from 'react';
import { baseProcedure, createTRPCRouter} from '@/trpc/init';
import { db } from '@/db';
import {agents} from "@/db/schema";


export const agentsRouter = createTRPCRouter({
    getMany: baseProcedure.query(async () => {
        const data = await db.select().from(agents);

        await new Promise((resolve) => setTimeout(resolve, 5000));

        return data;
    })

})

const Procedures = () => {
    return (
        <div>

        </div>
    );
};

export default Procedures;