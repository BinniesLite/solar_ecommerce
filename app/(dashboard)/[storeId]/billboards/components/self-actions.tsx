"use client"

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


interface CellActionProps {
    data: BillboardColumn
}


export const CellAction: React.FC<CellActionProps> = () => {
    
    return (<DropdownMenu>
        <DropdownMenuTrigger>
            <Button>
            Action
            </Button>
        </DropdownMenuTrigger>
    </DropdownMenu>)
}