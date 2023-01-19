import React, { useEffect, useState } from "react";
import { Grid, Button, Stack, Skeleton } from "@mui/material";
import TableBase from "../../components/panel/table/TableBase";
import PostRow from "../../components/panel/table/PostRow";
import { useSelector } from "react-redux";
import { selectUser } from "../../app/features/authSlice";
import API from "../../services/API";
import PostForm from "../../components/panel/forms/PostForm";
import LoadingSkeleton from "../../components/layouts/LoadingSkeleton";
const post_columns = ["title", "category", "status", "actions"];

const Posts = () => {
    const user = useSelector(selectUser);
    const post_changes = useSelector((state) => state.changes.posts);
    // fetch posts
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchPosts() {
        try {
            setLoading(true);
            const data = (await API.get(`/posts/user/${user.id}`)).data.data;
            setPosts(data);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchPosts();
    }, [post_changes]);

    // add new post
    const [addPost, setAddPost] = useState(false);
    const [postData, setPostData] = useState({
        title: "",
        content: "",
        image: "",
        tags: [],
        category: "",
        publisher: "",
        source: "",
        user: user.id,
    });

    const createNewPost = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", postData.title);
        formData.append("content", postData.content);
        formData.append("image", postData.image);
        formData.append("tags", JSON.stringify(postData.tags));
        formData.append("category", postData.category);
        formData.append("publisher", postData.publisher);
        formData.append("source", postData.source);
        formData.append("user", postData.user);
        try {
            const data = await (
                await API.post("/posts", formData, {
                    headers: { "Content-Type": "multipart/formdata" },
                })
            ).data;
            alert(data.message);
            setAddPost(false);
            setPostData({
                title: "",
                content: "",
                image: "",
                tags: [],
                category: "",
                publisher: "",
                source: "",
                user: user.id,
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Grid container spacing={0}>
            {/* toggle add new post  */}
            <Grid item xs={12} lg={12}>
                <div className="flex justify-end w-full pl-3">
                    <Button
                        variant="contained"
                        color={addPost ? "error" : "primary"}
                        onClick={() => setAddPost(!addPost)}
                    >
                        {addPost ? "Cancel" : "Add Post"}
                    </Button>
                </div>
            </Grid>

            {/* create new post form */}
            {addPost && (
                <PostForm
                    postData={postData}
                    setPostData={setPostData}
                    handleSubmit={createNewPost}
                />
            )}
            {/* all user post display  */}
            <Grid item xs={12} lg={12}>
                <LoadingSkeleton loading={loading}>
                    <TableBase
                        title="Posts"
                        columns={post_columns}
                        rows={posts}
                    >
                        <PostRow />
                    </TableBase>
                </LoadingSkeleton>
            </Grid>
        </Grid>
    );
};

export default Posts;
