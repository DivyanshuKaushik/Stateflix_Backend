import { Button, Grid, Stack, TextField } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DefaultRow from "../../components/panel/table/DefaultRow";
import TableBase from "../../components/panel/table/TableBase";
import BaseCard from "../../components/panel/components/baseCard/BaseCard";
import ImageInput from "../../components/utils/ImageInput";
import API from "../../services/API";
import SelectInput from "../../components/panel/SelectInput";
import { useDispatch, useSelector } from "react-redux";
import { setChange } from "../../app/features/changeSlice";

const ads_columns = ["name", "type", "image","actions"];

const adsType = [
    { _id: 0, name: "header" },
    { _id: 1, name: "footer" },
    { _id: 2, name: "banner" },
    { _id: 3, name: "aside" },
];

const Ads = () => {

    const dispatch = useDispatch();
    const ads_changes = useSelector((state)=>state.changes.ads);
    const [ads, setAds] = useState([]);

    // fetch ads
    useEffect(() => {
        async function fetchAds() {
            const res = (await API.get("/ads")).data;
            setAds(res.data);
        }
        fetchAds();
    }, [ads_changes]);

    // add ads section
    const [addAds, setAddAds] = useState(false);

    const [adsData, setAdsData] = useState({
        name: "",
        image: "",
        type: "",
    });

    const handleChange = (e) => {
        setAdsData({ ...adsData, [e.target.name]: e.target.value });
    };

    const handleImage = (e) => {
        setAdsData({ ...adsData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", adsData.name);
        formData.append("type", adsData.type);
        formData.append("image", adsData.image);
        const res = (
            await API.post("/ads", formData, {
                headers: { "Content-Type": "multipart/formdata" },
            })
        ).data;
        console.log(res);
        setAdsData({ name: "", image: "", type: "" });
        alert(res.message);
        dispatch(setChange("ads"))
        setAddAds(false)
    };
    return (
        <Grid container spacing={0}>
            <Grid item xs={12} lg={12}>
                <div className="flex justify-end w-full pl-3">
                    <Button
                        variant="contained"
                        color={addAds ? "error" : "primary"}
                        onClick={() => setAddAds(!addAds)}
                    >
                        {addAds ? "Cancel" : "Add New Ads"}
                    </Button>
                </div>
            </Grid>
            {addAds && (
                <Grid item xs={12} lg={12}>
                    <BaseCard title="Add ads">
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={3}>
                                <TextField
                                    label="Name"
                                    placeholder="Name of ads"
                                    variant="outlined"
                                    name="name"
                                    value={adsData.name}
                                    onChange={handleChange}
                                />
                                {/* select ads type  */}
                                <SelectInput
                                    name="type"
                                    selectValue="name"
                                    options={adsType}
                                    value={adsData.type}
                                    onChange={handleChange}
                                />
                                {adsData.image ? (
                                    <div className="">
                                        <img
                                            src={URL.createObjectURL(
                                                adsData.image
                                            )}
                                            alt="image"
                                            width="100px"
                                            height="100px"
                                        />
                                        <button
                                            className=""
                                            onClick={() =>
                                                setAdsData({
                                                    ...adsData,
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
                                        value={adsData.image}
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
                <TableBase title="Ads" columns={ads_columns} rows={ads}>
                    <DefaultRow />
                </TableBase>
            </Grid>
        </Grid>
    );
};

export default Ads;
