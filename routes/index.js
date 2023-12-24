const express = require("express");
const router = express.Router();
const {createUser} = require("../controllers");

router.get("/", (_req, res) =>{
  return res
    .status(200)
    .json({
      message: "Welcome to Call Verify API"
    });
});

router.post("/create", createUser);

module.exports = router;