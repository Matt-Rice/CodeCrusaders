import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage/LandingPage";
//import DailyDosePage from "./DailyDosePage/DailyDosePage";     // where DailyDose will go

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} /> {/* Default Route */}
                {/*<Route path="/dailydose" element={<DailyDosePage />} /> {/* Example other route */}
            </Routes>
        </Router>
    );
}

export default App;
