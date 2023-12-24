const express = require("express");
const router = express.Router();

router.get("/", (_req, res) =>{
  return res
    .status(200)
    .json({
      message: "Welcome to Call Verify API"
    });
});

module.exports = router;