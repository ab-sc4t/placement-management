import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: "/signin",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "ayush@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log("its coming here");

                console.log("email: ", credentials?.email);
                console.log("email: ", credentials?.password);
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                const existingUser = await db.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                })
                console.log("jerfbherbfwhre: ", existingUser);
                if (!existingUser) {
                    return null;
                }
                const passwordMatch = await compare(credentials.password, existingUser.password);
                if (!passwordMatch) {
                    return null;
                }
                return {
                    id: `${existingUser.id}`, //it is in string format
                    firstname: existingUser.firstname,
                    lastname: existingUser.lastname,
                    email: existingUser.email,
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user}) {
            if(user){
                return{
                    ...token,
                    firstname: user.firstname,
                    lastname: user.lastname,
                }
            }
            return token
        },
        async session({ session, token }) {
            return{
                ...session,
                user:{
                    ...session.user,
                    firstname: token.firstname,
                    lastname: token.lastname
                }
            }
            return session
        }
    }
}