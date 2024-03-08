"use client"

import { useState } from "react";

import { Store } from "@prisma/client"

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form"

import { Trash } from "lucide-react";

import Heading from "@/components/heading";
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



    // // Use form validation
    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: store
    });

    const onSubmit = async (data: SettingsFormValues) => {
        console.log(data);
    };

    return (
        <>
            {/* TODO: Add alert modal */}
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
                                    <FormLabel>Name</FormLabel>
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

        </>
    )
}
