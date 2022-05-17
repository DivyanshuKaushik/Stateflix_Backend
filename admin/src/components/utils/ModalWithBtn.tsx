import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};
interface Props {
    children: React.ReactElement;
    btnName: String;
}

export default function ModalWithBtn({ children, show, setShow }: any) {
    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            {/* <button className="" onClick={handleOpen}>
                {btnName}
            </button> */}
            <Modal
                // keepMounted
                open={show}
                onClose={handleClose}
            >
                <div className="flex justify-center items-center h-screen w-4/5 mx-auto">
                    <button className="bg-gray-400" onClick={handleClose}>
                        hrllo
                    </button>
                    {children}
                </div>
            </Modal>
        </>
    );
}
