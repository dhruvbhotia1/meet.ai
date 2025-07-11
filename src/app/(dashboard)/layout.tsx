interface Props {
    children: React.ReactNode;
}

import React from 'react';
import {SidebarProvider} from "@/components/ui/sidebar"
import {DashboardSidebar} from "@/modules/dashboard/ui/views/dashboard-sidebar";

const Layout = ({children} : Props) => {
    return (
        <SidebarProvider>

            <DashboardSidebar/>
            <main className={'flex flex-col h-screen w-screen bg-muted'}>
                {children}
            </main>
        </SidebarProvider>
    );
};

export default Layout;