"use client"

import { ColumnDef } from "@tanstack/react-table"
import {AgentGetOne} from "@/modules/agents/types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<AgentGetOne>[] = [
    {
        accessorKey: "Name",
        header: "Agent Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "amount",
        header: "Amount",
    },
]