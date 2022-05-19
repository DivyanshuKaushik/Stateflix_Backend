import React from "react";
interface Props {
    name: string;
    items: string[];
    className: string;
    onChange: any;
    value?:string
}

const Dropdown = ({ name, items, className, onChange ,value}: Props) => {
    return (
        <select name={name} className={className} onChange={onChange}>
            <option value={value ? value : ""}>select</option>
            {items?.map((item: string,i:number) => 
                <option
                    key={i}
                    value={item}
                    className="text-sm before:bg-transparent hover:after:bg-transparent "
                >
                    {item}
                </option>
            )}``
        </select>
    );
};

export default Dropdown;
