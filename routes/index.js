const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const searchRouter = require("./search");

router.get("/", (_req, res) =>{
  return res
    .status(200)
    .json({
      message: "Welcome to Call Verify API"
    });
});

router.use("/auth", authRouter);
router.use("/search", searchRouter);

module.exports = router;