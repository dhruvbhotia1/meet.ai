'use client';

import React from 'react';
import {Button} from "@/components/ui/button";
import {PanelLeftIcon, SearchIcon} from "lucide-react";
import {useSidebar} from "@/components/ui/sidebar";

export const DashboardNavbar = () => {

    const {state, toggleSidebar, isMobile} = useSidebar();





    return (

        <>


            <nav className={'flex px-4 gap-x-2 items-center py-3 border-b bg-background'}>

                <Button className={'size-9'} variant={'outline'} onClick={toggleSidebar}>
                    {(state === 'collapsed' || isMobile) ? <PanelLeftIcon className={'size-4'} /> : <PanelLeftIcon className={'size-4'}/>}
                </Button>

                <Button variant={'outline'} size={'sm'} onClick={() => {}} className={'h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground'}>

                    <SearchIcon/>
                    Search

                    <kbd className={'ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground'}>
                        <span className={'text-xs'}>&#8984;</span>K
                    </kbd>

                </Button>

            </nav>
        </>


    );
};

