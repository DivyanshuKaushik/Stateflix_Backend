import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../app/features/authSlice";
import Ads from "../components/Ads";
import PollCard from "../components/cards/PollCard";
import Basic from "../components/layouts/Basic";
import MainWrapper from "../components/layouts/MainWrapper";
import API from "../services/API";
import { useEffect,useState } from "react";
const Polls = () => {
    const user = useSelector(selectUser);
    const polls_changes = useSelector(state=>state.changes.polls)
    const [polls, setPolls] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPolls = async () => {
            try {
                setLoading(true);
                const response = (await API.get("/polls")).data.data;
                setPolls(response);
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        };
        fetchPolls();
    }, [polls_changes]);

    return ( !loading &&
        <Basic>
            <MainWrapper>
                <div className="flex flex-col space-y-3">
                    {polls?.map((poll, index) => (
                        <div key={index}>
                            <PollCard key={poll._id} pollData={poll} />
                            {(index+1) % 3 === 0 && (
                                <div className="" key={index}>
                                    <h3 className="text-blue-500 text-center mb-2">
                                        Promoted Content
                                    </h3>
                                    <div className="flex justify-around">
                                        <Ads />
                                        <Ads />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </MainWrapper>
        </Basic>
    );
};

export default Polls;

// export async function getServerSideProps(context) {
//     try {
//         const polls = (await API.get(`/polls`)).data.data;

//         return {
//             props: {
//                 polls,
//             },
//         };
//     } catch (error) {
//         return {
//             props: {
//                 error: error.message,
//             },
//         };
//     }
// }
