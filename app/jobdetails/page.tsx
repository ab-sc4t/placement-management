import SalaryTable from "@/components/SalaryTable"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

async function getSalaryData() {
    try {
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
    const session = await getServerSession(authOptions);
    console.log(session);
    
    return (    
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-2xl font-semibold leading-6 text-gray-900">Company Salaries</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all companies and their CTC offerings.
                        </p>
                    </div>
                </div>
                <SalaryTable salaryData={salaryData} />
            </div>
        </div>
    )
}