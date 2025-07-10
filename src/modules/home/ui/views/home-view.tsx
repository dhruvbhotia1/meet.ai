'use client'
import React from 'react';

import {Button} from "@/components/ui/button";
import {authClient} from "@/lib/auth-client";
import {useRouter} from "next/navigation";
import {useStore} from "better-auth/react";

const HomeView = () => {

    const router = useRouter();
    const {data : session} = authClient.useSession();


    if(!!session) {
        return (
            <p>session not found</p>
        )
    }





    return (
        <div className={'flex flex-col p-4 gap-y-4'}>
            <p>logged in</p>
            <Button onClick={() => authClient.signOut({
                fetchOptions:{onSuccess: () => router.push("/sign-in")}
            })}>Sign-out</Button>

        </div>
    );
};

export default HomeView;