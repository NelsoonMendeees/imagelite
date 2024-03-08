import React from "react";

interface ButtonProps {
    style?: string;
    label?: string;
    dataId?: string;
    onClick?: (event: any) => void;
    type?: "submit" | "button" | "reset" | undefined
}

export const Button: React.FC<ButtonProps> = ({ onClick, style, label, dataId, type }) => {
    return (
        <button type={type} data-cy={dataId} className={`${style} text-white px-4 py-2 rounded-lg`} onClick={onClick}>{label}</button>
    )
}