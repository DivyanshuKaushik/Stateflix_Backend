import React, { useState } from "react";
import { Grid, Stack, TextField, Button, Chip } from "@mui/material";
import BaseCard from "../components/baseCard/BaseCard";
import ImageInput from "../../utils/ImageInput";
import SelectInput from "../SelectInput";
import { useSelector } from "react-redux";
import { selectCategories } from "../../../app/features/categorySlice";
import { selectPublisher } from "../../../app/features/publisherSlice";
import Image from "next/image";

const PostForm = ({ postData, setPostData, handleSubmit, edit = false }) => {
    // data form redux store to select input
    const categories = useSelector(selectCategories);
    const publisher = useSelector(selectPublisher);

    const [tag, setTag] = useState("");

    const handleChange = (e) => {
        setPostData({ ...postData, [e.target.name]: e.target.value });
    };

    const handleImage = (e) => {
        setPostData({ ...postData, image: e.target.files[0] });
    };
    return (
        <Grid item xs={12} lg={12}>
            <BaseCard title={edit ? "Edit Post" : "Create New Post"}>
                <Stack spacing={3}>
                    {/* title  */}
                    <TextField
                        label="Title"
                        variant="outlined"
                        placeholder="Title of post"
                        name="title"
                        value={postData.title}
                        onChange={handleChange}
                    />
                    {/* content  */}
                    <TextField
                        label="Content"
                        multiline
                        rows={6}
                        placeholder="Content of post"
                        variant="outlined"
                        name="content"
                        value={postData.content}
                        onChange={handleChange}
                    />
                    {/* post source  */}
                    <TextField
                        label="Source"
                        placeholder="Source of post"
                        variant="outlined"
                        name="source"
                        value={postData.source}
                        onChange={handleChange}
                    />
                    {/* image selection */}
                    {postData.image ? (
                        <div className="">
                            {edit && !postData.image.name ? (
                                <Image
                                    src={postData.image}
                                    height={100}
                                    width={100}
                                    alt="image"
                                />
                            ) : (
                                <Image
                                    src={URL.createObjectURL(postData.image)}
                                    alt="image"
                                    width={100}
                                    height={100}
                                />
                            )}
                            <button
                                className=""
                                onClick={() =>
                                    setPostData({
                                        ...postData,
                                        image: "",
                                    })
                                }
                            >
                                Remove
                            </button>
                        </div>
                    ) : (
                        <div className="flex space-x-3">
                            {/* image input */}
                            <span className="">Upload Image</span>
                            <ImageInput
                                name="image"
                                value={postData.image}
                                onChange={handleImage}
                            />
                        </div>
                    )}
                    {/* tags display */}
                    <Stack spacing={2} direction="row">
                        {postData.tags?.map((tag) => (
                            <Chip
                            key={tag}
                                sx={{
                                    pl: "4px",
                                    pr: "4px",
                                    backgroundColor: "secondary.main",
                                    color: "#fff",
                                    fontWeight: 550,
                                }}
                                size="small"
                                label={`#${tag}`}
                                onDelete={() =>
                                    setPostData({
                                        ...postData,
                                        tags: postData.tags.filter(
                                            (t) => t !== tag
                                        ),
                                    })
                                }
                            />
                        ))}
                    </Stack>
                    {/* tags input  */}
                    <TextField
                        label="Tags"
                        variant="outlined"
                        placeholder="Add a Tag"
                        name="tags"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                setPostData({
                                    ...postData,
                                    tags: [...postData.tags, tag.toLowerCase()],
                                });
                                setTag("");
                            }
                        }}
                    />
                    {/* category  */}
                    <SelectInput
                        name="category"
                        selectValue="name"
                        options={categories}
                        value={postData.category}
                        onChange={handleChange}
                    />
                    {/* select pubisher  */}
                    <SelectInput
                        name="publisher"
                        selectValue="slug"
                        options={publisher}
                        value={postData.publisher}
                        onChange={handleChange}
                    />
                </Stack>
                <br />
                {/* submit btn  */}
                <Button variant="contained" mt={2} onClick={handleSubmit}>
                    Submit
                </Button>
            </BaseCard>
        </Grid>
    );
};

export default PostForm;
