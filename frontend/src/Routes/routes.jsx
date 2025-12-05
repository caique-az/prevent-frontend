import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Results from "../pages/Results";
import Footer from "../components/Footer";
import Project from "../pages/Project";
import Configurations from "../pages/Configurations";
import Historico from "../pages/Historico";
import NoResults from "../pages/NoResults";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/results/:city" element={<Results />} />
                <Route path="/projects" element={<Project />} />
                <Route path="/configurations" element={<Configurations />} />
                <Route path="/historico/:estado" element={<Historico />} />
                <Route path="/no-results" element={<NoResults />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
