"use client"
import { signOut } from "next-auth/react"

export default function LogoutButton() {
    return (
        <button
            onClick={() => signOut()}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
            Logout
        </button>
    )
}