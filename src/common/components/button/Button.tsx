import Icon from "../icon/icon.tsx";
import { IconName } from "../icon/icon-data.tsx";

interface Props {
  onClick?: () => void;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  icon?: IconName;
  iconSize?: number;
}

export default function Button({ onClick, style, type = "button", children, icon, iconSize = 20 }: Props) {
  return (
    <button
      onClick={onClick}
      style={style}
      type={type}
      className="py-2 px-3 border border-black rounded-md bg-white hover:bg-gray-100"
    >
      <div className="flex flex-row space-x-2 items-center">
        {icon && <Icon name={icon} size={iconSize} />}
        <span>{children}</span>
      </div>
    </button>
  );
}
