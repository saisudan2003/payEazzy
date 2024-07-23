import { AppbarClient } from "../../components/AppbarClient";
import { BalanceCard } from "../../components/BalanceCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import prisma from "@repo/db/client";

async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}){
    const balance = await getBalance();
    return (

    <div className="h-screen w-screen bg-gray-200">
        <AppbarClient />
        <BalanceCard amount={balance.amount} locked={balance.locked} />
        <div className="flex">
            {children}
        </div>
    </div>
    );
}
