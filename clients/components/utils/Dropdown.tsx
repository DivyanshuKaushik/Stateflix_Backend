import React from "react";
interface Props {
    name: string;
    items: string[];
    className: string;
    onChange: any;
}

const Dropdown = ({ name, items, className, onChange }: Props) => {
    return (
        <select name={name} className={className} onChange={onChange}>
            <option value="">select</option>
            {items?.map((item: string) => 
                <option
                    value={item}
                    className="text-sm before:bg-transparent hover:after:bg-transparent "
                >
                    {item}
                </option>
            )}
        </select>
    );
};

export default Dropdown;
