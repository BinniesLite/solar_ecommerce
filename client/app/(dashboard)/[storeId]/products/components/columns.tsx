"use client"

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./self-actions";

export type ProductColumn = {
    id: string,
    name: string,
    price: string,
    category: string,
    // color: string,
    isFeatured: boolean,
    isArchived: boolean,
    createdAt: string
}

export const columns: ColumnDef<ProductColumn>[] = [
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "price",
        header: "Price"
    },
    {
        accessorKey: "isFeatured",
        header: "Featured"
    },
    {
        accessorKey: "isArchived",
        header: "Archived"
    },
    {
        accessorKey: "category",
        header: "Category"
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