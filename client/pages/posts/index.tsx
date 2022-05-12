import * as React from "react";
import PrivatePage from "../../components/layout/PrivatePage";
import { useAppSelector } from "../../app/store";
import API from "../../service/API";
import PostTable from "../../components/PostTable";
import TabComponent, { TabPanel } from "../../components/utils/TabComponent";

const Posts = () => {
    // current authenticated user 
    const user = useAppSelector(state=>state.user.user)

    const [value, setValue] = React.useState(0);

    const [userPosts,setUserPosts] = React.useState({unpublished:[],published:[],rejected:[]})

    //  fetch user posts 
    async function fetchUserPosts() {
        try {
                console.log(user,"rduc")
                const posts = (await API.get(`/posts/user/${user._id}`)).data.data;
                console.log(posts)
                // setUserPosts(posts)
        } catch (error) {
            console.log(error);
        }
    }
    React.useEffect(() => {
        fetchUserPosts();
    }, [user]);
    const labels = ["Unpublished","Published","Rejected"]
    return (
        <PrivatePage>
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
        </PrivatePage>
    );
};

export default Posts;
