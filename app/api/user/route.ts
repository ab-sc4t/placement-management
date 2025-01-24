import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
// import * as z from "zod";

// const userSchema = z
//     .object({
//         email: z.string().min(1, 'Email is required').email('Invalid email'),
//         password: z
//             .string()
//             .min(1, 'Password is required')
//             .min(8, 'Password must have than 8 characters'),
//             firstname: z.string(),
//             lastname: z.string()
//     })

export async function POST(req: NextRequest) {
    try {
        console.log("try1");
        const body = await req.json();
        const { email, password, firstname, lastname, admin } = body;
        console.log(admin);
        console.log(email);
        console.log(password);
        console.log(firstname);
        console.log(lastname);
        console.log("try2");

        const existingUser = await db.user.findFirst({
            where: {
                email: email
            }
        });
        console.log("try3");
        console.log(existingUser);

        if (existingUser) {
            return NextResponse.json({
                message: "User already exists"
            })
        } else {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            console.log(email);
            console.log(password);
            console.log(firstname);
            console.log(lastname);

            const newUser = await db.user.create({
                data: {
                    admin: admin,
                    email: email,
                    password: hashedPassword,
                    firstname: firstname,
                    lastname: lastname
                }
            })
            //this way rest will not contain password filed and we wont be sending back password as it is not secure.
            const { password: newUserPassword, ...rest } = newUser;
            return NextResponse.json(rest)
        }
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 });
    }
}