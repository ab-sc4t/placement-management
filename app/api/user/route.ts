import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    try {
        console.log("try1");
        const body = await req.json();
        const { email, password, firstname, lastname } = body;
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