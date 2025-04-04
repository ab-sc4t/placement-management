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

export async function POST(req: Request) {
    try {
        const { payload } = await req.json();

        const {
            companyName,
            jobTitle,
            jobLocation,
            eligibility,
            packageValue,
            numberOfRounds,
            round1Date,
            round2Date,
            round3Date,
            jobDescription,
            adminId,
        } = payload;

        const jobAdded = await db.jobDetails.create({
            data: {
                company: companyName,
                jobTitle,
                location: jobLocation,
                eligibility,
                package: packageValue,
                round1: round1Date,
                round2: round2Date,
                round3: round3Date,
                adminId,
            },
        });

        return NextResponse.json({ success: true, job: jobAdded });

    } catch (error) {
        console.error("Error while adding job: ", error);
        return NextResponse.json({ success: false, error: "Failed to add job" }, { status: 500 });
    }
}
