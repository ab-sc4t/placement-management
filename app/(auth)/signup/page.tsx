"use client"
import AddButton from "@/components/AddButton";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useState } from "react";

export default function Signup() {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);
    const handleAdminClick = (value:boolean)=>{
        setIsAdmin(value)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            admin: isAdmin,
            firstname: event.target.firstname.value,
            lastname: event.target.lastname.value,
            email: event.target.email.value,
            password: event.target.password.value,
        };

        console.log("Form Data Submitted:", formData);

        try {
            const res = await axios.post(
                "http://localhost:3000/api/user",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!res) {
                throw new Error("Signup failed");
            }

            const data = await res.data.rest;
            console.log(data);

            router.push("/signin")
        } catch (error) {
            console.error("Error during signup:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-2 text-black">Sign Up</h2>
                <p className="text-sm text-gray-600 text-center mb-6">
                    Enter your information to create an account
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 flex justify-center gap-4">
                        <div>
                            <AddButton text="Student" onClick={()=>handleAdminClick(false)} variant= "primary" isSelected={!isAdmin}/>
                        </div>
                        <div>
                        <AddButton text="Admin" onClick={()=>handleAdminClick(true)} variant= "primary" isSelected={isAdmin}/>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            placeholder="Ayush"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black text-black"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            placeholder="Bansal"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black text-black"
                        />
                    </div>
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
                        Sign Up
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600 mt-4">
                    Already have an account?{" "}
                    <a
                        href="/signin"
                        className="text-blue-500 hover:underline focus:ring focus:ring-blue-500"
                    >
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
}
