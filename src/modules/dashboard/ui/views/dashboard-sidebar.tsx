'use client';
import React from 'react';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";

import {BotIcon, StarIcon, VideoIcon} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {Separator} from "@/components/ui/separator";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import {DashboardUserButton} from "@/modules/dashboard/ui/views/dashboard-user-button";
const firstSection = [
    {
        icon: VideoIcon,
        label: 'Meetings',
        href: '/meetings'
    },

    {
        icon: BotIcon,
        label: 'Agents',
        href: '/agents'
    }
]

const secondSection = [
    {
        icon: StarIcon,
        label: 'Upgrade',
        href: '/upgrade'
    },


]


export const DashboardSidebar = () => {

    const pathName = usePathname();


    return (
        <Sidebar>
            <SidebarHeader className={'text-sidebar-accent-foreground'}>

                <Link href={'/'} className={'flex items-center gap-2 px-2 pt-2'}>
                    <Image src={"/logo.svg"} height={36} width={36} alt={'logo'}/>
                    <p className={'text-2xl font-semibold'}></p>
                </Link>

            </SidebarHeader>

            <div className={'px-4 py-2'}>
                <Separator className={'opacity-10 text-[#5D6B68]'}/>
            </div>

            <SidebarContent className={'px-4 py-2'}>
                <SidebarGroup className={'px-4'}>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenu>
                                {firstSection.map((item) => (
                                    <SidebarMenuItem key={item.href}>

                                        <SidebarMenuButton asChild className={cn(
                                            "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50", pathName === item.href && 'bg-linear-to-r/oklch border-[#5D6B68]/10'
                                        )} isActive={pathName === item.href}>
                                            <Link href={item.href}>
                                                <item.icon className={'size-5'}/>
                                                <span className={'text-sm font-medium tracking-tight'}>{item.label}</span>
                                            </Link>
                                        </SidebarMenuButton>

                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <div className={'px-4 py-2'}>
                    <Separator className={'opacity-10 text-[#5D6B68]'}/>
                </div>

                <SidebarGroup className={'px-4'}>
                    <SidebarMenu>
                        <SidebarMenu>
                            {secondSection.map((item) => (
                                <SidebarMenuItem key={item.href}>

                                    <SidebarMenuButton asChild className={cn(
                                        "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50", pathName === item.href && 'bg-linear-to-r/oklch border-[#5D6B68]/10'
                                    )} isActive={pathName === item.href}>
                                        <Link href={item.href}>
                                            <item.icon className={'size-5'}/>
                                            <span className={'text-sm font-medium tracking-tight'}>{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>

                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className={'text-white'}>
                <DashboardUserButton/>
            </SidebarFooter>
        </Sidebar>
    );
};;