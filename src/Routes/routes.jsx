import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Results from "../pages/Results";
import Footer from "../components/Footer";
import Project from "../pages/Project";
import Configurations from "../pages/Configurations";
import Historico from "../pages/Historico";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/results/:city" element={<Results />} />
                <Route path="/projects" element={<Project />} />
                <Route path="/configurations" element={<Configurations />} />
                <Route path="/historico/:estado" element={<Historico />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
