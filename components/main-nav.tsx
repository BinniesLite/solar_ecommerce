"use client"

import { cn } from "@/lib/utils"
import Link  from "next/link";
import { useParams, usePathname } from "next/navigation";

export function MainNav({ 
    className,
    ...props
}: React.HtmlHTMLAttributes<HTMLElement>) {
    
    const pathName = usePathname();
    const params = useParams();

    const routes = [
        {
            href: `/${params?.storeId}`, // add a questions mark to safe guard lol
            label: 'Overview',
            active: pathName === `/${params.storeId}`
        },
        {
            href: `/${params?.storeId}/billboards`, // add a questions mark to safe guard lol
            label: 'Billboards',
            active: pathName === `/${params.storeId}/billboards`
        },
        {
            href: `/${params?.storeId}/settings`, // add a questions mark to safe guard lol
            label: 'Settings',
            active: pathName === `/${params.storeId}/settings`
        }
    ];  
    console.log(routes[0].label)

    return ( 
        // Merge the className we have to the default ones
        <nav 
            className={cn("flex items-center space-x-4 lg:space-x-6", className)}
        >
            {routes.map((route) => (
                <Link 
                    key={route.href} 
                    href={route.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        route.active ? "text-black dark:text-white" : "text-muted-foreground"
                    )}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    )
};