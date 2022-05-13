import axios from "axios";
import React from "react";
import PublicPage from "../components/layout/PublicPage";
import AllNews from "../components/news/AllNews";
import { API_URL } from "../config";

const MainPage = ({posts}) => {
    return (

        <PublicPage>
            {/* breaking news  */}

            {/* custom ads slider  */}

            {/* show all news  */}
            <AllNews allPosts={posts}/>
            {/* promotion  */}
        </PublicPage>
    );
};

export default MainPage;

export async function getServerSideProps() {
    const posts = (await axios.get(API_URL+'/allPosts')).data.data
    return {
        props:{
            posts
        }
    }
}
