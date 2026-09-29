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

module.exports = {
  createClaim,
};