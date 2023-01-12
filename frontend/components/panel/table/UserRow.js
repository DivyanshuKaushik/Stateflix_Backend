import { TableRow,TableCell } from "@mui/material";
import React, { useContext } from "react";
import { TableContext } from "./TableBase";

const UserRow = () => {
    const { columns, rows, page, rowsPerPage } = useContext(TableContext);
    return rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => {
            if (row==="actions") return;
            return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                        const value = row[column];
                        return <TableCell key={column}>{value}</TableCell>;
                    })}
                </TableRow>
            );
        });
};

export default UserRow;
