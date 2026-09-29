const StudentClaim = require("../models/StudentClaim");

const createClaim = async (claimData) => {
  const { studentNumber, firstName, surname, hoursWorked } = claimData;

  const hourlyRate = 200;
  const totalClaimAmount = hoursWorked * hourlyRate;

  const claim = new StudentClaim({
    studentNumber,
    firstName,
    surname,
    hoursWorked,
    hourlyRate,
    totalClaimAmount,
  });

  return await claim.save();
};

const getClaimsByStudentNumber = async (studentNumber) => {
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setFullYear(twelveMonthsAgo.getFullYear() - 1);

  return await StudentClaim.find({
    studentNumber: studentNumber,
    dateSubmitted: {
      $gte: twelveMonthsAgo,
    },
  }).sort({ dateSubmitted: -1 });
};
const cancelClaim = async (claimId) => {
  const claim = await StudentClaim.findById(claimId);

  if (!claim) {
    return { error: "NOT_FOUND" };
  }

  if (claim.status !== "Pending") {
    return { error: "NOT_PENDING" };
  }

  claim.status = "Cancelled";
  await claim.save();

  return { claim };
};

module.exports = {
  createClaim,
  getClaimsByStudentNumber,
  cancelClaim,
};