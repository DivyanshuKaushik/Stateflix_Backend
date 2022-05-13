import React,{useState,useEffect} from "react";
import API from "../API";
import PostTable from "../components/PostTable";
import TabComponent, { TabPanel } from "../components/utils/TabComponent";

const AllPosts = () => {
  // current authenticated user 
  const user = JSON.parse(String(localStorage.getItem("user")))

  const [value, setValue] = useState(0);

  const [unpublishedPosts,setUnpublishedPosts] = useState([])
  const [publishedPosts,setPublishedPosts] = useState([])

  //  fetch all unpublished posts @access Editors,Admins
  async function fetchUnpublishedPosts() {
      try {
          const posts = (await API.get("/posts/unpublished")).data.data;
          console.log(posts)
          setUnpublishedPosts(posts)
      } catch (error) {
          console.log(error);
      }
  }
   //  fetch all published posts @access Editors,Admins
   async function fetchPublishedPosts() {
      try {
          const posts = (await API.get("/posts")).data.data;
          setPublishedPosts(posts)
      } catch (error) {
          console.log(error);
      }
  }
  useEffect(() => {
      fetchUnpublishedPosts();
      fetchPublishedPosts();
  }, []);
  const labels = ["Unpublished","Published"]
  return (
          <div className="w-5/6 mx-auto">
              <h3 className="">Your Posts</h3>
              <TabComponent labels={labels} value={value} setValue={setValue}>

                  {(unpublishedPosts&&publishedPosts) && 
                  <>
                      <TabPanel value={value} index={0}>
                          <PostTable posts={unpublishedPosts} />
                      </TabPanel>
                      <TabPanel value={value} index={1}>
                      <PostTable posts={publishedPosts} />
                      </TabPanel>
                  </>
                  }
              </TabComponent>
             
          </div>
  );
};

export default AllPosts