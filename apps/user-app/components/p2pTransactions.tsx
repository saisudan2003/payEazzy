// model p2pTransfer {
//     id         Int          @id @default(autoincrement())
//     amount     Int
//     timestamp  DateTime
//     fromUserId Int
//     fromUser   User         @relation(name: "FromUserRelation", fields: [fromUserId], references: [id])
//     toUserId   Int
//     toUser     User         @relation(name: "ToUserRelation", fields: [toUserId], references: [id])
// }
// time: t.timestamp,
//         amount: Number(t.amount),
//         fromUserId: t.fromUserId,
//         fromUserName: t.fromUser.name,
//         fromUserPhone: t.fromUser.number,
//         toUserId: t.toUserId,
//         toUserName: t.toUser.name,
//         toUserPhone: t.toUser.number,

"use client"
import { useSession } from "next-auth/react";
export const P2pTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        fromUserId: number,
        fromUserName: string,
        fromUserPhone: string,
        toUserId: number,
        toUserName: string,
        toUserPhone: string
    }[]
}) => {
    const session = useSession()
    const curr_user = Number(session?.data?.user?.id)
    if (!transactions.length) {
        return (
            <div className="w-full bg-white rounded-xl p-8">
                <h1 className="text-3xl text-sky-800 font-bold font-sans">Recent P2P Transactions</h1>
                <div className="text-center text-xl font-bold font-mono pb-8 pt-8">
                    No Recent transactions
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-white rounded-xl p-8">
            <h1 className="text-3xl text-sky-800 font-bold font-sans">Recent P2P Transactions</h1>
            <div className="flex ml-2 justify-around">
                <div className="flex items-center">
                    <div className="h-[15px] w-[15px] rounded-full bg-sky-500">

                    </div>
                    <h1 className="ml-2">Paid</h1>
                </div>
                <div className="flex items-center">
                    <div className="h-[15px] w-[15px] rounded-full bg-sky-800">

                    </div>
                    <h1 className="ml-2">Recieved</h1>
                </div>
            </div>
            <div className="pt-2 text-black">
            <div className="max-h-[320px] overflow-y-auto">
                {transactions.map(t => (
                    t.fromUserId === curr_user ? (<div
                    key={t.time.getTime()}
                    //paid
                    className="flex justify-between p-3 m-1 text-white rounded-md bg-sky-500">
                        <div>
                            <div className="text-sm"><span className="font-semibold"> Paid to: </span><span className="font-sm">{t.toUserName}</span></div>
                            <div className="text-sm"><span className="font-semibold"> Phone no: </span><span className="font-sm">{t.toUserPhone}</span></div>
                            <div className="text-xs font-semibold">
                                {t.time.toDateString()}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                             Rs {t.amount / 100}
                        </div>
                    </div>
                    ) : (<div
                        key={t.time.getTime()}
                        //recieved
                        className="flex justify-between p-3 m-1 text-white rounded-md bg-sky-800">
                            <div>
                            <div className="text-sm"><span className="font-semibold"> Recieved from: </span><span className="font-sm">{t.fromUserName}</span></div>
                            <div className="text-sm"><span className="font-semibold"> Phone no: </span><span className="font-sm">{t.fromUserPhone}</span></div>
                                <div className="text-xs">
                                    {t.time.toDateString()}
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                 Rs {t.amount / 100}
                            </div>
                        </div>
                    )
                ))}
            </div>
            </div>
        </div>
    );
};
