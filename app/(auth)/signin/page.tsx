"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function SignIn() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        const form = event.currentTarget;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;

        try {
            const response = await signIn("credentials", { email, password, redirect: false });

            if (response?.error) {
                setError("Invalid admin credentials.");
            } else if (response?.ok) {
                router.push("/dashboard"); // Redirect admins to the admin panel
                router.refresh();
            }
        } catch (error) {
            console.error("Error during sign-in:", error);
            setError("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-2 text-black">Sign In</h2>
                <p className="text-sm text-gray-600 text-center mb-6">
                    Admins use credentials. Users sign in with Google.
                </p>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                {/* Google Sign-In for Users */}
                <button
                    onClick={() => signIn("google", { callbackUrl: "/jobdetails" })}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-100 transition-all"
                >
                    <FcGoogle className="text-xl" />
                    <span className="text-gray-700 font-medium">Sign in with Google</span>
                </button>

                {/* Admin Credential Sign-In Form */}
                <form onSubmit={handleSubmit} className="mt-4">
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
                            Admin Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            placeholder="Enter your password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black text-black"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Sign In as Admin"}
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600 mt-4">
                    Don't have an admin account?{" "}
                    <a href="/signup" className="text-blue-500 hover:underline focus:ring focus:ring-blue-500">
                        Sign Up as Admin
                    </a>
                </p>
            </div>
        </div>
    );
}
