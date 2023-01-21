import * as React from "react";
import { Drawer as MuiDrawer, Box } from "@mui/material";

export default function Drawer({ children, type, state, setState, width,styles }) {
    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ){
            return;
        }

        setState(open);
    };

    return (
        <MuiDrawer
            anchor={type}
            open={state}
            onClose={toggleDrawer(false)}
            PaperProps={{
                sx: {
                    width,px:1,
                    ...styles
                },
            }}
        >
            <Box sx={{ width: "100%" }} role="presentation">
                {children}
            </Box>
        </MuiDrawer>
    );
}
