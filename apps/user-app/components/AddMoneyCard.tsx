"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createOnRampTransaction } from "../app/lib/actions/createOnrampTransaction";
import {updateOnrampFailure} from "../app/lib/actions/updateOnrampFailure";

import crypto from "crypto";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [value, setValue] = useState(0)
    return (
        <div className="w-full bg-white rounded-xl p-8">
            <h1 className="text-3xl text-sky-800 font-bold font-sans">Add Money</h1>
            <h1 className="text-xl font-bold font-sans">Transfer money from your <span className="text-sky-500">bank</span> to <span className="text-sky-500">PayEazzy Wallet</span></h1>
            <TextInput label={"Amount"} placeholder={"Enter Amount"} onChange={(val) => {
                setValue(Number(val))
            }} />
            <div className="py-2 mt-4 text-lg font-semibold text-left">
                Bank
            </div>
            <Select onSelect={(value) => {
                setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "");
                setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "");
            }} options={SUPPORTED_BANKS.map(x => ({
                key: x.name,
                value: x.name
            }))} />
            <div className="flex justify-center pt-4 mt-5">
                <Button onClick={async () => {
                    const response = await createOnRampTransaction(provider, value)

                    if (!response.transaction?.userId || !response.transaction?.id || !response.transaction?.amount) {
                        await updateOnrampFailure(response.transaction?.id || 0)
                        return alert("Something went wrong");
                    }
                    const clientcode = response.transaction?.userId.toString();
                    const merchantcode = "payeazzy123"
                    const client_txn_token = response.transaction?.id.toString();
                    const amount = response.transaction?.amount.toString();
                    const secret = process.env.BANKCLIENTSECRET || ""

                    const dataString = `${response.transaction?.userId}${merchantcode}${response.transaction?.id}${response.transaction?.amount}`;
                    const generatedChecksum = crypto.createHmac("sha256", secret).update(dataString).digest("hex");

                    console.log(generatedChecksum)

                    const checksum = generatedChecksum;
                    
                    const url = new URL('http://localhost:3004/provider/pay');
                    url.searchParams.append('clientcode', clientcode);
                    url.searchParams.append('merchantcode', merchantcode);
                    url.searchParams.append('client_txn_token', client_txn_token);
                    url.searchParams.append('amount', amount);
                    url.searchParams.append('checksum', checksum);

                    console.log(url)

                    try {
                        const bankres = await fetch(url.toString());
                        if (!bankres.ok) {
                            await updateOnrampFailure(response.transaction?.id)
                            alert("Transaction failed");
                        }
                        const data = await bankres.json();
                        if (data.message == "Error") {
                            await updateOnrampFailure(response.transaction?.id)
                            alert("Transaction failed");
                        }
                        console.log(data);
                        window.location.href = redirectUrl || "";
                    } catch (error) {
                        console.error("Failed to fetch:", error);
                        await updateOnrampFailure(response.transaction?.id)
                        alert("Transaction failed");
                        window.location.reload();
                    }
                }}>
                Add Money
                </Button>
            </div>
        </div>
    );
}
