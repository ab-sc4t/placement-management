'use client'

interface AddButtonProps {
    variant: "primary" | "secondary"
    text: string
    onClick?: () => void
    isSelected?: boolean
}

export default function AddButton(props: AddButtonProps) {
    const { variant, text, onClick, isSelected } = props;

    const variantClass = {
        "primary": `block rounded-md px-3 py-2 text-center text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
            ${isSelected ? "bg-black text-white" : "bg-gray-200 text-black hover:bg-gray-300"}`,
        "secondary": "block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    };

    return (
        <button
            type="button"
            className={variantClass[variant]} 
            onClick={onClick}
        >
            {text}
        </button>
    );
}
