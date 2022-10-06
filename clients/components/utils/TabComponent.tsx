import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// tabs
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

// tab component props
interface TabCompProps {
    children: React.ReactNode;
    labels: string[];
    value:number
    setValue:any
}

// tab panel function
export function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
// tab props
function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const TabComponent = ({ children, labels ,value,setValue}: TabCompProps) => {
    // const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                className="sticky top-0"
            >
                {labels?.map((label, index) => (
                    <Tab key={index} label={label} {...a11yProps(index)} />
                ))}
            </Tabs>
            {children}
        </>
    );
};

export default TabComponent;
