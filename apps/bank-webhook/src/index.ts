import express from "express"
import prisma from "@repo/db/client"
import crypto from "crypto";
import cors from "cors"

const app = express()
app.use(express.json());
app.use(cors());
app.get("/provider/pay", async (req, res) => {
    const {
      clientcode,
      merchantcode,
      client_txn_token, //onramp id
      amount,
      checksum,
    } = req.query;

    console.log("recieeved query")
    console.log(checksum)
    console.log(clientcode)
    console.log(merchantcode)
    console.log(client_txn_token)
    console.log(checksum)

  
    if (!clientcode || !merchantcode || !client_txn_token || !amount || !checksum) {
      return res.status(400).json({ message: "Missing required query parameters" });
    }
    
    const dataString = `${clientcode}${merchantcode}${client_txn_token}${amount}`;
    console.log(dataString)

    const secret = process.env.BANKCLIENTSECRET || ""
    const generatedChecksum = crypto.createHmac("sha256", secret).update(dataString).digest("hex");

    console.log(generatedChecksum)

    if (generatedChecksum !== checksum) {
      return res.status(400).json({ message: "Error" });
    }

    console.log("verified",generatedChecksum," ",checksum)
    try {
      await prisma.bank_db.create({
        data: {
          MerchantCode: merchantcode.toString(),
          ClientCode: clientcode.toString(),
          ClientTxnToken: client_txn_token.toString(),
          Amount: Number(amount),
        },
      });
      console.log("success")
      res.status(200).json({ message: "Captured" });
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ message: "Error" });
    }
});
  
app.listen(3004, () => {
    console.log('Server is running and listening on port 3004');
});