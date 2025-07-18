
import {  createTRPCRouter } from '../init';
import {agentsRouter} from "@/modules/agents/server/procedures";

export const appRouter = createTRPCRouter({
    agents: agentsRouter,

});
// export type definition of API
export type AppRouter = typeof appRouter;

// here we have added our own agentsRouter to the appRouter which is created using the createTRPCRouter function. This appRouter will be used in the server.tsx file to create the tRPC client and use it in the components. The agentsRouter is imported from the agents module which contains all the procedures related to agents.