import React from "react";
import { ICONS, type IconName } from "./icon-data";

interface Props {
    name: IconName;
    size?: number;
    width?: number;
    height?: number;
}
function Icon({
    name,
    width: widthFromProps,
    height: heightFromProps,
    size = 24,
}: Props) {
    const width = widthFromProps || size;
    const height = heightFromProps || size;

    return <img alt={name} src={ICONS[name]} width={width} height={height} />;
}

export default Icon;
