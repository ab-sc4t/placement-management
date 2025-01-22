// app/signin/page.tsx
"use client"
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function Signin() {
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
        const errorDiv = document.getElementById('error-message');

        submitButton.disabled = true;
        submitButton.textContent = 'Signing in...';

        if (errorDiv) {
            errorDiv.textContent = '';
            errorDiv.style.display = 'none';
        }

        const formData = {
            email: (form.elements.namedItem('email') as HTMLInputElement).value,
            password: (form.elements.namedItem('password') as HTMLInputElement).value,
            redirect: false,
        };

        try {
            const response = await signIn("credentials", formData);

            if (response?.error) {
                if (errorDiv) {
                    errorDiv.textContent = 'Invalid email or password';
                    errorDiv.style.display = 'block';
                }
            } else if (response?.ok) {
                router.push('/jobdetails');
                router.refresh();
            }
        } catch (error) {
            console.error("Error during signin:", error);
            if (errorDiv) {
                errorDiv.textContent = 'An unexpected error occurred';
                errorDiv.style.display = 'block';
            }
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = 'Sign In';
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-2 text-black">Sign In</h2>
                <p className="text-sm text-gray-600 text-center mb-6">
                    Enter your information to login
                </p>

                <div
                    id="error-message"
                    className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded"
                    style={{ display: 'none' }}
                ></div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
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
                            required
                            placeholder="Enter your password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black text-black"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Sign In
                    </button>
                </form>
                <p className="text-sm text-center text-gray-600 mt-4">
                    Dont have an account?{" "}
                    <a
                        href="/signup"
                        className="text-blue-500 hover:underline focus:ring focus:ring-blue-500"
                    >
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
}