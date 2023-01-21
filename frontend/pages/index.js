import Head from "next/head";
import Basic from "../components/layouts/Basic";
import News from "../components/News";
import API from "../services/API";
import MainWrapper from "../components/layouts/MainWrapper";
import { useSelector } from "react-redux";
import { selectVisitor } from "../app/features/authSlice";
import axios from "axios";

export default function Home({news,ads}) {
  // const visitor = useSelector(selectVisitor)
  // console.log("visitor",visitor);
  // const googleLogin = () => {
  //   window.open(
	// 		`${process.env.STATEFLIX_API_URI}/auth/google/callback`,
	// 		"_self"
	// 	);
  // }
    return (
        <>
          <Basic>
          {/* <button onClick={googleLogin}>google</button>
          {visitor && <div>{visitor.name}</div>} */}
          <MainWrapper ads={ads}>
              <News news={news} />
          </MainWrapper>
          </Basic>
        </>
    );
}

export async function getServerSideProps(context) {
  try {
    const news= (await API.get("/posts")).data.data;
    const ads = (await API.get("/ads")).data.data;
    return {
      props: {
        news,ads
      }
    }
    
  } catch (error) {
    console.log(error);
    return {
      props: {
        error: error.message,
      },
    }
  }
}
