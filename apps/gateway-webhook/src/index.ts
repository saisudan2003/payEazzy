import express from "express";
import db from "@repo/db/client";
import crypto from "crypto";

const app = express();

app.use(express.json());

app.post("/confirmPayment", async (req, res) => {
    const { client_txn_token, clientcode, amount, checksum } = req.body;

    console.log(client_txn_token);
    console.log(clientcode);
    console.log(amount);
    console.log(checksum);
    const merchant = "payeazzy123"
    const dataString = `${clientcode}${merchant}${client_txn_token}${amount}`;
    console.log(dataString);

    const secret = process.env.BANKCLIENTSECRET || "";
    const generatedChecksum = crypto.createHmac("sha256", secret).update(dataString).digest("hex");

    if (generatedChecksum !== checksum) {
        return res.status(400).json({ message: "Invalid" });
    }
    try {
        await db.$transaction([
            db.balance.upsert({
                where: {
                    userId: Number(clientcode)
                },
                update: {
                    amount: {
                        increment: Number(amount)
                    }
                },
                create: {
                    userId: Number(clientcode),
                    amount: Number(amount),
                    locked: 0
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    id: Number(client_txn_token)
                }, 
                data: {
                    status: "Success",
                }
            })
        ])
        console.log("success")
        return res.json({
            message: "Captured"
        })
        
    }catch(err){
        console.error(err);
        return res.status(411).json({
            message: "Error"
        })
    }
})

app.listen(3003, () => {
    console.log('Server is running and listening on port 3003');
});

