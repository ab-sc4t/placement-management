import Link from "next/link"

interface LinkButtonProps{
    text: string
    href: string
}

export default function LinkButton(props: LinkButtonProps) {
    return (
        <Link
            className="block rounded-md bg-black px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-200 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-36"
            href={props.href}
        >
            {props.text}
        </Link>
    )
}