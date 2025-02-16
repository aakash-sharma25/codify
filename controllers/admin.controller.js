const User = require("../models/users.model");
const VendorLead = require("../models/vendorSchema.model");
const MasterLead = require("../models/masterLead.model");

exports.allVendorList = async (req, res) => {
  try {
    const allVendor = await User.find({ role: "Vendor" }).select(
      "-password -manager -vendor -lead"
    );
    return res.status(200).json({
      size: allVendor.length,
      success: true,
      message: "all vendor fetched successfully",
      allVendor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in fetching the vendors",
      error: error.message,
    });
  }
};

exports.searchLead = async (req, res) => {
  try {
    const { search } = req.body;

    if (!search) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }
    const leads = await MasterLead.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { details: { $regex: search, $options: "i" } },
      ],
    });

    return res.status(200).json({
      size: leads.length,
      success: true,
      message: "Leads fetched successfully",
      leads,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in fetching the leads",
      error: error.message,
    });
  }
};

exports.searchVendor = async (req, res) => {
  try {
    const { search } = req.body;

    if (!search) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const user = await User.find({
      $and: [
        {
          $or: [
            { firstName: { $regex: search, $options: "i" } },
            { lastName: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { subscription: { $regex: search, $options: "i" } },
          ],
        },
        { role: "Vendor" },
      ],
    });

    return res.status(200).json({
      size: user.length,
      success: true,
      message: "Vendors fetched successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in fetching the vendors",
      error: error.message,
    });
  }
};

exports.allLeads = async (req, res) => {
  try {
    const leads = await MasterLead.find();

    return res.status(200).json({
      size: leads.length,
      success: true,
      message: "Leads fetched successfully",
      leads,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in fetching the leads",
    });
  }
};

exports.assignLead = async (req, res) => {
  try {
    const { vendorId, leads } = req.body;

    if (!vendorId || !leads || !Array.isArray(leads) || leads.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Vendor ID and Lead IDs are required.",
      });
    }

    const vendor = await User.findById(vendorId);

    if (!vendor || vendor.role !== "Vendor") {
      return res.status(404).json({
        success: false,
        message: "Vendor not found or invalid role.",
      });
    }

    await Promise.all(
      leads.map(async (leadId) => {
        const vendorLead = await VendorLead.create({
          vendor: vendorId,
          manager: vendorId,
          masterLead: leadId,
          status: "unassigned",
        });
      })
    );

    res.status(201).json({
      message: "Leads successfully assigned to vendor.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in assining the leads",
      error: error.message,
    });
  }
};

exports.leadsOfVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;

    if (!vendorId) {
      return res.status(400).json({
        success: false,
        message: "Vendor ID and is required.",
      });
    }

    const vendor = await User.findById(vendorId);

    if (!vendor || vendor.role !== "Vendor") {
      return res.status(404).json({
        success: false,
        message: "Vendor not found or invalid role.",
      });
    }

    const leads = await VendorLead.find({ vendor: vendorId })
      .select("masterLead")
      .populate("masterLead");

    res.status(201).json({
      success: true,
      message: "Leads fetched successfully.",
      leads,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in assining the leads",
      error: error.message,
    });
  }
};
exports.addLead = async (req, res) => {
  try {
    const leads = [
      {
        name: "John Doe",
        location: "New York, USA",
        phone: "+1 1234567890",
        email: "johndoe@example.com",
        details: "Interested in smartphones",
        isDiamond: true,
        isGenuine: true,
        category: "electronics",
      },
      {
        name: "Sarah Lee",
        location: "Toronto, Canada",
        phone: "+1 9876543210",
        email: "sarah.lee@example.com",
        details: "Looking for home appliances",
        isDiamond: true,
        isGenuine: true,
        category: "home appliance",
      },
      {
        name: "Michael Brown",
        location: "Sydney, Australia",
        phone: "+61 456789012",
        email: "michael.brown@example.com",
        details: "Interested in skincare products",
        isDiamond: false,
        isGenuine: true,
        category: "cosmetics",
      },
      {
        name: "Emma Wilson",
        location: "London, UK",
        phone: "+44 203456789",
        email: "emma.wilson@example.com",
        details: "Curious about kitchen appliances",
        isDiamond: true,
        isGenuine: false,
        category: "home appliance",
      },
      {
        name: "James Taylor",
        location: "Chicago, USA",
        phone: "+1 3126549870",
        email: "james.taylor@example.com",
        details: "Inquired about sound systems",
        isDiamond: false,
        isGenuine: false,
        category: "electronics",
      },
      {
        name: "Olivia Martinez",
        location: "Madrid, Spain",
        phone: "+34 654987321",
        email: "olivia.martinez@example.com",
        details: "Interested in makeup products",
        isDiamond: true,
        isGenuine: true,
        category: "cosmetics",
      },
      {
        name: "Liam Anderson",
        location: "Paris, France",
        phone: "+33 612345987",
        email: "liam.anderson@example.com",
        details: "Inquired about laptops",
        isDiamond: true,
        isGenuine: true,
        category: "electronics",
      },
      {
        name: "Mia Thompson",
        location: "Berlin, Germany",
        phone: "+49 176123459",
        email: "mia.thompson@example.com",
        details: "Wants beauty products",
        isDiamond: false,
        isGenuine: true,
        category: "cosmetics",
      },
      {
        name: "Noah Harris",
        location: "Dubai, UAE",
        phone: "+971 501234567",
        email: "noah.harris@example.com",
        details: "Interested in air conditioners",
        isDiamond: true,
        isGenuine: false,
        category: "home appliance",
      },
      {
        name: "Sophia Evans",
        location: "Tokyo, Japan",
        phone: "+81 9012345678",
        email: "sophia.evans@example.com",
        details: "Inquired about washing machines",
        isDiamond: true,
        isGenuine: false,
        category: "home appliance",
      },
      {
        name: "Ethan Clark",
        location: "Los Angeles, USA",
        phone: "+1 2136547890",
        email: "ethan.clark@example.com",
        details: "Interested in gaming consoles",
        isDiamond: false,
        isGenuine: false,
        category: "electronics",
      },
      {
        name: "Ava King",
        location: "Rome, Italy",
        phone: "+39 065498732",
        email: "ava.king@example.com",
        details: "Looking for personal care products",
        isDiamond: true,
        isGenuine: true,
        category: "cosmetics",
      },
      {
        name: "Alexander Scott",
        location: "Cape Town, S. Africa",
        phone: "+27 721234567",
        email: "alex.scott@example.com",
        details: "Curious about home security systems",
        isDiamond: false,
        isGenuine: false,
        category: "electronics",
      },
      {
        name: "Isabella Turner",
        location: "Sydney, Australia",
        phone: "+61 987654321",
        email: "isabella.turner@example.com",
        details: "Interested in haircare products",
        isDiamond: false,
        isGenuine: false,
        category: "cosmetics",
      },
      {
        name: "Lucas Young",
        location: "Munich, Germany",
        phone: "+49 172345678",
        email: "lucas.young@example.com",
        details: "Wants a refrigerator",
        isDiamond: true,
        isGenuine: true,
        category: "home appliance",
      },
      {
        name: "Charlotte Walker",
        location: "Zurich, Switzerland",
        phone: "+41 791234567",
        email: "charlotte.walker@example.com",
        details: "Interested in vacuum cleaners",
        isDiamond: false,
        isGenuine: false,
        category: "home appliance",
      },
      {
        name: "Benjamin Hall",
        location: "Miami, USA",
        phone: "+1 7864567890",
        email: "benjamin.hall@example.com",
        details: "Looking for cameras",
        isDiamond: true,
        isGenuine: true,
        category: "electronics",
      },
      {
        name: "Amelia Perez",
        location: "Mexico City, Mexico",
        phone: "+52 551234567",
        email: "amelia.perez@example.com",
        details: "Inquired about beauty tools",
        isDiamond: true,
        isGenuine: false,
        category: "cosmetics",
      },
      {
        name: "William Adams",
        location: "Stockholm, Sweden",
        phone: "+46 701234567",
        email: "william.adams@example.com",
        details: "Curious about kitchen gadgets",
        isDiamond: false,
        isGenuine: false,
        category: "home appliance",
      },
      {
        name: "Evelyn Rivera",
        location: "Rio de Janeiro, Brazil",
        phone: "+55 2198765432",
        email: "evelyn.rivera@example.com",
        details: "Interested in home theater systems",
        isDiamond: true,
        isGenuine: false,
        category: "electronics",
      },
      {
        name: "Mason Hill",
        location: "Auckland, NZ",
        phone: "+64 212345678",
        email: "mason.hill@example.com",
        details: "Looking for skincare products",
        isDiamond: false,
        isGenuine: true,
        category: "cosmetics",
      },
      {
        name: "Harper Brooks",
        location: "Hong Kong",
        phone: "+852 51234567",
        email: "harper.brooks@example.com",
        details: "Curious about home lighting systems",
        isDiamond: true,
        isGenuine: false,
        category: "home appliance",
      },
      {
        name: "Elijah Cox",
        location: "Moscow, Russia",
        phone: "+7 4951234567",
        email: "elijah.cox@example.com",
        details: "Inquired about smart TVs",
        isDiamond: false,
        isGenuine: false,
        category: "electronics",
      },
      {
        name: "Abigail Ramirez",
        location: "Lisbon, Portugal",
        phone: "+351 912345678",
        email: "abigail.ramirez@example.com",
        details: "Interested in makeup kits",
        isDiamond: true,
        isGenuine: true,
        category: "cosmetics",
      },
      {
        name: "Daniel Wright",
        location: "New Delhi, India",
        phone: "+91 9812345678",
        email: "daniel.wright@example.com",
        details: "Curious about microwaves",
        isDiamond: false,
        isGenuine: false,
        category: "home appliance",
      },
      {
        name: "Chloe Morgan",
        location: "Singapore",
        phone: "+65 81234567",
        email: "chloe.morgan@example.com",
        details: "Inquired about dishwashers",
        isDiamond: true,
        isGenuine: false,
        category: "home appliance",
      },
      {
        name: "Jacob Ward",
        location: "Kuala Lumpur, Malaysia",
        phone: "+60 121234567",
        email: "jacob.ward@example.com",
        details: "Interested in smartphones",
        isDiamond: false,
        isGenuine: true,
        category: "electronics",
      },
      {
        name: "Lily Cooper",
        location: "Cairo, Egypt",
        phone: "+20 1023456789",
        email: "lily.cooper@example.com",
        details: "Looking for beauty products",
        isDiamond: true,
        isGenuine: false,
        category: "cosmetics",
      },
      {
        name: "Henry Bell",
        location: "Bangkok, Thailand",
        phone: "+66 812345678",
        email: "henry.bell@example.com",
        details: "Inquired about air purifiers",
        isDiamond: true,
        isGenuine: true,
        category: "home appliance",
      },
      {
        name: "Grace Edwards",
        location: "Athens, Greece",
        phone: "+30 211234567",
        email: "grace.edwards@example.com",
        details: "Interested in laptops",
        isDiamond: false,
        isGenuine: false,
        category: "electronics",
      },
    ];

    await MasterLead.insertMany(leads);

    res.status(201).json({
      success: true,
      message: "Leads fetched successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in assining the leads",
      error: error.message,
    });
  }
};
