"use client"

import { Plus } from "lucide-react";

import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

import { CategoryColumn, columns } from "./columns";


interface CategoryClientProps {
    data: CategoryColumn[] 
}

export const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {

    const router = useRouter();
    const params = useParams();

    

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Categories (${data?.length})`}
                    description="Manage categories for your store"
                />
            <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable data={data} columns={columns} searchKey="name" />
            <Separator />
            <ApiList entityName="categories" entityId="{categoryId}"/>        
        </>
    )
}
