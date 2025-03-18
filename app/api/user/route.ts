import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log(body);
        
        const { email, password, firstname, lastname, role } = body;

        if (!email || !firstname || !lastname || !role) {
            return NextResponse.json({ message: "All fields are required" }, { status: 1000 });
        }

        if (role === "admin") {
            if (!password) {
                return NextResponse.json({ message: "Password is required for admin signup" }, { status: 400 });
            }

            const existingAdmin = await db.adminUser.findUnique({ where: { email } });
            if (existingAdmin) {
                return NextResponse.json({ message: "Admin already exists" }, { status: 409 });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newAdmin = await db.adminUser.create({
                data: { email, password: hashedPassword, firstname, lastname },
            });

            const { password: _, ...safeAdminData } = newAdmin;
            return NextResponse.json(safeAdminData, { status: 201 });
        }
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
    }
}
