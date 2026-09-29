import { Link } from "react-router-dom";
import "../App.css";

function HomePage() {
  return (
    <div className="page">
      <div className="claim-card">
        <h1>Student Bursary Claims Management System</h1>

        <p className="subtitle">
          Submit and manage bursary claims for work completed as part of the
          university bursary programme.
        </p>

        <div className="home-actions">
          <Link to="/submit" className="nav-button">
            Submit a Claim
          </Link>

          <Link to="/claims" className="nav-button secondary-button">
            View Claims
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;