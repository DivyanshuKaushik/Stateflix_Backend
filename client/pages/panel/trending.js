import { Button, Chip, Grid, Stack, TextField } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCategories } from "../../app/features/categorySlice";
import DefaultRow from "../../components/panel/table/DefaultRow";
import TableBase from "../../components/panel/table/TableBase";
import BaseCard from "../../components/panel/components/baseCard/BaseCard";
import ImageInput from "../../components/utils/ImageInput";
import API from "../../services/API";
import { setChange } from "../../app/features/changeSlice";

const tag_columns = ["tag","actions"];

const Trending = () => {
    const dispatch = useDispatch();
    const tags_changes = useSelector((state) => state.changes.trending);
    // add categories section
    const [addTrendingTag, setAddTrendingTag] = useState(false);
    const [trending, setTrending] = useState([false]);

    const [tagData, setTagData] = useState([]);
    const [tag, setTag] = useState([]);

    useEffect(() => {
        async function fetchTrendingTags() {
            try {
                const res = (await API.get("/trending")).data;
                setTrending(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchTrendingTags();
    }, [tags_changes]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = (await API.post("/trending", { tags: tagData })).data;
            setTagData([]);
            alert(res.message);
            dispatch(setChange("trending"))
            setAddTrendingTag(false);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <Grid container spacing={0}>
            <Grid item xs={12} lg={12}>
                <div className="flex justify-end w-full pl-3">
                    <Button
                        variant="contained"
                        color={addTrendingTag ? "error" : "primary"}
                        onClick={() => setAddTrendingTag(!addTrendingTag)}
                    >
                        {addTrendingTag ? "Cancel" : "Add Tag"}
                    </Button>
                </div>
            </Grid>
            {addTrendingTag && (
                <Grid item xs={12} lg={12}>
                    <BaseCard title="Add Tag">
                        <Stack spacing={3}>
                            {/* tags display */}
                            <Stack spacing={2} direction="row">
                                {tagData?.map(({ tag }) => (
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
                                            setTagData(
                                                tagData.filter(
                                                    (item) => item.tag !== tag
                                                )
                                            )
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
                                        setTagData([
                                            ...tagData,
                                            { tag: tag.toLowerCase() },
                                        ]);
                                        setTag("");
                                    }
                                }}
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
                    </BaseCard>
                </Grid>
            )}
            <Grid item xs={12} lg={12}>
                <TableBase
                    title="Trending"
                    columns={tag_columns}
                    rows={trending}
                >
                    <DefaultRow />
                </TableBase>
            </Grid>
        </Grid>
    );
};

export default Trending;
