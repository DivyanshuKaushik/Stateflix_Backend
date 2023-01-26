import Script from "next/script";
import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";
import { store } from "../app/store";
import "../styles/globals.css";
import "../styles/style.css";
import Router from "next/router";
import { useState, useEffect } from "react";
import { CacheProvider } from "@emotion/react";
import PropTypes from "prop-types";
import createEmotionCache from "../components/panel/createEmotionCache";
import MuiThemeProvider from "../components/panel/theme/MuiThemeProvider";
import FullLayout from "../components/panel/layouts/FullLayout";
import AuthProvider from "../components/layouts/auth/AuthProvider";
import InitialStateProvider from "../components/InitialStateProvider";
import Head from "next/head";
import VisitorProvider from "../components/layouts/auth/VisitorProvider";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

MyApp.getInitialProps = async (ctx) => {

}

function MyApp({
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    router,
}) {
    // const router = useRouter();
    const [loading, setLoading] = useState(false);
    Router.events.on("routeChangeStart", () => {
        setLoading(true);
    });
    Router.events.on("routeChangeComplete", () => {
        setLoading(false);
    });
    Router.events.on("routeChangeError", () => {
        setLoading(false);
    });

    const getLayout =
        router.pathname.includes("/panel") &&
        ((page) => (
            <AuthProvider>
                <FullLayout>{page}</FullLayout>
            </AuthProvider>
        ));
    // console.log(api_config,process.env.NODE_ENV)
    return (
        <Provider store={store}>
            <CacheProvider value={emotionCache}>
                <Head>
                    <title>STATELFIX</title>
                    <meta name="viewport" content="initial-scale=1, width=device-width" />
                    <meta name="viewport" content="user-scalable=no" />
                    <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                    />
                    <meta
                        name="description"
                        content="Stateflix is a news aggregator that provides you with the latest news from all over the world."
                    />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Script
                    strategy="afterInteractive"
                    src="https://www.googletagmanager.com/gtag/js?id=G-4MNHXVCDK1"
                />
                <Script
                    id="google-analytics"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', 'G-4MNHXVCDK1', {
                                page_path: window.location.pathname,
                            });
                        `,
                    }}
                />
                <MuiThemeProvider>
                    <ThemeProvider attribute="class">
                        {loading && (
                            <div className="fixed top-0 left-0 w-full h-full bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-50 z-50 flex justify-center items-center">
                                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
                            </div>
                        )}
                        <InitialStateProvider>
                            {getLayout ? (
                                getLayout(<Component {...pageProps} />)
                            ) : (
                                <VisitorProvider>
                                    <Component {...pageProps} />
                                </VisitorProvider>
                            )}
                        </InitialStateProvider>
                    </ThemeProvider>
                </MuiThemeProvider>
            </CacheProvider>
        </Provider>
    );
}
// MyApp.propTypes = {
//     Component: PropTypes.elementType.isRequired,
//     emotionCache: PropTypes.object,
//     pageProps: PropTypes.object.isRequired,
//     router: PropTypes.object.isRequired,
// };

export default MyApp;
