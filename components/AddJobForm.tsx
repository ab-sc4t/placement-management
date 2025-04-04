"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddJobPage({ adminId }: { adminId: string }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        companyName: "",
        jobTitle: "",
        jobLocation: "",
        eligibility: "",
        packageValue: "",
        numberOfRounds: "",
        round1Date: "",
        round2Date: "",
        round3Date: "",
        jobDescription: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        const payload = {
            ...formData,
            adminId,
        };

        try {
            const res = await axios.post("/api/jobs", {payload}, {
                headers: { "Content-Type": "application/json" },
            });
            console.log("Job added:", res.data);
            if(res.data.success == true){
                router.push("/dashboard")
            } else{
                alert("Error")
            }
        } catch (error) {
            console.error("Error adding job:", error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10 w-screen">
            <h2 className="text-2xl font-bold mb-4">Add New Job</h2>
            <div className="grid grid-cols-2 gap-4">
                <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} className="border p-2 rounded w-full" />
                <input type="text" name="jobTitle" placeholder="Job Title" value={formData.jobTitle} onChange={handleChange} className="border p-2 rounded w-full" />
                <input type="text" name="jobLocation" placeholder="Enter Job Location" value={formData.jobLocation} onChange={handleChange} className="border p-2 rounded w-full" />
                <input type="text" name="eligibility" placeholder="Eligibility" value={formData.eligibility} onChange={handleChange} className="border p-2 rounded w-full" />
                <input type="text" name="packageValue" placeholder="Package (CTC)" value={formData.packageValue} onChange={handleChange} className="border p-2 rounded w-full" />
                <select name="numberOfRounds" value={formData.numberOfRounds} onChange={handleChange} className="border p-2 rounded w-full">
                    <option value="">Select Rounds</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <input type="date" name="round1Date" value={formData.round1Date} onChange={handleChange} className="border p-2 rounded w-full" />
                <input type="date" name="round2Date" value={formData.round2Date} onChange={handleChange} className="border p-2 rounded w-full" />
                <input type="date" name="round3Date" value={formData.round3Date} onChange={handleChange} className="border p-2 rounded w-full" />
                <textarea name="jobDescription" placeholder="Job Description" value={formData.jobDescription} onChange={handleChange} className="border p-2 rounded w-full col-span-2" />
            </div>
            <div className="flex justify-end gap-2 mt-4">
                <button onClick={handleSubmit} className="px-4 py-2 bg-yellow-500 text-white rounded">Add Job</button>
            </div>
        </div>
    );
}
