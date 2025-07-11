'use client'
import React from 'react';

import {Button} from "@/components/ui/button";
import {authClient} from "@/lib/auth-client";
import {useRouter} from "next/navigation";

const HomeView = () => {


    const router = useRouter();
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