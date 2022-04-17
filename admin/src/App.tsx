import { Routes, Route } from "react-router-dom";
import Header from "./layout/Header";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import NewsByCategory from "./pages/NewsByCategory";
import NewsDetail from "./pages/NewsDetail";
function App() {
    return (
        <>
            <Navbar />
            {/* <Header /> */}
            <Routes>
                {/* home page  */}
                <Route path="/" element={<Home />} />
                {/* news routes  */}
                <Route path=":category" element={<NewsByCategory />} />
                <Route path=":category/:id" element={<NewsDetail />} />

            </Routes>
        </>
    );
}
export default App;
