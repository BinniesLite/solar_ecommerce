"use client"

import { useState } from "react";
// fetch 
import axios from "axios";
import { Billboard, Category } from "@prisma/client"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CategoryFormProps {
    initialData: Category | null;
    billboards: Billboard[] | null
}

const formSchema = z.object({
    name: z.string().min(1),
    billboardId : z.string().min(1)
})

type CategoryFormValues = z.infer<typeof formSchema> 


export const CategoryForm: React.FC<CategoryFormProps> = ({ initialData, billboards }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const params = useParams()
    const router = useRouter();

    // Use form validation
    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: "",
            billboardId: "",
        }
    });

    const title = initialData ? "Edit Category" : "Create Category";
    const description = initialData ? "Edit a Category" : "Add a new Category";
    const toastMessage = initialData ? "Category Updated" : "Category Created";
    const action = initialData ? "Save Changes" : "Created Category";

    const onSubmit = async (data: CategoryFormValues) => {
        try {
            setLoading(true);
            if (!initialData) {
                await axios.post(`/api/${params.storeId}/categories`, data)
            
            }  
            else {
                await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, data)

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
            await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`)
            router.refresh();
            router.push("/");
            toast.success("Category deleted.")
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
                   
                    <div className="md:grid md:grid-cols-3 gap-8">
                        <FormField 
                            control={form.control}
                            name="name"
                            render={( { field }  ) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Category Name..." {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="billboardId"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>BillboardId</FormLabel>
                                    <FormControl>
                                        <Select 
                                            disabled={loading} 
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue
                                                        defaultValue={field.value}
                                                        placeholder="Select a billboard"
                                                    >
                                                        
                                                    </SelectValue>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {billboards?.map((billboard) => (
                                                    <SelectItem 
                                                        key={billboard.id}
                                                        value={billboard.id}
                                                    >
                                                        {billboard.label}
                                                    </SelectItem>
                                                )) }
                                            </SelectContent>
                                        </Select>
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
