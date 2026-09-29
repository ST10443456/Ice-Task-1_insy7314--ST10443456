const express = require("express");
const router = express.Router();

const claimController = require("../controllers/claimController");

console.log("Claim routes loaded");

// Submit a new claim
router.post("/", claimController.createClaim);

// Get claims by student number
router.get(
  "/student/:studentNumber",
  claimController.getClaimsByStudentNumber
);

module.exports = router;