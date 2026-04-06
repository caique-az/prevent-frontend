import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Results from "../pages/Results";
import Project from "../pages/Project";
import Configurations from "../pages/Configurations";
import Historico from "../pages/Historico";
import RotasSeguras from "../pages/RotasSeguras";
import NoResults from "../pages/NoResults";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import ErrorBoundary from "../components/ErrorBoundary";

function AppRoutes() {
    return (
        <ErrorBoundary showDetails={import.meta.env.DEV}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/results/:city" element={<Results />} />
                    <Route path="/projects" element={<Project />} />
                    <Route path="/configurations" element={<Configurations />} />
                    <Route path="/historico/:estado" element={<Historico />} />
                    <Route path="/rotas-seguras" element={<RotasSeguras />} />
                    <Route path="/no-results" element={<NoResults />} />
                    <Route path="/contact" element={<Contact />} />
                    {/* Rota 404 - deve ser a última */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </ErrorBoundary>
    );
}

export default AppRoutes;