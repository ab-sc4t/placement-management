import Link from "next/link"
import LogoutButton from "./LogoutButton";
import LinkButton from "./LinkButton";

interface AppBarProps {
    session: any;
}

export default function AppBar({ session }: AppBarProps) {
    return (
        <div className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-xl font-semibold text-gray-900">
                            Placement-management
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        {session?.user ? (
                            <>
                                <span className="text-gray-700">
                                    Hello, {session.user.firstname || 'User'} {session.user.lastname || ''}
                                </span>
                                <LogoutButton />
                            </>
                        ) : (
                            <LinkButton text="SignIn" href="/signin"/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}