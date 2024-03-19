import { format } from 'date-fns';

import prismaDB from "@/lib/prisma";
// components
import { BillboardClient } from "./components/client";

// type
import { SizesColumn } from "./components/columns";


const BillboardPage = async ({ params }: {params: { storeId: string}}) => {
  
  
  

  const formattedBillboard: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))

  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <BillboardClient data={formattedBillboard}/>

        </div>
    </div>
  )
}

export default BillboardPage;