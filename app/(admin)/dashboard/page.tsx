import Button from "@/components/Button";
import Header from "@/components/Header"
import SalaryTable from "@/components/SalaryTable"
import { AddButtonLogo } from "@/icons/AddButtonLogo";
import { TopRightArrow } from "@/icons/TopRightArrow";
import { authOptions } from "@/lib/auth"
import axios from "axios";
import { getServerSession } from "next-auth"
import { getSession } from "next-auth/react";

async function getSalaryData(adminId?: Number) {
    try {
        console.log("Fetching salary data...");
        const url = adminId 
            ? `http://localhost:3000/api/jobs?adminId=${adminId}` 
            : `http://localhost:3000/api/jobs`;
        const response = await axios.get(url);
        const data = await response.data;
        console.log(`Job Data from ${adminId}: ${data}`);
        
        return data;
    } catch (error) {
        console.error('Error fetching salary data:', error)
        return []
    }
}

export default async function SalariesPage() {
    const session = await getServerSession(authOptions);
    console.log("Session Details:", session);

    const isAdmin = session?.user?.isAdmin || false; // Ensure a default value
    console.log("isAdmin:", isAdmin);

    const adminId = isAdmin ? Number(session?.user?.id) : undefined;
    console.log("checkpoint1: ", adminId);

    const salaryData = await getSalaryData(adminId);
    console.log("checkpoint2", salaryData);
    return (
        <div className="min-h-screen bg-gray-100">
            <Header session={session}/>
            <div className="py-8">
                <div className="px-16 sm:px-6 lg:px-16">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-2xl font-semibold leading-6 text-gray-900">COMPANY LISTING</h1>
                        </div>
                        <div>
                            {isAdmin ? <Button text="Add" href="/addJob" endingLogo={<AddButtonLogo/>}/> : 
                            <Button text="My Job Board" href="/dashboard" endingLogo={<TopRightArrow size="24"/>}/>}
                        </div>
                    </div>
                    <SalaryTable salaryData={salaryData} isAdmin={isAdmin} userId = {adminId}/>
                </div>
            </div>
        </div>
    )
}