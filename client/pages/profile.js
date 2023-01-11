import axios from 'axios'
import Image from 'next/image'
import React from 'react'
import { MdVerified } from 'react-icons/md'
import Basic from '../components/layouts/Basic'
import MainWrapper from '../components/layouts/MainWrapper'
import News from '../components/News'

const Profile = ({news}) => {
  return (
    <Basic>
       <MainWrapper>
        <div className="">
        <div className="relative h-7 w-7 lg:h-10 lg:w-10 bg-blue-100 rounded-full">
                        <Image
                            src="/ICON.png"
                            layout="fill"
                            className="object-contain rounded-full"
                        />
                    </div>
                    <div className="">
                        <div className="flex items-center space-x-1.5">
                            <h1 className="font-semibold text-sm">
                                Stateflix Desk{" "}
                            </h1>
                            <MdVerified className="text-blue-500 text-lg" />
                        </div>
                    </div>
        </div>
        <News news={news} />
       </MainWrapper>
    </Basic>
  )
}

export default Profile

export async function getServerSideProps(context) {
    try {
      const news = (await axios.get("https://inshorts.deta.dev/news?category=all")).data.data;
      // const news = (await API.get("/posts?per_page=10")).data;
    //   console.log(news);
      return {
        props: {
          news,
        },
      }
      
    } catch (error) {
      return {
        props: {
          error: error.message,
        },
      }
    }
}
  