"use client"

import { Plus } from "lucide-react";

import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { ProductColumn, columns } from "./columns";

import { ApiAlert } from "@/components/ui/api-alert";
import { ApiList } from "@/components/ui/api-list";

interface BillboardClientProps {
    data: ProductColumn[] 
}

export const ProductClient: React.FC<BillboardClientProps> = ({ data }) => {

    const router = useRouter();
    const params = useParams();



    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Product (${data?.length})`}
                    description="Manage products for your store"
                />
            <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
            </Button>
            </div>
            <Separator />
            <DataTable data={data} columns={columns} searchKey="label" />
            <Separator />
            <ApiList entityName="billboards" entityId="{billboardId}"/>        
            
        </>
    )
}
