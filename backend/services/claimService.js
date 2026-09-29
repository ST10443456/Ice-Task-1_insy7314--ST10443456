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

module.exports = {
  createClaim,
  getClaimsByStudentNumber,
};