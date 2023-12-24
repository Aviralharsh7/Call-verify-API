const express = require("express");
const router = express.Router();
const authRouter = require("./auth");

router.get("/", (_req, res) =>{
  return res
    .status(200)
    .json({
      message: "Welcome to Call Verify API"
    });
});

router.use("/auth", authRouter);

module.exports = router;