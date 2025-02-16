const express = require("express");
const { isManager } = require("../middlewares/role.middleware");
const {
  addEmployee,
  allLeads,
  allEmployee,
  allEmployeeList,
  assignLeadToEmployee,
  managerDetails,
  subscriptionEndsIn,
  recentCompletedLeads,
  topPerformer,
  completedLeadsThisMonth,
} = require("../controllers/manager.controller");

const router = express.Router();

router.get("/dashboard", isManager, managerDetails);
router.post("/add-employee", isManager, addEmployee);

router.get("/all-leads", isManager, allLeads);

router.get("/all-employee", isManager, allEmployee);
router.get("/all-emp-list", isManager, allEmployeeList);

router.post("/assign-leads", isManager, assignLeadToEmployee);


//new route
router.get("/subscription-endsIn",isManager, subscriptionEndsIn);
router.get("/recent-completed-leads",isManager, recentCompletedLeads); 
router.get("/lead-completed",isManager, completedLeadsThisMonth); 

router.get("/top-performer",isManager, topPerformer);;
module.exports = router;
