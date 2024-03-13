"use client"

import { Plus } from "lucide-react";

import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { BillboardColumn, columns } from "./columns";


interface BillboardClientProps {
    data: BillboardColumn[] 
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {

    const router = useRouter();
    const params = useParams();



    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Billboard (${data?.length})`}
                    description="Manage billboards for your store"
                />
            <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable data={data} columns={columns} searchKey="label" />
        </>
    )
}
