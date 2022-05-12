import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Modal from "./utils/Modal";
import ViewPost from "./news/ViewPost";
import ModalWithBtn from "./utils/ModalWithBtn";

interface Column {
    id: "title" | "user" | "date";
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: "title", label: "Title", minWidth: 250 },
    { id: "user", label: "user", minWidth: 30 },
    {
        id: "date",
        label: "Date",
        minWidth: 30,
        align: "right",
        format: (value: number) => value.toLocaleString("en-US"),
    },
];

interface Data {
    title: string;
    user: string;
    date: number;
}


export default function PostTable({ posts }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell key="options" align="right"style={{minWidth:150}}>
                                Options
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posts && posts
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row) => {
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row._id}
                                    >
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                >
                                                    {column.format &&
                                                    typeof value === "number"
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell key='options'>
                                            <div className="flex justify-around">
                                                <ModalWithBtn btnName="view">
                                                    <ViewPost post={row} /> 
                                                </ModalWithBtn>
                                                {/* <Modal btnName="view" title="View Post">
                                                </Modal> */}
                                                <Modal btnName="edit" title="hello">
                                                    <button>edit</button>
                                                </Modal>
                                                <Modal btnName="delete" title="hello">
                                                    <button>delete</button>
                                                </Modal>
                                            </div>

                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={posts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
