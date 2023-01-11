import {
    Chip,
    FormControl,
    IconButton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import Head from "next/head";
import Basic from "../../components/layouts/Basic";
import MainWrapper from "../../components/layouts/MainWrapper";
import News from "../../components/News";
import API from "../../services/API";
import { HiArrowSmLeft } from "react-icons/hi";
import { useRouter } from "next/router";

export default function Trending({ news, ads, tag }) {
    const router = useRouter();
    const query = router.query;
    function goBack(e) {
        router.back();
    }
    return (
        <>
            <Head>
                <title>Stateflix - #{query.tag}</title>
                <meta
                    name="description"
                    content="Trending news from Stateflix"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Basic>
                <MainWrapper ads={ads}>
                    <Stack
                        spacing={2}
                        direction="row"
                        alignItems="center"
                        sx={{ mx: { xs: 1, md: 0 }, my: 2 }}
                    >
                        <IconButton onClick={goBack}>
                            <HiArrowSmLeft size={24} />
                        </IconButton>
                        <Chip
                            sx={{
                                pl: "4px",
                                pr: "4px",
                                backgroundColor: "primary.main",
                                color: "#fff",
                                fontWeight: 550,
                            }}
                            size="medium"
                            label={`#${tag}`}
                        />
                    </Stack>
                    <News news={news} />
                </MainWrapper>
            </Basic>
        </>
    );
}

export async function getServerSideProps(context) {
    try {
        const { tag } = context.query;
        const news = (await API.get(`/posts/tags?tags=${tag}`)).data.data;
        const ads = (await API.get("/ads")).data.data;
        return {
            props: {
                news,
                ads,
                tag,
            },
        };
    } catch (error) {
        console.log(error);
        return {
            props: {
                error: error.message,
            },
        };
    }
}
