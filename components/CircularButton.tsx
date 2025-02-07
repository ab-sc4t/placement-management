import Link from "next/link";
import { ReactElement } from "react";

interface ButtonProps {
    href: string;
    logo?: ReactElement;
}

export default function CircularButton(props: ButtonProps): React.ReactNode {
    return (
        <div className="pt-2 pl-8">
            <Link
                className="block rounded-full bg-yellow-500 px-2 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 h-24 w-24 flex items-center justify-center"
                href={props.href}
            >
                {props.logo && <div>{props.logo}</div>}
            </Link>
        </div>
    );
}
