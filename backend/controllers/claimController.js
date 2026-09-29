const claimService = require("../services/claimService");

const createClaim = async (req, res) => {
  try {
    const { studentNumber, firstName, surname, hoursWorked } = req.body;

    // Validate required fields
    if (!studentNumber || !firstName || !surname || hoursWorked === undefined) {
      return res.status(400).json({
        message:
          "Student number, first name, surname and hours worked are required.",
      });
    }

    // Validate field lengths
    if (studentNumber.trim().length > 20) {
      return res.status(400).json({
        message: "Student number must not exceed 20 characters.",
      });
    }

    if (firstName.trim().length > 50) {
      return res.status(400).json({
        message: "First name must not exceed 50 characters.",
      });
    }

    if (surname.trim().length > 50) {
      return res.status(400).json({
        message: "Surname must not exceed 50 characters.",
      });
    }

    // Validate hours worked
    const hours = Number(hoursWorked);

    if (!Number.isFinite(hours) || hours <= 0) {
      return res.status(400).json({
        message: "Hours worked must be greater than zero.",
      });
    }

    const claim = await claimService.createClaim({
      studentNumber: studentNumber.trim(),
      firstName: firstName.trim(),
      surname: surname.trim(),
      hoursWorked: hours,
    });

    return res.status(201).json(claim);
  } catch (error) {
    console.error("Error creating claim:", error);

    return res.status(500).json({
      message: "An unexpected error occurred while creating the claim.",
    });
  }
};
const getClaimsByStudentNumber = async (req, res) => {
  try {
    const { studentNumber } = req.params;

    if (!studentNumber || !studentNumber.trim()) {
      return res.status(400).json({
        message: "Student number is required.",
      });
    }

    if (studentNumber.trim().length > 20) {
      return res.status(400).json({
        message: "Student number must not exceed 20 characters.",
      });
    }

    const claims = await claimService.getClaimsByStudentNumber(
      studentNumber.trim()
    );

    return res.status(200).json(claims);
  } catch (error) {
    console.error("Error retrieving claims:", error);

    return res.status(500).json({
      message: "An unexpected error occurred while retrieving claims.",
    });
  }
};
const cancelClaim = async (req, res) => {
  try {
    const { claimId } = req.params;

    const result = await claimService.cancelClaim(claimId);

    if (result.error === "NOT_FOUND") {
      return res.status(404).json({
        message: "Claim not found.",
      });
    }

    if (result.error === "NOT_PENDING") {
      return res.status(409).json({
        message: "Only Pending claims can be cancelled.",
      });
    }

    return res.status(200).json({
      message: "Claim cancelled successfully.",
      claim: result.claim,
    });
  } catch (error) {
    console.error("Error cancelling claim:", error);

    return res.status(500).json({
      message: "An unexpected error occurred while cancelling the claim.",
    });
  }
};

module.exports = {
  createClaim,
  getClaimsByStudentNumber,
  cancelClaim,
};