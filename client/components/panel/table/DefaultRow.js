import { TableRow, TableCell, Stack, IconButton } from "@mui/material";
import React, { useContext,useState } from "react";
import FeatherIcon from "feather-icons-react";
import { TableContext } from "./TableBase";
import API from "../../../services/API";
import { useDispatch } from "react-redux";
import { setChange } from "../../../app/features/changeSlice";
import Image from "next/image";
import Modal from "../../utils/Modal";
import PollCard from "../../cards/PollCard";

const DefaultRow = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [poll, setPoll] = useState([]);

    const { columns, rows, page, rowsPerPage, title } =
        useContext(TableContext);

    const deleteHandler = async (id) => {
        try {
            const res = await API.delete(`/${title.toLowerCase()}/${id}`);
            alert(res.data.message);
            dispatch(setChange(title.toLowerCase()));
        } catch (error) {
            console.error("Something went wrong");
        }
    };
    return rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => {
            if (row === "actions") return;
            return (
                <>
                <Modal open={open} setOpen={setOpen}>
                    <PollCard poll={poll} options={false} />
                </Modal>
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column, i) => {
                        const value = row[column];
                        console.log(row);
                        if (column.toLowerCase() === "actions") {
                            return (
                                <TableCell key={i}>
                                    <Stack spacing={2} direction="row">
                                        {title.toLowerCase() === "polls" && (
                                            <IconButton
                                                aria-label="view"
                                                color="warning"
                                                onClick={() => {
                                                    setOpen(true);
                                                    setPoll(row);
                                                }}
                                            >
                                                <FeatherIcon
                                                    icon="eye"
                                                    width="20"
                                                    height="20"
                                                />
                                            </IconButton>
                                        )}
                                        <IconButton
                                            aria-label="delete"
                                            color="error"
                                            onClick={() =>
                                                deleteHandler(row._id)
                                            }
                                        >
                                            <FeatherIcon
                                                icon="trash"
                                                width="20"
                                                height="20"
                                            />
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                            );
                        }
                        if (column.toLowerCase() === "image") {
                            return (
                                <TableCell key={column}>
                                    <Image
                                        src={value}
                                        alt="Post"
                                        width={100}
                                        height={100}
                                    />
                                </TableCell>
                            );
                        }
                        return <TableCell key={column}>{value}</TableCell>;
                    })}
                </TableRow>
                </>
            );
        });
};

export default DefaultRow;
