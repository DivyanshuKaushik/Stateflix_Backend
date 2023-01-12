import { Button, Grid, Stack, TextField } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCategories } from "../../app/features/categorySlice";
import DefaultRow from "../../components/panel/table/DefaultRow";
import TableBase from "../../components/panel/table/TableBase";
import BaseCard from "../../components/panel/components/baseCard/BaseCard";
import ImageInput from "../../components/utils/ImageInput";
import API from "../../services/API";

const cat_columns = ["name", "hindiName", "image"];

const Categories = () => {
    const categories = useSelector(selectCategories);

    // add categories section
    const [addCategory, setAddCategory] = useState(false);

    const [categoryData, setCategoryData] = useState({
        name: "",
        image: "",
        hindiName: "",
    });

    const handleChange = (e) => {
        setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
    };

    const handleImage = (e) => {
        setCategoryData({ ...categoryData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", categoryData.name);
        formData.append("hindiName", categoryData.hindiName);
        formData.append("image", categoryData.image);
        const res = (
            await API.post("/categories", formData, {
                headers: { "Content-Type": "multipart/formdata" },
            })
        ).data;
        console.log(res);
        setCategoryData({ name: "", image: "", hindiName: "" });
        alert(res.message);
    };
    return (
        <Grid container spacing={0}>
            <Grid item xs={12} lg={12}>
                <div className="flex justify-end w-full pl-3">
                    <Button
                        variant="contained"
                        color={addCategory ? "error" : "primary"}
                        onClick={() => setAddCategory(!addCategory)}
                    >
                        {addCategory ? "Cancel" : "Add Category"}
                    </Button>
                </div>
            </Grid>
            {addCategory && (
                <Grid item xs={12} lg={12}>
                    <BaseCard title="Add Category">
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={3}>
                                <TextField
                                    label="Name"
                                    placeholder="Name of Category"
                                    variant="outlined"
                                    name="name"
                                    value={categoryData.name}
                                    onChange={handleChange}
                                />
                                <TextField
                                    label="Hindi Name"
                                    placeholder="Name of category in Hindi"
                                    variant="outlined"
                                    name="hindiName"
                                    value={categoryData.hindiName}
                                    onChange={handleChange}
                                />
                                {categoryData.image ? (
                                    <div className="">
                                        <img
                                            src={URL.createObjectURL(
                                                categoryData.image
                                            )}
                                            alt="image"
                                            width="100px"
                                            height="100px"
                                        />
                                        <button
                                            className=""
                                            onClick={() =>
                                                setCategoryData({
                                                    ...categoryData,
                                                    image: "",
                                                })
                                            }
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ) : (
                                    <ImageInput
                                        name="image"
                                        value={categoryData.image}
                                        onChange={handleImage}
                                    />
                                )}
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
            )}
            <Grid item xs={12} lg={12}>
                <TableBase
                    title="Categories"
                    columns={cat_columns}
                    rows={categories}
                >
                    <DefaultRow />
                </TableBase>
            </Grid>
        </Grid>
    );
};

export default Categories;
