import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../pages/ladingpage";
import Login from "../pages/login";

export default function AppRoute() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}