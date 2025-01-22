import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const jobs = await db.jobDetails.findMany({});
        if(!jobs){
            return NextResponse.json({
                message: "No Jobs details found."
            })
        } else{
            return NextResponse.json(jobs);
        }
    } catch(error){
        console.error(error);
        return NextResponse.json({
            message:"Some error occured ehile fetching job details."
        })
    }
}