import { TopRightArrow } from "@/icons/TopRightArrow";
import Button from "./Button";
import LogoutButton from "./LogoutButton";
import Link from "next/link";

interface HeaderProps {
    session: any; // session can be passed here
}

export default function Header({ session }: HeaderProps) {
    return (
        <div>
            <div className="flex justify-between items-center p-4">
                <div className="pl-16 text-3xl">
                    <Link href="/">Placement Pro</Link>
                </div>
                <div className="flex gap-4 pr-16">
                    {session?.user ? (
                        <>
                            <span className="text-xl p-2">
                                Welcome, {session.user.firstname || 'User'}!
                            </span>
                            <div>
                                <LogoutButton />
                            </div>
                        </>
                    ) : (
                        <>
                            <Button
                                text="Admin Login"
                                href="/signin"
                                endingLogo={<TopRightArrow size="24" />}
                            />
                            <Button
                                text="Student Login"
                                href="/signin"
                                endingLogo={<TopRightArrow size="24" />}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
