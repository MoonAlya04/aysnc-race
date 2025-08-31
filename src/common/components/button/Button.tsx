interface Props {
    onClick?: () => void;
    style?: React.CSSProperties;
    type?: "button" | "submit" | "reset";
    children: React.ReactNode;
}

export default function Button(props: Props) {
    const { onClick, style, type = "button", children } = props;

    return (
        <button
            type={type}
            onClick={onClick}
            style={style}
            className="py-2 px-3 border border-black rounded-md bg-white hover:bg-gray-100"
        >
            {children}
        </button>
    );
}
