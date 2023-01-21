import { Stack } from "@mui/material";
import React from "react";
import {
    FacebookIcon,
    FacebookShareButton,
    WhatsappShareButton,
    WhatsappIcon,
    TwitterShareButton,
    TwitterIcon
} from "next-share";

const Share = ({ news }) => {
    const slug = news && news.slug + "-" + news._id;
    const url = `https://stateflix.com/${news.category}/${slug}`
    return (
        <Stack spacing={2} direction="row">
            <WhatsappShareButton
                url={url}
                title={news.title}
                separator="::"
                blankTarget
                
            >
                <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <FacebookShareButton
                url={url}
                quote={news.title}
                blankTarget
                
            >
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton
                url={url}
                title={news.title}
                blankTarget 
                hashtags={news.tags}
                
            >
                <TwitterIcon size={32} round />
            </TwitterShareButton>
        </Stack>
    );
};

export default Share;
