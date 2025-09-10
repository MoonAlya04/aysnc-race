
import React, { PropsWithChildren } from "react";
import { IconName } from "../Icon/Icon-data";
import Icon from "../Icon/Icon";

interface Props {
  onClick?: () => void;
  style?: React.CSSProperties;
  icon?: IconName;
  iconSize?: number;
  disabled?: boolean;
}

function Button({ onClick, style, children, icon, iconSize, disabled }: PropsWithChildren<Props>) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={style}
      className={`py-2 px-3 border border-black rounded-md  ${disabled ? "bg-gray-200" : "bg-[#FFD300] hover:bg-gray-100 "}`}
    >
      <div className="flex flex-row space-x-4 items-center">
        {icon && (
          <div>
            <Icon name={icon} size={iconSize} />
          </div>
        )}
        <div>
          <span>{children}</span>
        </div>
      </div>
    </button>
  );
}

export default Button;
