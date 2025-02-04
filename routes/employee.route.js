const express = require("express");
const { isEmployee } = require("../middlewares/role.middleware");
const { allLeads, updateStatus } = require("../controllers/employee.controller");

const router = express.Router();

router.get("/all-leads", isEmployee, allLeads);

router.post("/lead/update-status", isEmployee, updateStatus);

module.exports = router;