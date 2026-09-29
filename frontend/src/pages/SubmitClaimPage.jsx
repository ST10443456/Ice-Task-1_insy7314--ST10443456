import { useState } from "react";
import "./App.css";

function SubmitClaimPage() {
  const HOURLY_RATE = 200;

  const [formData, setFormData] = useState({
    studentNumber: "",
    firstName: "",
    surname: "",
    hoursWorked: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const totalAmount =
    formData.hoursWorked && Number(formData.hoursWorked) > 0
      ? Number(formData.hoursWorked) * HOURLY_RATE
      : 0;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setMessage("");
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (
      !formData.studentNumber.trim() ||
      !formData.firstName.trim() ||
      !formData.surname.trim() ||
      !formData.hoursWorked
    ) {
      setError("Please complete all fields.");
      return;
    }

    if (Number(formData.hoursWorked) <= 0) {
      setError("Hours worked must be greater than zero.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/claims", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentNumber: formData.studentNumber,
          firstName: formData.firstName,
          surname: formData.surname,
          hoursWorked: Number(formData.hoursWorked),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit claim.");
      }

      setMessage(
        `Claim submitted successfully. Total amount: R${data.totalClaimAmount.toFixed(
          2
        )}`
      );

      setFormData({
        studentNumber: "",
        firstName: "",
        surname: "",
        hoursWorked: "",
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page">
      <div className="claim-card">
        <h1>Student Bursary Claims</h1>
        <p className="subtitle">
          Submit a claim for the work you completed.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="studentNumber">Student Number</label>
            <input
              id="studentNumber"
              name="studentNumber"
              type="text"
              maxLength="20"
              value={formData.studentNumber}
              onChange={handleChange}
              placeholder="e.g. ST2026001"
            />
          </div>

          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              maxLength="50"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="surname">Surname</label>
            <input
              id="surname"
              name="surname"
              type="text"
              maxLength="50"
              value={formData.surname}
              onChange={handleChange}
              placeholder="Enter your surname"
            />
          </div>

          <div className="form-group">
            <label htmlFor="hoursWorked">Hours Worked</label>
            <input
              id="hoursWorked"
              name="hoursWorked"
              type="number"
              min="0.01"
              step="0.01"
              value={formData.hoursWorked}
              onChange={handleChange}
              placeholder="e.g. 12.5"
            />
          </div>

          <div className="claim-summary">
            <div>
              <span>Hourly Rate</span>
              <strong>R{HOURLY_RATE.toFixed(2)}</strong>
            </div>

            <div>
              <span>Total Claim Amount</span>
              <strong>R{totalAmount.toFixed(2)}</strong>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}
          {message && <p className="success-message">{message}</p>}

          <button type="submit">Submit Claim</button>
        </form>
      </div>
    </div>
  );
}

export default SubmitClaimPage;