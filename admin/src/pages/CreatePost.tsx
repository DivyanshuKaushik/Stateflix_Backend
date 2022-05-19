import axios from "axios";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import moment from 'moment'
import Dropdown from "../components/utils/Dropdown";
import API from "../API";
import { Private } from "../layout/Authenticate";

const CreatePost = () => {

    // current authenticated user 
    const user = JSON.parse(String(localStorage.getItem("user")))

    const [categories, setCategories] = useState([]);

    // fetch all categories 
    useEffect(()=>{
        async function fetchCategories() {
            try {
                const categories = (await API.get("/category")).data.data;
                const categoriesArr = categories.map(({name}:any)=>name)
                setCategories(categoriesArr)
            } catch (error) {
                console.log(error);
            }
        }
        fetchCategories();
    },[])
    // post state hook
    const [data, setData] = useState({
        title: "",
        summary: "",
        category: "",
        type: "none",
        image: "",
        date:moment().format('LLL')
    });
    // temp variable to store image path and display
    const [imageDataURL, setImageDataURL] = useState(null);

    // function to handle change in input fields and save the data
    const handleChange = (e:any) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };
    // handle image file
    const handleImage = (e:any) => {
        const reader = new FileReader();
        reader.onload = (e:any) => {
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
    const createPost = async (e:any) => {
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
        postData.append('author',user.name)
        postData.append('user',user._id)
        postData.append('date',(moment().format('LLL')).toString())
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
        } catch (error:any) {
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
            <Private>

                <main className="w-full">
                    <h3 className="text-center text-2xl text-secondary font-semibold opacity-95 my-2">
                        Create New Post
                    </h3>

                    {/* create new post  */}
                    <div className="w-4/5 md:w-2/3 lg:w-1/2 mx-auto border p-4 shadow-md rounded-md">
                        <form className="flex flex-col" onSubmit={createPost}>
                            {/* title  */}
                            <div className="grid grid-cols-5 my-2">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    placeholder="title"
                                    name="title"
                                    value={data.title}
                                    onChange={handleChange}
                                    className="col-span-4 bg-gray-100 px-2 py-1 rounded-md"
                                />
                            </div>
                            {/* summary  */}
                            <div className="grid grid-cols-5 my-2">
                                <label htmlFor="summary">Summary</label>
                                <textarea
                                    placeholder="article summary..."
                                    cols={30}
                                    rows={4}
                                    name="summary"
                                    value={data.summary}
                                    onChange={handleChange}
                                    className="col-span-4 bg-gray-100 px-2 py-1 rounded-md"
                                />
                            </div>
                            {/* image  */}
                            {data.image && imageDataURL ? (
                                <>
                                    {/* display image if selected  */}
                                    <div className="grid grid-cols-5">
                                        <span className="col-span-1">Image</span>
                                        <div className="relative h-64 col-span-4">
                                            <img
                                                src={imageDataURL}
                                                className="h-full w-full object-contain"
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* select image  */}
                                    <div className="grid grid-cols-5 my-2">
                                        <label htmlFor="image">Image</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImage}
                                            className="col-span-4 bg-gray-100 px-2 py-1 rounded-md"
                                        />
                                    </div>
                                </>
                            )}
                            {/* category  */}
                            {categories && 
                                <div className="grid grid-cols-5 my-2">
                                    <label htmlFor="category">Category</label>
                                    <Dropdown
                                        name="category"
                                        className="focus:outline-none"
                                        items={categories}
                                        onChange={handleChange}
                                    />
                                </div>
                            }
                            {/* type  */}
                            {/* <div className="grid grid-cols-5 my-2">
                                <label htmlFor="type">Type</label>
                                <Dropdown
                                    name="type"
                                    className="focus:outline-none"
                                    items={categories}
                                    onChange={handleChange}
                                />
                            </div> */}
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
            </Private>
    );
};

export default CreatePost;
