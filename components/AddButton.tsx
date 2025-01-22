'use client'

interface AddButtonProps{
    text: string
    onClick?: ()=>void
}

export default function AddButton(props: AddButtonProps) {
    return (
        <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={props.onClick}
        >
            {props.text}
        </button>
    )
}