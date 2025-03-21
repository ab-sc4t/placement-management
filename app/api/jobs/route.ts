import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        console.log("it is coming here");
        
        const { searchParams } = new URL(req.url);
        console.log("SearchParams: ", searchParams);
        
        const adminId = searchParams.get("adminId");

        let jobs;
        if (adminId) {
            jobs = await db.jobDetails.findMany({
                where: { adminId: Number(adminId) },  
            });
        } else {
            jobs = await db.jobDetails.findMany();
        }
        if (!jobs || jobs.length === 0) {
            return NextResponse.json({
                message: "No job details found.",
            });
        }

        return NextResponse.json(jobs);
    } catch (error) {
        console.error("Error fetching job details:", error);
        return NextResponse.json(
            { message: "Some error occurred while fetching job details." },
            { status: 500 }
        );
    }
}
