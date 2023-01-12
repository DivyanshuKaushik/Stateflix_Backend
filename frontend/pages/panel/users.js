import { Button, Grid, Stack, TextField } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BaseCard from "../../components/panel/components/baseCard/BaseCard";
import SelectInput from "../../components/panel/SelectInput";
import DefaultRow from "../../components/panel/table/DefaultRow";
import TableBase from "../../components/panel/table/TableBase";
import UserRow from "../../components/panel/table/UserRow";
import API from "../../services/API";

const user_columns = ["name", "email", "phone", "role", "actions"];
const userFormFields = [
    "name",
    "email",
    "phone",
    "password",
    "confirm_password",
];
const roles = [
    { _id: 0, name: "admin" },
    { _id: 1, name: "editor" },
    { _id: 2, name: "reporter" },
];
const Users = () => {
    const [users, setUsers] = useState([]);

    async function fetchUsers() {
        try {
            const data = (await API.get("/users")).data.data;
            setUsers(data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchUsers();
    }, []);

    // add users
    const [addUser, setAddUser] = useState(false);

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phone: "",
        role: "",
        password: "",
        confirm_password: "",
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!(userData.name && userData.email && userData.phone && userData.role && userData.password && userData.confirm_password)) {
                return alert("Please fill all the fields");
            }
            if (userData.password !== userData.confirm_password) {
                return alert("Password and confirm password must be same");
            }
            const res = (await API.post("/auth/register", userData)).data;
            alert(res.message);
            setUserData({
                name: "",
                email: "",
                phone: "",
                role: "",
                password: "",
                cpassword: "",
            });
            setAddUser(false);
        } catch (err) {
            console.log(err);
            alert(err.response.data.message)
        }
    };

    return (
        <Grid container spacing={0}>
            <Grid item xs={12} lg={12}>
                <div className="flex justify-end w-full pl-3">
                    <Button
                        variant="contained"
                        color={addUser ? "error" : "primary"}
                        onClick={() => setAddUser(!addUser)}
                    >
                        {addUser ? "Cancel" : "Add User"}
                    </Button>
                </div>
            </Grid>
            {/* add user form  */}
            {addUser && (
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <BaseCard title="Add User">
                            <form onSubmit={handleSubmit}>
                                <Stack spacing={3}>
                                    {userFormFields.map((field) => (
                                        <TextField
                                            key={field}
                                            label={field.toUpperCase()}
                                            placeholder={field}
                                            variant="outlined"
                                            name={field}
                                            value={userData[field]}
                                            onChange={handleChange}
                                            type={field === "password" || field === "confirm_password" ? "password" : "text"}
                                        />
                                    ))}
                                    <SelectInput
                                        name="role"
                                        selectValue="name"
                                        options={roles}
                                        value={userData.role}
                                        onChange={handleChange}
                                    />
                                </Stack>
                                <br />
                                <Button
                                    variant="contained"
                                    mt={2}
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </Button>
                            </form>
                        </BaseCard>
                    </Grid>
                </Grid>
            )}
            <Grid item xs={12} lg={12}>
                <TableBase title="Users" columns={user_columns} rows={users}>
                    <DefaultRow />
                </TableBase>
            </Grid>
        </Grid>
    );
};

export default Users;
