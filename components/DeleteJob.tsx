"use client"

import BinLogo from "@/icons/BinLogo";
import axios from "axios";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteJobInterface {
    userId: number;
    jobId: number;
}

export default function DeleteJob({ userId, jobId }: DeleteJobInterface) {
    const router = useRouter()
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);

        const session = await getSession();
        if (!session || !session.user?.isAdmin) {
            alert("Unauthorized");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.delete(`/api/jobs/${jobId}`);
            if (response.data.success) {
                // Optional: trigger a refetch or redirect
                alert("Job deleted successfully");
                router.push("/dashboard")
            } else {
                alert("Failed to delete job");
            }
        } catch (error) {
            console.error("Error deleting job:", error);
            alert("Error deleting job");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="block rounded-3xl bg-yellow-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 h-12 flex items-center justify-center"
        >
            <BinLogo />
            {loading && <span className="ml-2">Deleting...</span>}
        </button>
    );
}
