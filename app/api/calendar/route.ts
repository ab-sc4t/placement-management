import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(){
    try{
        //here goes the code
    } catch(error){
        console.error(error);
        return NextResponse.json({
            message:"think of it"
        })
    }
}