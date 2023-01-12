import React from "react";
import {ImImages} from "react-icons/im"

const ImageInput = ({name,value,onChange}) => {
    return (
        <div className="flex relative h-6 w-6 cursor-pointer">
        <div className="z-0">
        <ImImages size={24} />

        </div>
            <input
                type="file"
                accept=".png,.jpg,.svg,.webp,.jpeg"
                name={name}
                value={value}
                id="image"
                onChange={onChange}
                className="absolute h-full w-full z-50 cursor-pointer opacity-0"
            />
        </div>
    );
};

export default ImageInput;
