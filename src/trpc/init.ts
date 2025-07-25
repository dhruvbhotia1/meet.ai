import {initTRPC, TRPCError} from '@trpc/server';
import { cache } from 'react';
import {headers} from "next/headers";
import {auth} from "@/lib/auth";
export const createTRPCContext = cache(async () => {
    /**
     * @see: https://trpc.io/docs/server/context
     */
    return { userId: 'user_123' };
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
    /**
     * @see https://trpc.io/docs/server/data-transformers
     */
    // transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router; //creating TRPC router
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure; // base procedure for all routers

export const protectedProcedure = baseProcedure.use(async ({ctx, next}) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if(!session) {
        throw new TRPCError({code : "UNAUTHORIZED", message: "Unauthorized access"});
    }

    return next({ctx : {...ctx, auth: session}})
}) // protected procedure for validated users, base procedure before executing the next step (query or mutation) will "use" the async function to validate the user session.

// ctx is the context basically --- createTRPCContext is a cache function that returns the userId, which is used in the protectedProcedure to validate the user session. In server.ts we will use this context to create the TRPC options proxy.