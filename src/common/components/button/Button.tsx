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
            className="py-2 px-3 border-2 border-green-800 rounded-md bg-green-200 hover:bg-gray-100"
        >
            {children}
        </button>
    );
}
