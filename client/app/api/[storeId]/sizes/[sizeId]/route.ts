import prismaDB from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, sizeId: string } }
) {
    try {
        const { userId } = auth();

        const body = await req.json();
    
        const { name, value } = body;
    
        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }
    
        if (!name) {
            return new NextResponse("Label is required", { status: 400 });
        }
    
        
        if (!value) {
            return new NextResponse("Image Url is required", { status: 400 });
        }
    
        if (!params.sizeId) {
            return new NextResponse("Size Id is required", { status: 400 });
        }
    
        const storeByUserId = prismaDB.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) { 
            return new NextResponse("Unauthorized Access", { status: 403 });
        }
    
        const size = await prismaDB.size.updateMany({
            where: {
                id: params.sizeId
            },
            data: {
                name,
                value
            }
        })
    
        return NextResponse.json(size);
    } catch (error) {
        console.log("[BILLBOARD_PATCH]", error)
        return new NextResponse("Internal error", { status: 500 })
    }
   
}

// Need to have request and params
export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, sizeId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 403 });
        }

        if (!params.sizeId) {
            return new NextResponse("Store Id is required", { status: 400 });
        }
        
        const storeByUserId = prismaDB.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) { 
            return new NextResponse("Unauthorized Access", { status: 403 });
        }

        const size = await prismaDB.size.deleteMany({
            where: {
                id: params.sizeId
            },
        });

        return NextResponse.json(size);
    } catch (error) {
        console.log("[STORE_STOREID]", error)
        return new NextResponse("Something is wrong", { status: 500 });
    }
}

export async function GET(
    req: Request,
    { params }: { params: { sizeId: string } }
) {
    try {

        if (!params.sizeId) {
            return new NextResponse("Size Id is required", { status: 400 });
        }

        const size = await prismaDB.size.findUnique({
            where: {
                id: params.sizeId
            },
        });

        return NextResponse.json(size);
    } catch (error) {
        console.log("[SIZE_GET]", error)
        return new NextResponse("Something is wrong", { status: 500 });
    }
}