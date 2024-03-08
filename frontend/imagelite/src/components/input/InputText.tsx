import React from "react"


interface InputTextProps {
    style?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    dataId?: string;
    placeholder?: string;
    id?: string;
    value?: string;
    type?: string;
}

export const InputText: React.FC<InputTextProps> = ({ style, dataId, type = "text", ...rest }) => {
    return (
        <input type={type} {...rest} data-cy={dataId} className={`${style} border px-3 py-2 rounded-lg text-gray-900`} />
    )
}