const express = require("express");
const { allVendorList, allLeads, leadsOfVendor, addLead } = require("../controllers/admin.controller");
const { assignLead } = require("../controllers/admin.controller");
const { isSuperAdmin } = require("../middlewares/role.middleware");

const router = express.Router();

router.get("/all-leads", isSuperAdmin, allLeads);

router.get("/vendor-list", isSuperAdmin, allVendorList);

router.post("/assign-leads", isSuperAdmin, assignLead);

router.get("/add", addLead);

router.get("/all-leads/:vendorId", isSuperAdmin, leadsOfVendor);

module.exports = router;
