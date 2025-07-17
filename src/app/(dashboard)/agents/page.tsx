import React from 'react';
import AgentsView, {AgentsViewError} from "@/modules/agents/ui/views/agents-view";
import {getQueryClient, trpc} from "@/trpc/server";
import {HydrationBoundary, dehydrate} from "@tanstack/react-query";
import {AgentsViewLoading} from "@/modules/agents/ui/views/agents-view";
import {Suspense} from "react";
import {ErrorBoundary} from "react-error-boundary";
import AgentsListHeader from "@/modules/agents/ui/components/agents-list-header";

const Page = async () => {

    const queryClient = getQueryClient();

    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions())


    return (
        <>
            <AgentsListHeader></AgentsListHeader>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<AgentsViewLoading />}>
                    <ErrorBoundary fallback={<AgentsViewError/>}>
                        <AgentsView />
                    </ErrorBoundary>
                </Suspense>

            </HydrationBoundary>
        </>
    );
};

export default Page;