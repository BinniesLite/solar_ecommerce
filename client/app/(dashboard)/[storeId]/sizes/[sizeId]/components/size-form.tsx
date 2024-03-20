"use client"

import { useState } from "react";
// fetch 
import axios from "axios";

import { Size } from "@prisma/client";
// toast
import toast from "react-hot-toast";
// Form validation
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form"
// Icon
import { Trash } from "lucide-react";
// Components
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel,
    FormMessage
 } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";

import { ImageUpload } from "@/components/ui/image-upload";


interface SizeFormProps {
    initialData: Size | null;
}

const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1)
})

type SizeFormValues = z.infer<typeof formSchema> 


export const SizeForm: React.FC<SizeFormProps> = ({ initialData }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const params = useParams()
    const router = useRouter();
    // Use form validation
    const form = useForm<SizeFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            value: ""
        }
    });

    const title = initialData ? "Edit Size" : "Create Size";
    const description = initialData ? "Edit a Size" : "Add a new Size";
    const toastMessage = initialData ? "Size Updated" : "Size Created";
    const action = initialData ? "Save Changes" : "Created Size";

    const onSubmit = async (data: SizeFormValues) => {
        try {
            setLoading(true);
            if (!initialData) {
                await axios.post(`/api/${params.storeId}/sizes`, data)
            
            }  
            else {
                await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, data)

            }
            
            router.refresh(); // Due to the fact that it has server + client components
            toast.success(`${toastMessage} 😊`);
        }
        catch (error) {
            toast.error("Something went wrong 😵‍💫")
            console.log(error)
        } 
        finally {
            setLoading(false);
            
        }
    };

    // Delete form
    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`)
            router.refresh();
            router.push("/");
            toast.success("Size deleted.")
        } catch (error) {
            console.log(error);
            toast.error("Make sure you remove all products using this sizes.");
            
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    return (
        <>
            {/* TODO: Add alert modal */}
            <AlertModal
                open={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />

            {/* Main */}
            <div className="flex items-center justify-between">
                <Heading
                    title={title}
                    description={description}
                />
                {initialData && <Button
                    variant="destructive"
                    size="sm"
                    disabled={loading}
                    onClick={() => setOpen(true)}
                >
                    <Trash className="h-4 w-4" />

                </Button>   }
            </div>
            <Separator/>
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                  
                    <div className="grid grid-cols-3 gap-8">
                        <FormField 
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Size name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Size Name..." {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                          <FormField 
                            control={form.control}
                            name="value"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Value name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Size Value ..." {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
            <Separator/>
        </>
    )
}
