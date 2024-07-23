"use client"
import { Card } from "@repo/ui/card";

export const BalanceCard = ({amount, locked}: {
    amount: number;
    locked: number;
}) => {
    return (
        <div className=" bg-sky-500 mx-[140px] rounded-2xl mt-5">
            <div className="text-white flex justify-between items-center px-10">
                <h1 className="text-4xl font-mono">Available Balance</h1>
                <div className="flex">
                    {/* <div className="m-4 text-xl font-sans">
                        <h1 className="font-sans">Unlocked Amount</h1>
                        <h1>{amount/100} INR</h1>
                    </div>
                    <div className="m-4 text-xl font-sans">
                        <h1 className="font-sans">Locked Amount</h1>
                        <h1>{locked/100} INR</h1>
                    </div> */}
                    <div className="m-4 text-xl font-sans">
                        <h1>Total Balance</h1>
                        <h1>{(locked+amount)/100} INR</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
