import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        firstname: string,
        lastname: string,
        email: string
    }
    interface Session {
        user: User & {
            username: string
        }
        token: {
            firstname: string,
            lastname: string,
            email: string
        }
    }
}