import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import swal from "sweetalert";
import Dropdown from "../../components/utils/Dropdown";
import API from "../../service/API";
import Cookies from 'js-cookie'
import PrivatePage from "../../components/layout/PrivatePage";
import { useAppSelector } from "../../app/store";

const CreatePost = () => {

    // current authenticated user 
    const user = useAppSelector(state=>state.user.user)
    const categoryList = [
        "sports",
        "bussiness",
        "sational",
        "state",
        "local",
        "media",
        "bollywood",
        "tech",
    ];
    // post state hook
    const [data, setData] = useState({
        title: "",
        summary: "",
        category: "",
        type: "",
        image: null,
    });

    // temp variable to store image path and display
    const [imageDataURL, setImageDataURL] = useState(null);

    // function to handle change in input fields and save the data
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };
    // handle image file
    const handleImage = (e) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            // console.log(e.target.result);
            setImageDataURL(e.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
        setData({
            ...data,
            image: e.target.files[0],
        });
    };

    // create post on form submit
    const createPost = async (e) => {
        // prevent page refresh
        e.preventDefault();
        // formData to create post
        const postData = new FormData();
        // append data to postData
        postData.append("title", data.title);
        postData.append("summary", data.summary);
        postData.append("image", data.image);
        postData.append("category", data.category);
        postData.append('type',data.type)
        postData.append('author',data.type)
        postData.append('user',user._id)
        postData.append('date','date')
        console.log(data);
        try {
            const res = (await API.post("/createPost", postData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })).data;
            console.log(res)
            swal({
                title: "Posted!",
                text: "Created post successfully!",
                icon: "success",
                // button: "Aww yiss!",
            });
        } catch (error) {
            console.log(error.response.data);
            swal({
                title: "Error!",
                text: "error occured",
                icon: "error",
                // button: "Aww yiss!",
            });
        }
    };
    return (
        <PrivatePage>

            <main className="w-full">
                <h3 className="text-center text-2xl text-secondary font-semibold opacity-95 my-2">
                    Create New Post
                </h3>

                {/* create new post  */}
                <div className="w-4/5 md:w-2/3 lg:w-1/2 mx-auto border p-4 shadow-md rounded-md">
                    <form className="flex flex-col" onSubmit={createPost}>
                        {/* title  */}
                        <div className="post_input_div">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                placeholder="title"
                                name="title"
                                value={data.title}
                                onChange={handleChange}
                            />
                        </div>
                        {/* summary  */}
                        <div className="post_input_div">
                            <label htmlFor="summary">Summary</label>
                            <textarea
                                placeholder="article summary..."
                                cols={30}
                                rows={4}
                                name="summary"
                                value={data.summary}
                                onChange={handleChange}
                                className="bg-gray-100"
                            />
                        </div>
                        {/* image  */}
                        {data.image && imageDataURL ? (
                            <>
                                {/* display image if selected  */}
                                <div className="grid grid-cols-5">
                                    <span className="col-span-1">Image</span>
                                    <div className="relative h-64 col-span-4">
                                        <Image
                                            src={imageDataURL}
                                            layout="fill"
                                            className="h-full w-full object-contain"
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* select image  */}
                                <div className="post_input_div">
                                    <label htmlFor="image">Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImage}
                                    />
                                </div>
                            </>
                        )}
                        {/* category  */}
                        <div className="post_input_div">
                            <label htmlFor="category">Category</label>
                            <Dropdown
                                name="category"
                                className="focus:outline-none"
                                items={categoryList}
                                onChange={handleChange}
                            />
                        </div>
                        {/* type  */}
                        <div className="post_input_div">
                            <label htmlFor="type">Type</label>
                            <Dropdown
                                name="type"
                                className="focus:outline-none"
                                items={categoryList}
                                onChange={handleChange}
                            />
                        </div>
                        {/* submit form  */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-4 py-1 bg-green-400 text-white rounded-sm"
                            >
                                Post
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </PrivatePage>
    );
};

export default CreatePost;
