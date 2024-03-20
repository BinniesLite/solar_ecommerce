
import prismaDB from "@/lib/prisma"

import { SizeForm } from "./components/size-form"

interface BillboardPageProps {
    params: { sizeId: string }
}

const SizePage : React.FC<BillboardPageProps> = async ({ params }) => {
    
    const size = await prismaDB.size.findUnique({
        where: {
            id: params.sizeId
        }
    })   

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 py-8 px-4">
                <SizeForm 
                    initialData={size}
                />

            </div>

        </div>
    )
}

export default SizePage 