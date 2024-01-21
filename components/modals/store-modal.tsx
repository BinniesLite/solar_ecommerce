"use client"

import * as z from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-modal-store";

const formSchema = z.object({
    name: z.string().min(1)
})

export const StoreModal = () => {
    const storeModal = useStoreModal();

    const form = useForm<z.infer<(typeof formSchema)>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
    }

    return <Modal
        title="Create store"
        description="Add a new store to manage products and categories"
        open={storeModal.isOpen}
        onClose={storeModal.onClose}
    >   
    <div className="space-y-4 py-2 pb-2">

    </div>
        Create a new store 
    </Modal>
}