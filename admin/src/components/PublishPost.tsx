import axios from "axios";
import React, { useContext, useState } from "react";
import API from "../API";
import { ChangeContext } from "../context/ChangeContext";
// import { PostContext } from "../context/PostContext";

interface Props {
    id: string;
    status: string;
}

const PublishPost = ({ id, status }: Props) => {
    const [postStatus, setPostStatus] = useState(
        status === "published" ? "unpublish" : "publish"
    );
    const { updated, setUpdated } = useContext(ChangeContext);
    // update post status
    const updateStatus = async () => {
        console.log(updated);
        console.log(postStatus, id, status);
        // const res = axios.patch({url:'http://localhost:4000api/v1//updatePostStatus',data:{id: id,status:postStatus}})
        const res = (
            await API.patch(
                `/updatePostStatus/${id}/${
                    status === "published" ? "unpublished" : "published"
                }`
            )
        ).data;
        console.log(res);
        setUpdated(!updated);
    };
    return (
        <button
            className="text-xs text-white font-semibold opacity-90 bg-purple-500 rounded capitalize px-2 py-1"
            onClick={updateStatus}
        >
            {postStatus}
        </button>
    );
};

export default PublishPost;
