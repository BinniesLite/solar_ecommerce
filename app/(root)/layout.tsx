import { auth } from '@clerk/nextjs'; 
import { redirect } from 'next/navigation';
import prismaDB from '@/lib/prisma';

export default async function SetupLayout({children}: {children: React.ReactNode}) {
    const { userId } = auth();

    if (!userId) { 
        redirect("/sign-in");
    }
    const store = await prismaDB.store.findFirst({
        where: {
            userId: userId
        }
    });

    if (store) {
        redirect(`/${store.id}`);
    }

    // Let the thought flow to where it comes from nowhere
    return <>
    {children}
    </>
    
}