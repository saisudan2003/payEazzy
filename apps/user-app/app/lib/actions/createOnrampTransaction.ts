"use server"
import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"

export async function createOnRampTransaction (provider:string, amount:number) {
    const session = await getServerSession(authOptions)
    if(!session?.user || !session.user?.id){
        return {
            message: "Unauthenticated req"
        }
    }
    const trxn = await prisma.onRampTransaction.create({
        data:{
            provider,
            status: "Processing",
            startTime: new Date(),
            userId: Number(session.user.id),
            amount: amount*100
        }
    })
    return {
        transaction: trxn
    }
}
