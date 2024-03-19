"use client"

import { useState } from "react";

import axios from "axios";
import { Store } from "@prisma/client"
import toast from "react-hot-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form"

import { Trash } from "lucide-react";

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
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";

interface SettingsFormProps {
    store: Store;
}

const formSchema = z.object({
    name: z.string().min(1)
})


type SettingsFormValues = z.infer<typeof formSchema> 


export const SettingsForm: React.FC<SettingsFormProps> = ({ store }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const params = useParams()
    const router = useRouter();
    const origin = useOrigin();
    // // Use form validation
    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: store
    });

    const onSubmit = async (data: SettingsFormValues) => {
        try {
            setLoading(true);
            await axios.patch(`/api/store/${params.storeId}`, data)
            router.refresh(); // Due to the fact that it has server + client components
            toast.success("Store updated 😊");
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
            await axios.delete(`/api/store/${params.storeId}`)
            router.refresh();
            router.push("/");
            toast.success("Stored deleted.")
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
                    title="Settings"
                    description="Manage Store Settings"
                />
                <Button
                    variant="destructive"
                    size="sm"
                    disabled={loading}
                    onClick={() => setOpen(true)}
                >
                    <Trash className="h-4 w-4" />

                </Button>
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
                                    <FormLabel>Store Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Store Name" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button disabled={loading} className="ml-auto" type="submit">
                        Save Changes
                    </Button>
                </form>
            </Form>
            <Separator/>
            <ApiAlert 
                title="test" 
                description={`${origin}/api/${params.storeId}`}
                variant="public"
            />
        </>
    )
}
