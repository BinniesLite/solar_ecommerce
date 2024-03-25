import prismaDB from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const { userId } = auth();
        if (!userId) return new NextResponse("Unauthenticated", { status: 403 });

        const body = await req.json();
        const { name, price, categoryId, sizeId, images, isFeatured, isArchived } = body;

        // Function to simplify validation
        const validateField = (field: any, fieldName: any) => {
            if (!field) return new NextResponse(`${fieldName} is required`, { status: 400 });
        };

        // Validate required fields
        validateField(name, "Name");
        validateField(price, "Price");
        validateField(images, "Images");
        validateField(categoryId, "Category ID");
        validateField(sizeId, "Size ID");
        validateField(params.storeId, "Store ID");

        const storeByUserId = await prismaDB.store.findFirst({
            where: { id: params.storeId, userId },
        });

        if (!storeByUserId) return new NextResponse("Unauthorized", { status: 403 });

        const product = await prismaDB.product.create({
            data: {
                name,
                price,
                categoryId,
                sizeId, 
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string}) => image)
                        ]
                    }
                }, 
                isFeatured, 
                isArchived, 
                storeId: params.storeId
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error("[PRODUCT_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

// Use this extensively lol
export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {

        const { searchParams } = new URL(req.url)
        
        const categoryId = searchParams.get("categoryId") || undefined;
        
        const sizeId = searchParams.get("categoryId") || undefined;
        
        const isFeatured = searchParams.get("categoryId") || undefined;
        
    
        const products = await prismaDB.product.findMany({
            where: {
                storeId: params.storeId,
                categoryId,
                sizeId,
                isFeatured: isFeatured ? true : undefined,
                isArchived: false
            },
            include: {
                images: true,
                category: true,
                size: true
            },
            orderBy: {
                createdAt: "asc"
            }
        })

        return NextResponse.json(products);
    } catch (error) {
        console.log("[BILLBOARD_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}