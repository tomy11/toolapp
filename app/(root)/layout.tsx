import { authOptions } from "@/libs/AuthOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Image from 'next/image'
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

interface ProtectedRootLayoutProps {
    children: React.ReactNode 
}

export default async function ProtectedRootLayout({ children }: ProtectedRootLayoutProps) {
    const session = await getServerSession(authOptions);

    if(!session?.user?.email){
        redirect("/signin");
    }

    return (
        <div className='border-b px-4 py-2'>
             <div className='mx-auto flex flex-row items-center relative w-full justify-between'>
                <Link href={"/"}>
                    <Image 
                        src={"/vercel.svg"}
                        alt='Logo'
                        height={100}
                        width={100}
                    />
                </Link>
                <div className='hidden md:block'>
                    <LogoutButton />
                </div>
        
            </div>  
            <div className='w-full'>
                <div className={`max-w-[1280px] mx-auto`}>
                    {children}
                </div>
            </div>
        </div>
    )
}