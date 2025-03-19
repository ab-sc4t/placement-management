import Button from "@/components/Button";
import Header from "@/components/Header"
import SalaryTable from "@/components/SalaryTable"
import { TopRightArrow } from "@/icons/TopRightArrow";
import { authOptions } from "@/lib/auth"
import axios from "axios";
import { getServerSession } from "next-auth"
import { getSession } from "next-auth/react";

async function getSalaryData(adminId?: String) {
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
    const session = await getServerSession(authOptions)
    console.log("Session Details: " , session);
    const isAdmin = session?.user.isAdmin;
    const adminId = isAdmin ? session.user.id : undefined;
    const id = Number(session?.user.id);
    console.log("checkpoint1");
    
    const salaryData = await getSalaryData(adminId);
    console.log("checkpoint2");
    return (
        <div className="min-h-screen bg-gray-100">
            <Header session={session}/>
            <div className="py-8">
                <div className="px-16 sm:px-6 lg:px-16">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-2xl font-semibold leading-6 text-gray-900">Company Listing</h1>
                        </div>
                        <div>
                            <Button text="My Job Board" href="/dashboard" endingLogo={<TopRightArrow size="24"/>}/>
                        </div>
                    </div>
                    <SalaryTable salaryData={salaryData} isAdmin={isAdmin} userId = {id}/>
                </div>
            </div>
        </div>
    )
}