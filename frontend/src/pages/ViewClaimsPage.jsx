import { useState } from "react";
import "../App.css";

function ViewClaimsPage() {
  const [studentNumber, setStudentNumber] = useState("");
  const [claims, setClaims] = useState([]);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();

    setError("");
    setClaims([]);
    setSearched(false);

    if (!studentNumber.trim()) {
      setError("Please enter a student number.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/claims/student/${encodeURIComponent(
          studentNumber.trim()
        )}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to retrieve claims.");
      }

      setClaims(data);
      setSearched(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page">
      <div className="claims-container">
        <h1>View Claims</h1>
        <p className="subtitle">
          Search for claims submitted during the previous 12 months.
        </p>

        <form className="search-form" onSubmit={handleSearch}>
          <div className="form-group">
            <label htmlFor="searchStudentNumber">Student Number</label>

            <input
              id="searchStudentNumber"
              type="text"
              maxLength="20"
              value={studentNumber}
              onChange={(event) => setStudentNumber(event.target.value)}
              placeholder="e.g. ST2026001"
            />
          </div>

          <button type="submit">Search Claims</button>
        </form>

        {error && <p className="error-message">{error}</p>}

        {searched && claims.length === 0 && (
          <p className="no-claims">
            No claims were found for this student number.
          </p>
        )}

        {claims.length > 0 && (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Claim ID</th>
                  <th>Student Number</th>
                  <th>Date Submitted</th>
                  <th>Hours</th>
                  <th>Hourly Rate</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {claims.map((claim) => (
                  <tr key={claim._id}>
                    <td>{claim._id}</td>
                    <td>{claim.studentNumber}</td>
                    <td>
                      {new Date(claim.dateSubmitted).toLocaleDateString()}
                    </td>
                    <td>{claim.hoursWorked}</td>
                    <td>R{Number(claim.hourlyRate).toFixed(2)}</td>
                    <td>R{Number(claim.totalClaimAmount).toFixed(2)}</td>
                    <td>{claim.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewClaimsPage;