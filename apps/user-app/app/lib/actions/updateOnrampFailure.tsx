"use server"
import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"

export async function updateOnrampFailure (txn_id: number) {
    const session = await getServerSession(authOptions)
    if(!session?.user || !session.user?.id){
        return {
            message: "Unauthenticated req"
        }
    }
    try {
        await prisma.onRampTransaction.update({
            where:{
                id: txn_id
            },
            data: {
                status: "Failure"
            }
        });
        return {
            message: "Transaction status updated successfully"
        };
    } catch (error) {
        console.error("Failed to update transaction status:", error);
        return {
            message: "Failed to update transaction status"
        };
    }
}