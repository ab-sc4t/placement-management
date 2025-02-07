import Button from "@/components/Button";
import Header from "@/components/Header"
import SalaryTable from "@/components/SalaryTable"
import { TopRightArrow } from "@/icons/TopRightArrow";
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

async function getSalaryData() {
    try {
        console.log("waiting");
        const response = await fetch('http://localhost:3000/api/jobs')
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching salary data:', error)
        return []
    }
}

export default async function SalariesPage() {
    const salaryData = await getSalaryData()
    const session = await getServerSession(authOptions)
    console.log(session);
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
                    <SalaryTable salaryData={salaryData} />
                </div>
            </div>
        </div>
    )
}