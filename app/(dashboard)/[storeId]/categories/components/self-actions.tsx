"use client"

import toast from "react-hot-toast"

import axios from "axios"

import { useRouter } from "next/navigation"

import { MoreHorizontal, Edit, Copy, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { CategoryColumn } from "./columns"


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useParams } from "next/navigation"
import { AlertModal } from "@/components/modals/alert-modal"
import { useState } from "react"



interface CellActionProps {
    data: CategoryColumn
}


export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const router = useRouter();
    const params = useParams();



    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id)
        toast.success("Copy successfully!")
    }

    // Delete form
    const onDelete = async (billboardId: string) => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/categories/${billboardId}`)
            router.refresh();
            toast.success("Categories deleted.")
        } catch (error) {
            console.log(error);
            toast.error("Make sure you remove all products and categories first.");

        }
        finally {
            setOpen(false);      
            setLoading(false);
        }
    }

    return (
        <>
            <AlertModal
                open={open}
                onClose={() => setOpen(false)}
                onConfirm={() => onDelete(data.id)}
                loading={loading}
            />
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="cursor-pointer">
                    <DropdownMenuLabel>Action</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/categories/${data.id}`)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => onCopy(data.id)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy ID
                    </DropdownMenuItem>

                    <DropdownMenuItem className="text-red-500" onClick={() => setOpen(true)}>
                        <Trash className="h-4 w-4 mr-2 " />
                        Delete Category
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}