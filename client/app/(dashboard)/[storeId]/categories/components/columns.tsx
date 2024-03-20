"use client"

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./self-actions";

export type CategoryColumn = {
    id: string,
    name: string,
    createdAt: string,
    billboardLabel: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
    {
        accessorKey: "name",
        header: "Name"
    },
    
    {
        accessorKey: "billboard",
        header: "Billboard",
        cell: (({ row }) => row.original.billboardLabel)
    },
    {
        accessorKey: "createdAt",
        header: "Date"
    },
    // So this is how it made a custom props
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />,
        header: "Actions"
    }
]