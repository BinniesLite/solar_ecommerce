import prismaDB from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { userId } = auth();

  const body = await req.json();

  const { name } = body;

  if (!userId) {
    return new NextResponse("Unauthenticated", { status: 403 });
  }

  if (!name) {
    return new NextResponse("Name is required", { status: 400 });
  }

  if (!params.storeId) {
    return new NextResponse("Store Id is required", { status: 400 });
  }

  const store = await prismaDB.store.updateMany({
    where: {
      id: params.storeId,
      userId,
    },
    data: {
      name,
    },
  });

  return NextResponse.json(store);
}

// Need to have request and params
export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const store = await prismaDB.store.deleteMany({
      where: {
        id: params.storeId,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_STOREID]", error)
    return new NextResponse("Something is wrong", {status: 500});
  }
}
