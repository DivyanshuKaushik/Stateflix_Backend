import React from "react";
import Header from "./Header";
interface Props {
    children: React.ReactNode;
}

const PublicPage = ({ children }: Props) => {
    return (
        <>
            {/* <Header /> */}
            <div className="px-10 md:px-20 lg:px-28">{children}</div>;
        </>
    );
};

export default PublicPage;
