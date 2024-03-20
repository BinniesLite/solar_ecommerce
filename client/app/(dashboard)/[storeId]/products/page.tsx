import { format } from 'date-fns';

import prismaDB from "@/lib/prisma";
// components
import { BillboardClient } from "./components/client";

// type
import { BillboardColumn } from "./components/columns";
import { formatter } from '@/lib/utils';


const ProductsPage = async ({ params }: {params: { storeId: string}}) => {
  
  const products = await prismaDB.product.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      category: true,
      size: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  const formattedProducts: BillboardColumn[] = products.map((item) => ({
    id: item.id,
    label: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    size: item.size.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))

  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <BillboardClient data={formattedProducts}/>

        </div>
    </div>
  )
}

export default ProductsPage;