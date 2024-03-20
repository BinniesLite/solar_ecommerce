"use client"

import { Plus } from "lucide-react";

import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { SizesColumn, columns } from "./columns";

import { ApiAlert } from "@/components/ui/api-alert";
import { ApiList } from "@/components/ui/api-list";

interface SizesClientProps {
    data: SizesColumn[] 
}

export const SizesClient: React.FC<SizesClientProps> = ({ data }) => {

    const router = useRouter();
    const params = useParams();



    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Sizes (${data?.length})`}
                    description="Manage sizes for your store"
                />
            <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
            </Button>
            </div>
            <Separator />
            <DataTable data={data} columns={columns} searchKey="label" />
            <Separator />
            <ApiList entityName="sizes" entityId="{sizeId}"/>        
            
        </>
    )
}
