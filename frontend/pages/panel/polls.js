import { Button, Stack, TextField, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import DefaultRow from "../../components/panel/table/DefaultRow";
import TableBase from "../../components/panel/table/TableBase";
import BaseCard from "../../components/panel/components/baseCard/BaseCard";
import SelectInput from "../../components/panel/SelectInput";
import API from "../../services/API";
import { useDispatch, useSelector } from "react-redux";
import { setChange } from "../../app/features/changeSlice";
import Image from "next/image";
import ImageInput from "../../components/utils/ImageInput";

const poll_columns = ["title","actions"];

const Polls = () => {
    const dispatch = useDispatch();
    const polls_changes = useSelector((state) => state.changes.polls);

    // fetch polls and publisher
    const [polls, setPolls] = useState([]);
    const [publisher, setPublisher] = useState([]);

    async function fetchPolls() {
        try {
            const data = (await API.get("/polls")).data.data;
            setPolls(data);
        } catch (err) {
            console.log(err);
        }
    }
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
    }, []);

    useEffect(() => {
        fetchPolls();
    }, [polls_changes]);

    // add new poll
    const [addPoll, setAddPoll] = useState(false);

    const [pollData, setPollData] = useState({
        title: "",
        options: [{ name: "", image: "" }],
        expiryInDays: 1,
        publisher: "",
    });
    const handleAddOption = (e) => {
        e.preventDefault();
        setPollData({
            ...pollData,
            options: [...pollData.options, { name: "", image: "" }],
        });
    };

    const removeOption = (index) => {
        const options = [...pollData.options];
        options.splice(index, 1);
        setPollData({ ...pollData, options });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPollData({ ...pollData, [name]: value });
    };

    const handleOptionChange = (e, index) => {
        const { name, value } = e.target;
        const options = [...pollData.options];
        options[index][name] = value;
        setPollData({ ...pollData, options });
    };
    const handleImageChange = (e, index) => {
        const { name, files } = e.target;
        const options = [...pollData.options];
        options[index][name] = files[0];
        setPollData({ ...pollData, options });
    };

    const handleSubmit = async (e) => {
        if (
            !(pollData.title && pollData.options.length && pollData.publisher)
        ) {
            return alert("Please fill all the fields");
        }
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", pollData.title);
        formData.append("expiryInDays", pollData.expiryInDays);
        formData.append("publisher", pollData.publisher);
        formData.append("optionsCount", pollData.options.length);
        pollData.options.forEach((option, index) => {
            formData.append(`options-${index}-name`, option.name);
            formData.append(`options-${index}-image`, option.image);
        });

        const res = (await API.post("/polls", formData,{headers:{
            'Content-Type': 'multipart/form-data'
        }})).data;
        dispatch(setChange("polls"))
        alert(res.message);
        // setAddPoll(false);
        // dispatch(setChange("polls"));
    };

    return (
        <Grid container spacing={0}>
            <Grid item xs={12} lg={12}>
                <div className="flex justify-end w-full pl-3">
                    <Button
                        variant="contained"
                        color={addPoll ? "error" : "primary"}
                        onClick={() => setAddPoll(!addPoll)}
                    >
                        {addPoll ? "Cancel" : "Add Poll"}
                    </Button>
                </div>
            </Grid>
            {addPoll && (
                <Grid item xs={12} lg={12}>
                    <BaseCard title="Add New Poll">
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={3}>
                                <TextField
                                    label="Title"
                                    variant="outlined"
                                    placeholder="Title of post"
                                    value={pollData.title}
                                    name="title"
                                    onChange={handleChange}
                                />
                                {/* option  */}
                                {pollData.options.map((option, index) => (
                                    <Stack key={index} direction="row" spacing={2}>
                                        <TextField
                                            key={index}
                                            sx={{width:"50%"}}
                                            label="Option"
                                            variant="outlined"
                                            placeholder="option"
                                            value={option.name}
                                            name="name"
                                            onChange={(e) =>
                                                handleOptionChange(e, index)
                                            }
                                        />
                                        {option.image ? (
                                            <div className="">
                                                {!option.image.name ? (
                                                    <Image
                                                        src={option.image}
                                                        height={100}
                                                        width={100}
                                                        alt="image"
                                                    />
                                                ) : (
                                                    <Image
                                                        src={URL.createObjectURL(
                                                            option.image
                                                        )}
                                                        alt="image"
                                                        width={100}
                                                        height={100}
                                                    />
                                                )}
                                                <button className="" onClick={()=>{
                                                    setPollData({
                                                        ...pollData,
                                                        options: [...pollData.options,pollData.options[index].image = ""]
                                                    })
                                                }}>
                                                    Remove
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex space-x-3">
                                                {/* image input */}
                                                <span className="">
                                                    Upload Image
                                                </span>
                                                <ImageInput
                                                    name="image"
                                                    value={option.image}
                                                    onChange={(e) =>
                                                        handleImageChange(
                                                            e,
                                                            index
                                                        )
                                                    }
                                                />
                                            </div>
                                        )}

                                        {index !== 0 && (
                                            <button
                                                className=""
                                                onClick={() =>
                                                    removeOption(index)
                                                }
                                            >
                                                Remove Option
                                            </button>
                                        )}
                                    </Stack>
                                ))}
                                <Button
                                    className="w-1/4"
                                    variant="contained"
                                    mt={2}
                                    onClick={handleAddOption}
                                >
                                    Add Option
                                </Button>
                                <TextField
                                    label="Expiry in Days"
                                    variant="outlined"
                                    placeholder="Title of post"
                                    value={pollData.expiryInDays}
                                    name="expiryInDays"
                                    onChange={handleChange}
                                />
                                <SelectInput
                                    name="publisher"
                                    selectValue="_id"
                                    options={publisher}
                                    value={pollData.publisher}
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
            )}
            <Grid item xs={12} lg={12}>
                <TableBase title="Polls" columns={poll_columns} rows={polls}>
                    <DefaultRow />
                </TableBase>
            </Grid>
        </Grid>
    );
};

export default Polls;
