import BinLogo from "@/icons/BinLogo";
import axios from "axios";
import { getSession } from "next-auth/react";

interface DeletJobInterface{
    userId: Number
}

export default function DeleteJob({userId}: DeletJobInterface){

    const handleDelete = async () => {
        //set loading to be true
        const session = await getSession();
        if (!session || !session.user?.accessToken){
            //set msg
            return;
        }
        const response = await axios.delete("/jobs/${adminId}")
    }

    return(
        <div>
            <button
                // onClick={handleDelete}
                // disabled={loading}
                className="block rounded-3xl bg-yellow-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 h-12 flex items-center justify-center"
            >
                <BinLogo/>
                {/* {loading ? "Deleting..." : "Deleted"} */}
            </button>
        </div>
    )
}