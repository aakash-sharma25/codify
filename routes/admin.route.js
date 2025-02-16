const express = require("express");
const { allVendorList, allLeads, leadsOfVendor, addLead, searchLead, searchVendor } = require("../controllers/admin.controller");
const { assignLead } = require("../controllers/admin.controller");
const { isSuperAdmin } = require("../middlewares/role.middleware");

const router = express.Router();

router.get("/all-leads", isSuperAdmin, allLeads);

router.post("/search-leads", isSuperAdmin, searchLead);

router.get("/vendor-list", isSuperAdmin, allVendorList);

router.post("/vendor-search", isSuperAdmin, searchVendor);

router.post("/assign-leads", isSuperAdmin, assignLead);

router.get("/add", addLead);

router.get("/all-leads/:vendorId", isSuperAdmin, leadsOfVendor);

module.exports = router;
