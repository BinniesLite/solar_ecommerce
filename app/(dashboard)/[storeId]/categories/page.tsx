import { format } from 'date-fns';

import prismaDB from "@/lib/prisma";
// components
import { BillboardClient } from "./components/client";

// type
import { CategoryColumn } from "./components/columns";


const CategoriesPage = async ({ params }: {params: { storeId: string}}) => {
  
  const categories = await prismaDB.category.findMany({
    where: {
      storeId: params.storeId
    },
    include: { 
      billboard: true
    },
    orderBy: {
      createdAt: "desc"
    }
  })
  console.log(categories);
  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))

  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <BillboardClient data={formattedCategories}/>

        </div>
    </div>
  )
}

export default CategoriesPage;