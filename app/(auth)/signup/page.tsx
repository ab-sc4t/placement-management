"use client"
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useState } from "react";

export default function AdminSignup() {
    const router = useRouter();
    const [error, setError] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");

        const form = event.currentTarget as HTMLFormElement;
        const formData = {
            firstname: form.firstname.value,
            lastname: form.lastname.value,
            email: form.email.value,
            password: form.password.value,
            role: "admin", // Automatically assigning "admin" role
        };

        try {
            // Hash the password before sending it to the server
            const pass = formData.password

            const res = await axios.post(
                "/api/user",  
                { ...formData, password: pass },
                { headers: { "Content-Type": "application/json" } }
            );

            if (res.status === 201) {
                router.push("/signin");  // Redirect to admin login page
            } else {
                throw new Error("Signup failed");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            setError("Signup failed. Please check your details and try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-2 text-black">Admin Sign Up</h2>
                <p className="text-sm text-gray-600 text-center mb-6">
                    Only admins can create an account
                </p>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            required
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
                            required
                            placeholder="Bansal"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black text-black"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Admin Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="admin@example.com"
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
                            required
                            placeholder="Enter a strong password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black text-black"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                        Sign Up as Admin
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600 mt-4">
                    Already an admin?{" "}
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
