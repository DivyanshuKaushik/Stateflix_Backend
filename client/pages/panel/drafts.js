import React, { useEffect, useState } from "react";
import { Grid, Stack, Button } from "@mui/material";
import TableBase from "../../components/panel/table/TableBase";
import PostRow from "../../components/panel/table/PostRow";
import { useSelector } from "react-redux";
import { selectUser } from "../../app/features/authSlice";
import API from "../../services/API";

const post_columns = ["title", "category", "status", "actions"];

const PostDrafts = () => {
    const [loading, setLoading] = useState(false);
    const post_changes = useSelector((state) => state.changes.posts);
    // fetch posts
    const [unpublishedPosts, setUnpublishedPosts] = useState([]);
    const [posts, setPosts] = useState([]);

    async function fetchPosts() {
        try {
            // setLoading(true);
            const unpublished = (await API.get("/posts/unpublished")).data.data;
            setUnpublishedPosts(unpublished);
            const published = (await API.get("/posts")).data.data;
            setPosts(published);
            // setLoading(false);
        } catch (err) {
            console.log(err);
            // setLoading(false);
        }
    }
    useEffect(() => {
        fetchPosts();
    }, [post_changes]);

    // add post
    const user = useSelector(selectUser);
    const [active, setActive] = useState("unpublished");
    return (
        !loading && (
            <Grid container spacing={0}>
                <Grid item xs={12} lg={12}>
                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        sx={{ pl: 2 }}
                    >
                        <Button
                            variant={
                                active === "unpublished"
                                    ? "contained"
                                    : "outlined"
                            }
                            color="success"
                            onClick={() => setActive("unpublished")}
                        >
                            Unpublished
                        </Button>
                        <Button
                            variant={
                                active === "published"
                                    ? "contained"
                                    : "outlined"
                            }
                            color="success"
                            onClick={() => setActive("published")}
                        >
                            Published
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={12} lg={12}>
                    <TableBase
                        title={
                            active === "published"
                                ? "Published Posts"
                                : "Unpublished Posts"
                        }
                        columns={post_columns}
                        rows={
                            !loading && active === "published"
                                ? posts
                                : unpublishedPosts
                        }
                    >
                        <PostRow />
                    </TableBase>
                </Grid>
            </Grid>
        )
    );
};

export default PostDrafts;
