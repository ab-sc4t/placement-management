"use client"
import { useState } from "react";

interface Job{
    index?: Number,
    company?: string,
    jobTitle?: string,
    location?: string,
    round1?: string,
    round2?: string,
    round3?: string,
    eligibility?: string,
    package?: string,
}

export default function AddToCalendar({ job }: { job: Job }) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    // console.log(job);
    
    const convertDateStringToISO = (dateString: string): string => {
        const [day, month, year] = dateString.split("/");
        const fullYear = `20${year}`; 
        
        const date = new Date(`${fullYear}-${month}-${day}T00:00:00Z`);
        return date.toISOString(); 
    };
    

    const handleAddToCalendar = async () => {
        setLoading(true);
        setMessage("");
        const round1= job.round1 != "Not available" ? convertDateStringToISO(job.round1) : null;
        const round2= job.round2 != "Not available" ? convertDateStringToISO(job.round2) : null;
        const round3= job.round3 != "Not available" ? convertDateStringToISO(job.round3) : null;
        console.log(round1);
        console.log(round2);
        console.log(round3);
        
        
        // const response = await fetch("/api/add-to-calendar", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({
        //         jobTitle: job.jobTitle,
        //         round1,
        //         round2,
        //         round3
        //     }),
        // });

        // const data = await response.json();
        // if (response.ok) {
        //     setMessage("Job rounds added to Google Calendar!");
        // } else {
        //     setMessage("Failed to add events. Try again.");
        // }
        setLoading(false);
    };

    return (
        <div>
            <button
                onClick={handleAddToCalendar}
                disabled={loading}
                className="block rounded-3xl bg-yellow-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 h-12 flex items-center justify-center"
            >
                {loading ? "Adding..." : "Add to Calendar"}
            </button>
            {message && <p className="mt-2 text-green-500">{message}</p>}
        </div>
    );
}
