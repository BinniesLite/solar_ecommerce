import { auth } from '@clerk/nextjs'; 
import { redirect } from 'next/navigation';
import prismaDB from '@/lib/prisma';

export default async function SetupLayout({children}: {children: React.ReactNode}) {
    const { userId } = auth();

    if (!userId) { 
        redirect("/sign-in");
    }
    try {
        const store = await prismaDB.store.findFirst({
            where: {
                userId: userId
            }
        });

        console.log("[ROOT]",userId, store);
        if (store) {
            redirect(`/${store.id}`);
        }
    }
    catch { 
        console.log("[ROOT]", "something is wrong")
    }
    
    
    // Let the thought flow to where it comes from nowhere
     
    

    return <>
    {children}
    </>
    
}