import React, { useState, useEffect, useReducer, useContext } from "react";
import { createContext } from "vm";
import API from "../API";
import PostsT from "../components/PostsT";
import PostTable from "../components/PostTable";
import TabComponent, { TabPanel } from "../components/utils/TabComponent";
import { ChangeContext } from "../context/ChangeContext";

// interface PContext {
//     updated: boolean;
//     setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
// }

// export const AllPostContext = React.createContext<PContext>({
//     updated: false,
//     setUpdated: () => {},
// });

const AllPosts = () => {
    // current authenticated user
    const user = JSON.parse(String(localStorage.getItem("user")));
    // const [updated, setUpdated] = useState(false);

    const [value, setValue] = useState(0);

    const [unpublishedPosts, setUnpublishedPosts] = useState([]);
    const [publishedPosts, setPublishedPosts] = useState([]);

    const { updated, setUpdated } = useContext(ChangeContext);

    //  fetch all unpublished posts @access Editors,Admins
    async function fetchUnpublishedPosts() {
        try {
            const posts = (await API.get("/posts/unpublished")).data.data;
            console.log(posts);
            setUnpublishedPosts(posts);
        } catch (error) {
            console.log(error);
        }
    }
    //  fetch all published posts @access Editors,Admins
    async function fetchPublishedPosts() {
        try {
            const posts = (await API.get("/posts")).data.data;
            setPublishedPosts(posts);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchUnpublishedPosts();
        fetchPublishedPosts();
        console.log("updated", updated);
    }, [updated]);
    const labels = ["Unpublished", "Published"];
    return (
        // <AllPostContext.Provider value={{ updated, setUpdated }}>
        <div className="w-5/6 mx-auto">
            <h3 className="">Your Posts</h3>
            <TabComponent labels={labels} value={value} setValue={setValue}>
                {unpublishedPosts && publishedPosts && (
                    <>
                        <TabPanel value={value} index={0}>
                            <PostsT posts={unpublishedPosts} />
                            {/* <PostTable posts={unpublishedPosts} /> */}
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <PostsT posts={publishedPosts} />
                            {/* <PostTable posts={publishedPosts} /> */}
                        </TabPanel>
                    </>
                )}
            </TabComponent>
        </div>
        // </AllPostContext.Provider>
    );
};

export default AllPosts;
