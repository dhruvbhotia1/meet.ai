"use client";

import React from 'react';
import {useSuspenseQuery} from "@tanstack/react-query"
import {useTRPC} from "@/trpc/client";
import LoadingState from "@/components/loading-state";
import ErrorState from "@/components/error-state";

const AgentsView = () => {

    const trpc = useTRPC();
    const {data, isLoading, isError} = useSuspenseQuery(trpc.agents.getMany.queryOptions());

    if(isLoading) {
        return (
            <LoadingState title={'Loading Agents'} description={'This may take a few seconds'}/>
        );
    }

    if(isError) {
        return (
           <ErrorState title={'Error'} description={'An error occurred'} />
        );
    }

    return (
        <div>
            {JSON.stringify(data, null, 2)}
        </div>
    );
};

export const AgentsViewLoading = () => {
    return (
        <LoadingState title={'Loading Agents'} description={'This may take a few seconds'}/>
    )
}


export const AgentsViewError = () => {
    return (
        <ErrorState title={'Error Loading Agents'} description={'Something went wrong'}/>
    )
}



export default AgentsView;