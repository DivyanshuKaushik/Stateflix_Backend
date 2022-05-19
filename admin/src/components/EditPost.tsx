import { FiEdit } from "react-icons/fi";
import Modal from "./utils/Modal";
import ModalWithBtn from "./utils/ModalWithBtn";
import { useContext, useEffect, useState } from "react";
import swal from "sweetalert";
import moment from "moment";
import Dropdown from "./utils/Dropdown";
import API from "../API";
import { ChangeContext } from "../context/ChangeContext";
interface Props {
    post: any;
}
const EditPost = ({ post }: Props) => {
    // const { title, summary, image, author, date,category } = post;
    const [showModal, setShowModal] = useState(false);

    const { updated, setUpdated } = useContext(ChangeContext);
    // current authenticated user
    const user = JSON.parse(String(localStorage.getItem("user")));

    const [categories, setCategories] = useState([]);

    // fetch all categories
    useEffect(() => {
        async function fetchCategories() {
            try {
                const categories = (await API.get("/category")).data.data;
                const categoriesArr = categories.map(({ name }: any) => name);
                setCategories(categoriesArr);
            } catch (error) {
                console.log(error);
            }
        }
        fetchCategories();
    }, []);
    // post state hook
    const [data, setData] = useState({
        ...post,
        date: moment().format("LLL"),
    });
    // temp variable to store image path and display
    const [imageDataURL, setImageDataURL] = useState(post.image);

    // function to handle change in input fields and save the data
    const handleChange = (e: any) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };
    // handle image file
    const handleImage = (e: any) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
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
    const updatePost = async (e: any) => {
        // prevent page refresh
        e.preventDefault();
        // formData to create post
        const postData = new FormData();
        // append data to postData
        postData.append("title", data.title);
        postData.append("summary", data.summary);
        postData.append("image", data.image);
        postData.append("category", data.category);
        postData.append("type", "none");
        postData.append("author", user.name);
        postData.append("id", post._id);
        postData.append("date", moment().format("LLL").toString());
        console.log(data);
        try {
            const res = (
                await API.put("/updatePost", postData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
            ).data;
            console.log(res);
            setUpdated(!updated);
            setShowModal(false);
            swal({
                title: "Posted!",
                text: "Updated post successfully!",
                icon: "success",
                // button: "Aww yiss!",
            });
        } catch (error: any) {
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
        <>
            <button className="" onClick={() => setShowModal(true)}>
                <FiEdit className="text-orange-600 text-lg" />
            </button>
            <ModalWithBtn show={showModal} setShow={setShowModal}>
                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-3 px-2 bg-white p-6 relative">
                    <div className="md:col-span-2 space-y-3">
                        <h1 className="text-2xl text-secondary font-bold">
                            {title}
                        </h1>
                        <p className="text-justify">{summary}</p>
                        <div className="flex justify-between">  
                            <h3 className="">{author}</h3>
                            <span className="">Posted {date}</span>
                        </div>
                    </div>
                    <img
                        src={image}
                        alt={title}
                        className="col-span-1 h-full w-full object-contain"
                    />
                </div> */}
                <div className="mx-auto border p-2 shadow-md rounded-md">
                    <form className="flex flex-col" onSubmit={updatePost}>
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
                        {categories && (
                            <div className="grid grid-cols-5 my-2">
                                <label htmlFor="category">Category</label>
                                <Dropdown
                                    name="category"
                                    className="focus:outline-none"
                                    items={categories}
                                    onChange={handleChange}
                                />
                            </div>
                        )}
                        {/* type  */}
                        {/* <div className="grid grid-cols-5 my-2">
                            <label htmlFor="type">Type</label>
                            <Dropdown
                                name="type"
                                className="focus:outline-none"
                                items={categories}
                                onChange={handleChange}
                                value={data.category}
                            />
                        </div> */}
                        {/* submit form  */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-4 py-1 bg-green-400 text-white rounded-sm"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </ModalWithBtn>

            {/* //   </ModalWithBtn> */}
        </>
    );
};

export default EditPost;
