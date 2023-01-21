import { Chip, FormControl, IconButton, Stack, TextField, Typography } from "@mui/material";
import Head from "next/head";
import Basic from "../../components/layouts/Basic";
import MainWrapper from "../../components/layouts/MainWrapper";
import News from "../../components/News";
import API from "../../services/API";
import { HiSearch } from "react-icons/hi";
import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useRouter } from "next/router";

export default function Trending({ news, ads, tags }) {
    const router = useRouter()
    const [openSearch, setOpenSearch] = useState(false);
    const [search, setSearch] = useState("");

    function searchTrending (e){
      e.preventDefault()
      router.push(`/trending/search?tag=${search}`)
    }
    return (
        <>
            <Head>
                <title>Stateflix - Trending </title>
                <meta
                    name="description"
                    content="Trending news from Stateflix"
                />
            </Head>
            <Basic>
                <MainWrapper ads={ads}>
                    <Stack
                        spacing={2}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mx: { xs: 1, md: 0 }, my: 2 }}
                    >
                        <Typography
                            variant="h2"
                            mt={2}
                            color="text"
                            fontWeight={600}
                        >
                            Trending
                        </Typography>
                        <IconButton onClick={() => setOpenSearch(!openSearch)}>
                            {openSearch ? (
                                <MdOutlineClose size={24} />
                            ) : (
                                <HiSearch size={24} />
                            )}
                        </IconButton>
                    </Stack>
                    {/* input tag  */}
                    {openSearch && 
                      <form onSubmit={searchTrending}>
                        <TextField variant="standard" color="primary" placeholder="Search a Tag" fullWidth value={search} onChange={e=>setSearch(e.target.value)} />
                      </form>
                    }
                    {/* trending tags  */}
                    <Stack
                        spacing={2}
                        direction="row"
                        sx={{ mx: { xs: 1, md: 0 }, my: 2 }}
                        flexWrap="wrap"
                    >
                        {tags?.map(({ _id, tag }) => (
                            <Chip
                                key={_id}
                                sx={{
                                    pl: "4px",
                                    pr: "4px",
                                    backgroundColor: "primary.main",
                                    color: "#fff",
                                    fontWeight: 550,
                                }}
                                size="small"
                                label={`#${tag}`}
                            />
                        ))}
                    </Stack>
                    <News news={news} />
                </MainWrapper>
            </Basic>
        </>
    );
}

export async function getServerSideProps(context) {
    try {
        const news = (await API.get("/posts/trending")).data.data;
        const tags = (await API.get("/trending")).data.data;
        const ads = (await API.get("/ads")).data.data;
        return {
            props: {
                news,
                ads,
                tags,
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
