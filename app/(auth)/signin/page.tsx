"use client"
import axios from "axios";
import { useRouter } from 'next/navigation';

export default function Signup() {
    const router = useRouter()
    const handleSubmit = async (event:any) => {
        event.preventDefault();

        const formData = {
            email: event.target.email.value,
            password: event.target.password.value,
        };

        console.log("Form Data Submitted:", formData);

        try {
            const res = await axios.post(
                "http://localhost:3000/api/auth/signin",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!res) {
                throw new Error("Signin failed");
            }
            console.log("res: ", res);
            const data = await res.data.id;
            console.log("data after signing in: ", data);

            router.push("/jobdetails")    
        } catch (error) {
            console.error("Error during signin:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-2 text-black">Sign In</h2>
                <p className="text-sm text-gray-600 text-center mb-6">
                    Enter your information to login
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="ayush@example.com"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black text-black"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black text-black"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                        Sign In
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600 mt-4">
                    Dont have an account?{" "}
                    <a
                        href="/signin"
                        className="text-blue-500 hover:underline focus:ring focus:ring-blue-500"
                    >
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
}
