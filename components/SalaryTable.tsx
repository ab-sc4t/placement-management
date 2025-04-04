import { AddButtonLogo } from "@/icons/AddButtonLogo";
import AddButton from "./AddButton";
import Button from "./Button";
import AddToCalendar from "./AddToCalendar";
import DeleteJob from "./DeleteJob";

interface Data {
    adminId: number;
    company: string;
    package: string;
    jobTitle: string;
    eligibility: string;
    location: string;
    round1: string;
    round2: string;
    round3: string;
    id: number
}

type DataArray = Data[]

interface SalaryTableProps {
    salaryData: DataArray,
    isAdmin: Boolean,
    userId: Number
}

export default function SalaryTable({ salaryData, isAdmin, userId }: SalaryTableProps) {

    const AddorDelete = isAdmin ? "Delete" : "Add";

    return (
        <div className="mt-8 overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
                <div className="overflow-auto shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                            <tr>
                                {[
                                    "#", "Company Name", "Job Title", "Location", "Round 1 Date",
                                    "Round 2 Date", "Round 3 Date", "Eligibility", "Package (in Lakhs)", `${AddorDelete}`
                                ].map((heading, index) => (
                                    <th key={index}
                                        className="px-6 py-3 text-left text-sm font-semibold text-gray-900 min-w-[180px]"
                                    >
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {salaryData.length > 0 ? (
                                salaryData.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900 w-auto">{index + 1}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900 min-w-[200px]">{item.company}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900 min-w-[200px]">{item.jobTitle}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900 min-w-[200px]">{item.location}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900 min-w-[200px]">{item.round1}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900 min-w-[200px]">{item.round2}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900 min-w-[200px]">{item.round3}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900 min-w-[200px]">{item.eligibility}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900 min-w-[200px]">{item.package}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500 min-w-[120px]">
                                            {isAdmin ? <DeleteJob userId={userId} jobId={item.id} />
                                                : <AddToCalendar job={item} userId={userId} />}
                                        </td>
                                    </tr>
                                ))
                            ) :
                                <tr>
                                    <td className="px-6 py-4 text-center text-sm text-gray-500">
                                        No Jobs to display
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
