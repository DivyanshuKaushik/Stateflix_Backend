import React from "react";
interface Props {
    children: React.ReactNode;
}

const PageLayout = ({ children }: Props) => {
    return <div className="px-10 md:px-20 lg:px-28">{children}</div>;
};

export default PageLayout;
