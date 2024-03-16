"use client"

import { useState } from "react";
// fetch 
import axios from "axios";
import { Billboard } from "@prisma/client"
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

interface BillboardFormProps {
    initialData: Billboard | null;
}

const formSchema = z.object({
    label: z.string().min(1),
    imageUrl: z.string().min(1)
})

type BillboardFormValues = z.infer<typeof formSchema> 


export const BillboardForm: React.FC<BillboardFormProps> = ({ initialData }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const params = useParams()
    const router = useRouter();
    // Use form validation
    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: "",
            imageUrl: ""
        }
    });

    const title = initialData ? "Edit Billboard" : "Create Billboard";
    const description = initialData ? "Edit a billboard" : "Add a new billboard";
    const toastMessage = initialData ? "Billboard Updated" : "Billboard Created";
    const action = initialData ? "Save Changes" : "Created Billboard";

    const onSubmit = async (data: BillboardFormValues) => {
        try {
            setLoading(true);
            if (!initialData) {
                await axios.post(`/api/${params.storeId}/billboards`, data)
            
            }  
            else {
                await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data)

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
                    <FormField 
                            control={form.control}
                            name="imageUrl"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Background Image</FormLabel>
                                    <FormControl>
                                        <ImageUpload 
                                            values={field.value ? [field.value] : []}
                                            disabled={loading}
                                            onChange={(url) => field.onChange(url)}
                                            onRemove={() => field.onChange("")}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField 
                            control={form.control}
                            name="label"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Billboard Label..." {...field}/>
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
