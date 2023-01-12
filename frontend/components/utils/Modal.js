import React from "react";
import { Modal as MuiModal, Box } from "@mui/material";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "80%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    overflowY:"scroll"
    // p: 4,
};

const Modal = ({ children, open, setOpen }) => {
    return (
        <MuiModal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>{children}</Box>
        </MuiModal>
    );
};

export default Modal;
