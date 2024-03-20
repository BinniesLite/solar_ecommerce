"use client"

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./self-actions";

export type BillboardColumn = {
    id: string,
    label: string,
    createdAt: string
}

export const columns: ColumnDef<BillboardColumn>[] = [
    {
        accessorKey: "label",
        header: "Label"
    },
    {
        accessorKey: "createdAt",
        header: "Date"
    },
    // So this is how it made a custom props
    {
        id: "actions", 
        cell: ({ row }) => <CellAction data={row.original}/>,
        header: "Actions"
    }
]