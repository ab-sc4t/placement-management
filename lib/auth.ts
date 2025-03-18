import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { db } from "./db"; // Prisma client instance
import GoogleProvider from "next-auth/providers/google";

// console.log("Prisma Client Instance:", db); 

export const authOptions: NextAuthOptions = {
    
    // adapter: PrismaAdapter(db),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    scope: "openid profile email https://www.googleapis.com/auth/calendar.events", // Google Calendar access
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            // If user signs in for the first time, store tokens
            if (account && profile) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                token.idToken = account.id_token;
                token.provider = account.provider;
                token.firstname = profile.given_name;
                token.lastname = profile.family_name;
                token.picture = profile.picture;
            }
            return token;
        },

        async session({ session, token }) {
            // Attach JWT token values to the session object
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.idToken = token.idToken;
            session.user.firstname = token.firstname;
            session.user.lastname = token.lastname;
            session.user.image = token.picture;

            return session;
        },

        async signIn({ user, account, profile }) {
            if (account?.provider === "google" && profile) {
                const existingUser = await db.user.findUnique({
                    where: { email: profile.email },
                });

                if (!existingUser) {
                    await db.user.create({
                        data: {
                            firstname: profile.given_name,
                            lastname: profile.family_name,
                            email: profile.email,
                            image: profile.picture,
                        },
                    });
                }
            }
            return true;
        },
        async redirect({ url, baseUrl }) {
            return "/jobdetails"; 
        },
    },
    session: {
        strategy: "jwt", 
    },
};
