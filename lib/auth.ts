import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { db } from "./db"; // Prisma client instance

export const authOptions: NextAuthOptions = {
    providers: [
        // Google OAuth (Only for Users)
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    scope: "openid profile email https://www.googleapis.com/auth/calendar.events",
                },
            },
        }),

        // Credentials-based login (Only for Admins)
        CredentialsProvider({
            name: "Admin Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    console.error("❌ Missing email or password");
                    throw new Error("Missing email or password");
                }
            
                const admin = await db.adminUser.findUnique({
                    where: { email: credentials.email },
                });
            
                if (!admin) {
                    console.error("❌ Admin not found:", credentials.email);
                    throw new Error("Admin not found");
                }
            
                if (!admin.password) {
                    console.error("❌ Admin account is missing a password");
                    throw new Error("Admin account is missing a password");
                }
                // const hashedPass = await bcrypt.hash(credentials.password, 10)
                const passwordMatch = await bcrypt.compare(credentials.password, admin.password);
                if (!passwordMatch) {
                    console.log("passwordMatch: ", passwordMatch);
                    console.log("1: ", credentials.password);
                    console.log("2: ", admin.password);
                    console.error("❌ Invalid password for:", credentials.email);
                    throw new Error("Invalid password");
                }
            
                console.log("✅ Admin login successful:", admin.email);
                return { id: admin.id, email: admin.email, role: "admin", firstname: admin.firstname, lastname: admin.lastname };
            }            
        }),
    ],

    callbacks: {
        async jwt({ token, account, user, profile }) {
            if (user) {
                console.log(user.firstname);
                token.id = user.id;
                token.email = user.email;
                token.isAdmin = account?.provider === "credentials"; 
                token.firstname = user.firstname;
                token.lastname = user.lastname;
            }

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
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.role = token.role;
            session.user.firstname = token.firstname;
            session.user.lastname = token.lastname;
            session.user.image = token.picture;
            session.user.accessToken = token.accessToken;
            session.user.isAdmin = token.isAdmin;
            return session;
        },

        async signIn({ user, account, profile }) {
            if (account?.provider === "google" && profile) {
                // Check if user exists in the 'User' table
                const existingUser = await db.user.findUnique({
                    where: { email: profile.email },
                });

                if (!existingUser) {
                    // Create user if not found
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

        // async redirect({ url, baseUrl }) {
        //     return "/jobdetails";
        // },
    },

    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
        error: "/auth/error",
    },
};
