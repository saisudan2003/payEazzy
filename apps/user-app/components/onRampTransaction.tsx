import { Card } from "@repo/ui/card";

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        status: string,
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return (
            <div className="w-full bg-white rounded-xl p-8">
                <h1 className="text-3xl text-sky-800 font-bold font-sans">Recent Transactions</h1>
                <div className="text-center text-xl font-bold font-mono pb-8 pt-8">
                    No Recent transactions
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-white rounded-xl p-8">
            <h1 className="text-3xl text-sky-800 font-bold font-sans">Recent Transactions</h1>
            <div className="flex ml-2 justify-around">
                <div className="flex items-center">
                    <div className="h-[10px] w-[10px] rounded-full bg-green-500">

                    </div>
                    <h1 className="ml-2">Transfer Success</h1>
                </div>
                <div className="flex items-center">
                    <div className="h-[10px] w-[10px] rounded-full bg-yellow-500">

                    </div>
                    <h1 className="ml-2">Transfer Processing</h1>
                </div>
                <div className="flex items-center">
                    <div className="h-[10px] w-[10px] rounded-full bg-red-500">

                    </div>
                    <h1 className="ml-2">Transfer Failed</h1>
                </div>
            </div>
            <div className="pt-2 text-black">
            <div className="max-h-[320px] overflow-y-auto">
                {transactions.map(t => (
                    <div
                        key={t.time.getTime()}
                        className={`flex justify-between p-3 m-1  rounded-md ${
                            t.status === "Success"
                                ? "bg-green-400"
                                : t.status === "Failure"
                                ? "bg-red-400"
                                : "bg-yellow-400"
                        }`}
                    >
                        <div>
                            <div className="text-sm text-white">Transaction</div>
                            <div className="text-xs text-white">
                                {t.time.toDateString()}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center text-white">
                             Rs {t.amount / 100}
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
};
