"use client"

import toast from "react-hot-toast";

import axios from "axios";

import { MoreHorizontal, Copy, Edit, Trash } from "lucide-react";

import { Button } from "@/components/ui/button"
import { BillboardColumn } from "./columns"

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
    data: BillboardColumn
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
            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
            router.refresh();
            router.push("/");
            toast.success("Billboard deleted.")
        } catch (error) {
            console.log(error);
            toast.error("Make sure you remove all products and categories first.");
            
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }


    return (<DropdownMenu>
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
                <Copy className="h-4 w-4 mr-2" /> Copy Billboard Id
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
                <Edit className="h-4 w-4 mr-2" /> Edit
            </DropdownMenuItem  >
            <DropdownMenuItem className="text-red-400 cursor-pointer">
                <Trash className="h-4 w-4 mr-2" /> Delete            
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>)
}