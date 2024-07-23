import { SendCard } from "../../../components/SendCard";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { P2pTransactions } from "../../../components/p2pTransactions";

async function getp2pTransactions() {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);

    const txns = await prisma.p2pTransfer.findMany({
        where: {
            OR: [
                { fromUserId: userId },
                { toUserId: userId },
            ]
        },
        include: {
            fromUser: true,
            toUser: true,
        },
    });

    return txns.map(t => ({
        time: t.timestamp,
        amount: Number(t.amount),
        fromUserId: t.fromUserId,
        fromUserName: t.fromUser.name || "",
        fromUserPhone: t.fromUser.number,
        toUserId: t.toUserId,
        toUserName: t.toUser.name || "",
        toUserPhone: t.toUser.number,
    }));
}

export default async function() {
    const transactions = await getp2pTransactions();

    return( <div className="w-screen">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4 m-10">
            <SendCard />
            <P2pTransactions transactions={transactions}/>
        </div>
    </div>
    )
}