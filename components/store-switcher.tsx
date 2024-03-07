"use client"

import { useState } from "react";

import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { useStoreModal } from "@/hooks/use-modal-store";
import { Store } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Store as StoreIcon } from "lucide-react";


type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[]
}


export default function StoreSwitcher({
    className,
    items = []
}: StoreSwitcherProps) {
    
    const [open, setOpen] = useState<boolean>(false)


    const storeModal = useStoreModal();

    const params = useParams();
    const router = useRouter();

    const formattedItems = items.map((item) => ({ 
        label: item.name,
        value: item.id
    }))    

    // Which is the current store 
    const currentStore = formattedItems.find((item) => item.value === params.storeId);

    const onStoreSelect = (store: {value: string, label: string}) => {
        setOpen(false);
        router.push(`/${store.value}`);
    }
    
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button>
                    <StoreIcon/>

                </Button>
            </PopoverTrigger>
        </Popover>
    )
}