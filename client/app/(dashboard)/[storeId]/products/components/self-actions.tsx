"use client"

import toast from "react-hot-toast";

import axios from "axios";

import { MoreHorizontal, Copy, Edit, Trash } from "lucide-react";

import { Button } from "@/components/ui/button"
import { ProductColumn } from "./columns"
import { AlertModal } from "@/components/modals/alert-modal";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";


interface CellActionProps {
    data: ProductColumn
}


export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const params = useParams();
    const router = useRouter();

    const onCopy = () => {
        navigator.clipboard.writeText(data.id);
        toast.success("Copy Successfully.")
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            const response = await axios.delete(`/api/${params.storeId}/products/${data.id}`)
            console.log("[RESPONSE]", response)
            router.refresh();
            
            toast.success("Product deleted.")
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong.");
            
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    const onEdit = () => { 
        router.push(`/${params.storeId}/products/${data.id}`)
    }


    return (<>
    <AlertModal 
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
    />
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Button variant="ghost" >
                <MoreHorizontal className="h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent >
            <DropdownMenuLabel>
                Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onCopy()} className="cursor-pointer" >
                <Copy className="h-4 w-4 mr-2" /> Copy Product Id
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit()} className="cursor-pointer">
                <Edit className="h-4 w-4 mr-2" /> Edit
            </DropdownMenuItem  >
            <DropdownMenuItem onClick={() => setOpen(true)} className="text-red-400 cursor-pointer">
                <Trash className="h-4 w-4 mr-2" /> Delete            
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    </>)
}