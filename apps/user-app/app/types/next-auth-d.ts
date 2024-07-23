import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    id: String
  }
  interface Session {
    user: User & {
      id: String
    },
    token: {
        id: String
    }
  }
}