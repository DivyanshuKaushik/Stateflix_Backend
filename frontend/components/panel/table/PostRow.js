import {
    TableRow,
    TableCell,
    Stack,
    IconButton,
    Chip,
    Button,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { TableContext } from "./TableBase";
import FeatherIcon from "feather-icons-react";
import Modal from "../../utils/Modal";
import NewsCard from "../../cards/NewsCard";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../app/features/authSlice";
import { useRouter } from "next/router";
import { setChange } from "../../../app/features/changeSlice";
import API from "../../../services/API";
import Drawer from "../../utils/Drawer";
import PostForm from "../forms/PostForm";
import Image from "next/image";

const PostRow = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = router.pathname.split("/").pop();
    const user = useSelector(selectUser);
    const { columns, rows, page, rowsPerPage, title } =
        useContext(TableContext);

    const [open, setOpen] = useState(false);

    const [edit, setEdit] = useState(false);

    const [postData, setPostData] = useState({
        title: "",
        slug:"",
        content: "",
        image: "",
        tags: [],
        category: "",
        publisher: "",
        source: "",
    });
    const deleteHandler = async (id) => {
        try {
            const res = await API.delete(`/posts/${id}`);
            alert(res.data.message);
            dispatch(setChange("posts"));
        } catch (error) {
            console.log(error);
            console.error("Something went wrong");
        }
    };
    const statusHandler = async (id, status) => {
        try {
            const res = (await API.patch("/posts/status", { id, status })).data;
            alert(res.message);
            dispatch(setChange("posts"));
        } catch (error) {
            alert("Something went wrong");
        }
    };

    const editPostHandler = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();
            // if(postData.image.name){
            // }
            formData.append("image", postData.image);
            formData.append("id", postData._id);
            formData.append("title", postData.title);
            formData.append("slug", postData.slug);
            formData.append("content", postData.content);
            formData.append("tags", JSON.stringify(postData.tags));
            formData.append("category", postData.category);
            formData.append("publisher", postData.publisher);
            formData.append("source", postData.source);
            const res = await (
                await API.put("/posts", formData, {
                    headers: { "Content-Type": "multipart/formdata" },
                })
            ).data;
            dispatch(setChange("posts"))
            alert(res.message);
            setEdit(false)
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Modal open={open} setOpen={setOpen}>
                <NewsCard news={postData} options={false} followBtn={false} />
            </Modal>
            <Drawer type="right" state={edit} setState={setEdit} width="55%">
                <PostForm
                    postData={postData}
                    setPostData={setPostData}
                    handleSubmit={editPostHandler}
                    edit
                />
            </Drawer>
            {rows &&
                rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                        return (
                            <>
                                <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row._id}
                                >
                                    {columns.map((column, i) => {
                                        const value = row[column.toLowerCase()];
                                        switch (column.toLowerCase()) {
                                            case "status":
                                                return (
                                                    <TableCell key={i}>
                                                        <Chip
                                                            sx={{
                                                                pl: "4px",
                                                                pr: "4px",
                                                                backgroundColor:
                                                                    value ===
                                                                    "published"
                                                                        ? "primary.main"
                                                                        : "secondary.main",
                                                                color: "#fff",
                                                                textTransform:
                                                                    "capitalize",
                                                                fontWeight: 550,
                                                            }}
                                                            size="small"
                                                            label={value}
                                                        />
                                                    </TableCell>
                                                );
                                            case "category":
                                                return (
                                                    <TableCell key={i}>
                                                        <Chip
                                                            sx={{
                                                                pl: "4px",
                                                                pr: "4px",
                                                                backgroundColor:
                                                                    "#ff8929",
                                                                color: "#fff",
                                                                textTransform:
                                                                    "capitalize",
                                                                fontWeight: 550,
                                                            }}
                                                            size="small"
                                                            label={value}
                                                        />
                                                    </TableCell>
                                                );
                                            case "image":
                                                return (
                                                    <TableCell key={column}><Image src={value} alt="Post" width={70} height={70}/></TableCell>
                                                );
                                            case "actions":
                                                return (
                                                    <TableCell key={i}>
                                                        <Stack
                                                            spacing={2}
                                                            direction="row"
                                                        >
                                                            <IconButton
                                                                aria-label="view"
                                                                color="warning"
                                                                onClick={() => {
                                                                    setOpen(
                                                                        true
                                                                    );
                                                                    setPostData(
                                                                        row
                                                                    );
                                                                }}
                                                            >
                                                                <FeatherIcon
                                                                    icon="eye"
                                                                    width="20"
                                                                    height="20"
                                                                />
                                                            </IconButton>
                                                            {row.status ==="unpublished" && 
                                                                <IconButton
                                                                    aria-label="edit"
                                                                    color="secondary"
                                                                    onClick={() => {
                                                                        console.log(
                                                                            "post",
                                                                            row
                                                                        );
                                                                        setEdit(
                                                                            !edit
                                                                        );
                                                                        setPostData(
                                                                            row
                                                                        );
                                                                    }}
                                                                >
                                                                    <FeatherIcon
                                                                        icon="edit"
                                                                        width="20"
                                                                        height="20"
                                                                    />
                                                                </IconButton>
                                                             }
                                                            {user?.role !== "reporter" && 
                                                                <IconButton
                                                                    aria-label="delete"
                                                                    color="error"
                                                                    onClick={() =>
                                                                        deleteHandler(
                                                                            row._id
                                                                        )
                                                                    }
                                                                >
                                                                    <FeatherIcon
                                                                        icon="trash"
                                                                        width="20"
                                                                        height="20"
                                                                    />
                                                                </IconButton>
                                                            }
                                                            {user?.role ===
                                                                "admin" &&
                                                                pathname ===
                                                                    "drafts" && (
                                                                    <Button
                                                                        variant="contained"
                                                                        color={
                                                                            row.status ===
                                                                            "published"
                                                                                ? "secondary"
                                                                                : "success"
                                                                        }
                                                                        size="small"
                                                                        onClick={() =>
                                                                            statusHandler(
                                                                                row._id,
                                                                                row.status ===
                                                                                    "published"
                                                                                    ? "unpublished"
                                                                                    : "published"
                                                                            )
                                                                        }
                                                                    >
                                                                        {row.status ===
                                                                        "published"
                                                                            ? "Unpublish"
                                                                            : "Publish"}
                                                                    </Button>
                                                                )}
                                                        </Stack>
                                                    </TableCell>
                                                );
                                            default:
                                                return (
                                                    <TableCell key={column}>
                                                        {value}
                                                    </TableCell>
                                                );
                                        }
                                    })}
                                </TableRow>
                            </>
                        );
                    })}
        </>
    );
};

export default PostRow;
