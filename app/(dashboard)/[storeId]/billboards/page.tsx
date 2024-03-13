import { format } from 'date-fns';

import prismaDB from "@/lib/prisma";
// components
import { BillboardClient } from "./components/client";

// type
import { BillboardColumn } from "./components/columns";


const BillboardPage = async ({ params }: {params: { storeId: string}}) => {
  
  const billboards = await prismaDB.billboard.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  const formatteBillboard: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))

  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <BillboardClient data={formatteBillboard}/>

        </div>
    </div>
  )
}

export default BillboardPage;