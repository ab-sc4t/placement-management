import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { jobId: string } }) {
    const jobId = parseInt(params.jobId);

    if (isNaN(jobId)) {
        return NextResponse.json({ success: false, error: "Invalid job ID" }, { status: 400 });
    }

    try {
        await db.jobDetails.delete({
            where: { id: jobId },
        });

        return NextResponse.json({ success: true, message: "Job deleted" });
    } catch (error) {
        console.error("Error deleting job:", error);
        return NextResponse.json({ success: false, error: "Could not delete job" }, { status: 500 });
    }
}