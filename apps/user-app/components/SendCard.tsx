"use client"
import { Button } from "@repo/ui/button";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");

    return ( <div className="w-full bg-white rounded-xl p-8">
        <h1 className="text-3xl text-sky-800 font-bold font-sans">P2P Transfer</h1>
        <h1 className="text-xl font-bold font-sans"><span className="text-sky-500">Wallet - Wallet </span> Money Transfer Simplified !!</h1>
        <div className="min-w-72 pt-2">
            <TextInput placeholder={"Phone Number"} label="Reciepient phone number" onChange={(value) => {
                setNumber(value)
            }} />
            <TextInput placeholder={"Amount in INR"} label="Amount" onChange={(value) => {
                setAmount(value)
            }} />
            <div className="flex justify-center pt-4 mt-5">
                <Button onClick={async () => {
                    await p2pTransfer(number, Number(amount) * 100)
                    window.location.reload();
                }}>Send</Button>
            </div>
        </div>
        </div>
    )
}
