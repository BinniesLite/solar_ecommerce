import { format } from 'date-fns';

import prismaDB from "@/lib/prisma";
// components
import { SizesClient } from "./components/client";

// type
import { SizesColumn } from "./components/columns";


const BillboardPage = async ({ params }: {params: { storeId: string}}) => {
  
  const sizes = await prismaDB.size.findMany({
      where: {
        storeId: params.storeId
      },
      orderBy: {
        createdAt: "desc"
      }
  })
  
  

  const formattedSizes: SizesColumn[] = sizes.map((item: any) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))

  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <SizesClient data={formattedSizes}/>

        </div>
    </div>
  )
}

export default BillboardPage;