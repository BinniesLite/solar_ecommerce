
import prismaDB from "@/lib/prisma"

import { CategoryForm } from "./components/category-form"

interface CategoryPageProps {
    params: { categoryId: string, storeId: string }
}

const BillboardPage: React.FC<CategoryPageProps> = async ({ params }) => {
    
    const category = await prismaDB.category.findUnique({
        where: {
            id: params.categoryId
        }
        
    })   

    const billboards = await prismaDB.billboard.findMany({
        where: {
            storeId: params.storeId
        }
        
    })
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 py-8 px-4">
                <CategoryForm 
                    initialData={category}
                    billboards={billboards}

                />
            
            </div>

        </div>
    )
}

export default BillboardPage