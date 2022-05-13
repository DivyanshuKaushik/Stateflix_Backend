import axios from "axios";
import React,{useState,useEffect} from "react";
// import PrivatePage from "../../components/layout/PrivatePage";
// import { useAppSelector } from "../../app/store";
import API from "../API";
import PostTable from "../components/PostTable";
import TabComponent, { TabPanel } from "../components/utils/TabComponent";

const Posts = () => {
    // current authenticated user 
    const user = JSON.parse(String(localStorage.getItem("user")))
    let token = JSON.parse(localStorage.getItem('accessToken')as string)

    const [value, setValue] = useState(0);

    const [userPosts,setUserPosts] = useState({unpublished:[],published:[],rejected:[]})

    //  fetch user posts 
    async function fetchUserPosts() {
        try {

                console.log(user,"rduc")
                console.log('token',token)
                const posts = (await API.get(`/posts/user/${user._id}`)).data.data;
                // const posts = (await axios.get('http://localhost:4000/api/v1/posts/user/'+user._id,{headers:{
                //     'Authorization':token
                // }})).data.data
                console.log(posts)
                setUserPosts(posts)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchUserPosts();
    }, []);
    const labels = ["Unpublished","Published","Rejected"]
    return (
        // <PrivatePage>
            <div className="w-5/6 mx-auto">
                <h3 className="">Your Posts</h3>
                    {userPosts.unpublished&& 
                <TabComponent labels={labels} value={value} setValue={setValue}>

                    <>
                        <TabPanel value={value} index={0}>
                            <PostTable posts={userPosts.unpublished} />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                        <PostTable posts={userPosts.published} />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <PostTable posts={userPosts.rejected} />
                        </TabPanel>
                    </>
                </TabComponent>
                    }
               
            </div>
        // </PrivatePage>
    );
};

export default Posts;
