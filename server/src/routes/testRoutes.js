const express = require("express");
const { testGemini } = require("../controllers/testController");

const router = express.Router();

router.get("/gemini", testGemini);

module.exports = router;