import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "abc@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any){
                if(!credentials.email || !credentials.password)
                return null

                const existingUser = await db.user.findFirst({
                    where: {
                        email: credentials.email
                    }
                });

                if(!existingUser)
                return null

                if (existingUser) {
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                    if (passwordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.email
                        }
                    }
                    return null;
                }
                return null;
            }
        })
    ],
    secret: process.env.JWT_SECRET,
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: token.sub || "*",
                    name: token.name,
                    email: token.email,
                };
            }
            return session;
        }
    },
    pages: {
        signIn: "/signin"
    }
}