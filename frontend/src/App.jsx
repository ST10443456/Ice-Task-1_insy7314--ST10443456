import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SubmitClaimPage from "./pages/SubmitClaimPage";
import ViewClaimsPage from "./pages/ViewClaimsPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <div className="nav-title">Bursary Claims</div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/submit">Submit Claim</Link>
          <Link to="/claims">View Claims</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/submit" element={<SubmitClaimPage />} />
        <Route path="/claims" element={<ViewClaimsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;