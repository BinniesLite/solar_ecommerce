"use client";

import { useState } from "react";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios"; 

import { toast } from "react-hot-toast";

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-modal-store";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    name: z.string().min(1, {message: "Name can't be empty"})
});

export const StoreModal = () => {
    const storeModal = useStoreModal();
    
    const [loading, setLoading] = useState<boolean>();

    // Form handling
    const form = useForm<z.infer<(typeof formSchema)>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    });
    console.log("[Store Modal]")
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // TODO: Create Store
        
        try {
            setLoading(true);
            const response = await axios.post("/api/store", values);
            console.log("[Store-modal]",response.data)
            toast.success("Store created ✨");
            window.location.assign(`/${response.data.id}`);


            setLoading(false);
        } catch (e) {
            console.log(e);
            toast.error("Something went wrong :(");
        } finally {
            setLoading(false);
        }

    };

    return <Modal
        title="Create store"
        description="Add a new store to manage products and categories"
        open={storeModal.isOpen}
        onClose={storeModal.onClose}
    >
        <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel> 
                                    <FormControl>
                                        <Input disabled={loading} placeholder="ecommerce name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                            <Button disabled={loading} variant="outline" onClick={storeModal.onClose}>Cancel</Button>
                            <Button disabled={loading} type="submit">Continue</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    </Modal>;
};