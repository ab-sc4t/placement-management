"use client";
import axios from "axios";
import { getSession } from "next-auth/react";
import { useState } from "react";

interface Job {
    index?: number;
    company?: string;
    jobTitle?: string;
    location?: string;
    round1?: string;
    round2?: string;
    round3?: string;
    eligibility?: string;
    package?: string;
}

interface AddToCalendarProps {
    job: Job;
    userId: Number; 
}

export default function AddToCalendar({ job, userId }: AddToCalendarProps)  {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const convertDateStringToISO = (dateString: string): string | null => {
        if (!dateString || dateString === "Not available") return null;
        const [day, month, year] = dateString.split("/");
        const fullYear = `20${year}`;
        const date = new Date(`${fullYear}-${month}-${day}T00:00:00Z`);
        return date.toISOString();
    };

    const handleAddToCalendar = async () => {
        setLoading(true);
        setMessage("");

        const session = await getSession(); 
        console.log("Access Session:", session);

        if (!session || !session.user?.accessToken) {
            setMessage("Unauthorized. Please sign in again.");
            setLoading(false);
            return;
        }

        const round1 = convertDateStringToISO(job.round1!);
        const round2 = convertDateStringToISO(job.round2!);
        const round3 = convertDateStringToISO(job.round3!);
        console.log("USER ID: ", userId);
        console.log("Converted Dates:", { round1, round2, round3 });

        const response = await axios.post("/api/calendar", {
            userId: userId,
            company: job.company,
            jobTitle: job.jobTitle,
            round1,
            round2,
            round3,
        }, {
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.data;
        console.log("API Response:", data);

        if (response) {
            setMessage("Job rounds added to Google Calendar!");
        } else {
            setMessage("Failed to add events. Try again.");
        }
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
