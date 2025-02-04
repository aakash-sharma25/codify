const express = require("express");
const { isVendor } = require("../middlewares/role.middleware");
const {
  buySubscription,
  allLeads,
  addEmployee,
  allManager,
  managerDetails,
  allEmployee,
  assignLeads,
  employeeLeads,
  vendorDetails,
  requestLeads,
  employeeDetails,
  completedLeadsThisMonth,
  subscriptionEndsIn,
  topPerformer,
  recentCompletedLeads,
  totalLeads,
  totalEmployees,
  individualLeadCount,
} = require("../controllers/vendor.controller");

const router = express.Router();

router.get("/individual-lead-count", isVendor, individualLeadCount);

router.post("/buy-subscription", isVendor, buySubscription);

router.get("/request-leads", isVendor, requestLeads);

router.get("/all-leads", isVendor, allLeads);

router.post("/add-employee", isVendor, addEmployee);

router.get("/all-manager", isVendor, allManager);

router.get("/detail/:managerId", isVendor, managerDetails);

router.get("/all-employee", isVendor, allEmployee);
 
router.post("/assign-leads", isVendor, assignLeads);

router.post("/employee-detail", isVendor, employeeDetails);

//remaining to implement

router.get("/leads/:employeeId", isVendor, employeeLeads);

//testing

router.get("/total-leads",isVendor, totalLeads); 
router.get("/total-employees",isVendor, totalEmployees); 
router.get("/completed-leads",isVendor, completedLeadsThisMonth); 
router.get("/subscription-endsIn",isVendor, subscriptionEndsIn);
router.get("/recent-completed-leads",isVendor, recentCompletedLeads); 
router.get("/top-performer",isVendor, topPerformer);
module.exports = router;
