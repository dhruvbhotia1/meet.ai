import 'server-only'; // <-- ensure this file cannot be imported from the client
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query';
import { cache } from 'react';
import { createTRPCContext } from './init';
import { makeQueryClient } from './query-client';
import { appRouter } from './routers/_app';
// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.
export const getQueryClient = cache(makeQueryClient);
export const trpc = createTRPCOptionsProxy({
    ctx: createTRPCContext,
    router: appRouter,
    queryClient: getQueryClient,
});


// here we export trpc object which is nothing but creating trpcoptionsproxy with ctx referrring to the createTRPCContext,
//router referring to the appRouter and queryClient referring to the getQueryClient which is a cache function that returns the
// query client. This trpc object will be used in the server components to create the tRPC client and use it in the components.