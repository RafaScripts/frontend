import {getServerSession} from "next-auth";
import {nextAuthOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect, useRouter} from 'next/navigation';


import Dashboard from "@/components/menu/menu";
export default async function RootLayout({children}:{children: React.ReactNode}){
    const session = await getServerSession(nextAuthOptions);

    if(!session){
        redirect('/signin');
    }


    return (
        <Dashboard>
            {children}
        </Dashboard>
    );
}