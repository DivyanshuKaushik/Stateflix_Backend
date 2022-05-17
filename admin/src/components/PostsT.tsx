import React from "react";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";
import PublishPost from "./PublishPost";
import ViewPost from "./ViewPost";
import { Editor } from "../layout/Authenticate";

const PostsT = ({ posts }: any) => {
    return (
        <>
            <div className="py-8 w-full">
                <div className="shadow overflow-hidden rounded border-b border-gray-200">
                    <table className="min-w-full bg-white">
                        <thead className="bg-purple-800 text-white">
                            <tr className="">
                                <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                                    Title
                                </th>
                                <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                                    Date
                                </th>
                                <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                                    Options
                                </th>
                                {/* <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th> */}
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {posts?.map((post: any, i: number) => (
                                <tr key={i} className="my-3 border-b odd:bg-white even:bg-slate-100">
                                    <td className="py-2 pl-3">{post.title}</td>
                                    <td className="py-2">{post.date}</td>
                                    <td className="py-2 flex justify-around items-center">
                                        <ViewPost post={post} />
                                        <EditPost post={post} />
                                        <Editor>
                                            <PublishPost
                                                status={post.status}
                                                id={post._id}
                                            />
                                            <DeletePost id={post._id} />

                                        </Editor>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </> 
    );
};

export default PostsT;
