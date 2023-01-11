import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
const SelectInput = ({name,options,selectValue,value,onChange}) => {
    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" className="capitalize">{name}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                name={name}
                label={name}
                onChange={onChange}
                // onChange={handleChange}
            >
                {options.map((option) => 
                    <MenuItem key={option._id} value={option[selectValue]} sx={{textTransform:"capitalize"}}>{option.name}</MenuItem>
                )}
            </Select>
        </FormControl>
    );
};

export default SelectInput;
