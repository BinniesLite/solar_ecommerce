"use client"

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./self-actions";

export type SizesColumn = {
    id: string,
    name: string,
    value: number,
    createdAt: string
}

export const columns: ColumnDef<SizesColumn>[] = [
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "value",
        header: "Value"
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