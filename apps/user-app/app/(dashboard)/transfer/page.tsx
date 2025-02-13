import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { OnRampTransactions } from "../../../components/onRampTransaction";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";



async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

export default async function() {
    const transactions = await getOnRampTransactions();

    return <div className="w-screen">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4 m-10">
            <AddMoney />
            <OnRampTransactions transactions={transactions} />
        </div>
    </div>
}