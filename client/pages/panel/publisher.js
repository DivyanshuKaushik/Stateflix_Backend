import { Button, Grid, Stack, TextField } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DefaultRow from "../../components/panel/table/DefaultRow";
import TableBase from "../../components/panel/table/TableBase";
import BaseCard from "../../components/panel/components/baseCard/BaseCard";
import API from "../../services/API";
import { useDispatch, useSelector } from "react-redux";
import { setChange } from "../../app/features/changeSlice";

const publisher_columns = ["name","slug","actions"];

const Publisher = () => {
    const dispatch  = useDispatch()

    const publiser_change = useSelector(state=>state.changes.publisher)

    const [publisher, setPublisher] = useState([]);

    async function fetchPublisher() {
        try {
            const data = (await API.get("/publisher")).data.data;
            setPublisher(data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        fetchPublisher();
    }, [publiser_change]);

    // publisher form

    const [addPublisher, setAddPublisher] = useState(false);

    const [publisherData, setPublisherData] = useState({
        name: "",
        image: "",
    });

    const handleChange = (e) => {
        setPublisherData({ ...publisherData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!publisherData.name) {
            return alert("Please fill all the fields");
        }
        // console.log(publisherData);
        const res = (await API.post("/publisher", publisherData)).data;
        console.log(res);
        setPublisherData({ name: "", image: "" });
        alert(res.message);
        dispatch(setChange("publisher"))
    };
    return (
        <Grid container spacing={0}>
            <Grid item xs={12} lg={12}>
                <div className="flex justify-end w-full pl-3">
                    <Button
                        variant="contained"
                        color={addPublisher ? "error" : "primary"}
                        onClick={() => setAddPublisher(!addPublisher)}
                    >
                        {addPublisher ? "Cancel" : "Add Publisher"}
                    </Button>
                </div>
            </Grid>
            {/* add publisher form  */}
            {addPublisher && (
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <BaseCard title="Add Publisher">
                            <form onSubmit={handleSubmit}>
                                <Stack spacing={3}>
                                    <TextField
                                        label="Name"
                                        placeholder="Name of Publisher"
                                        variant="outlined"
                                        name="name"
                                        value={publisherData.name}
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
            {/* add publisher form - end */}
            <Grid item xs={12} lg={12}>
                <TableBase
                    title="Publisher"
                    columns={publisher_columns}
                    rows={publisher}
                >
                    <DefaultRow />
                </TableBase>
            </Grid>
        </Grid>
    );
};

export default Publisher;
