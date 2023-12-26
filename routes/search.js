const express = require("express");
const router = express.Router();
const {verifyJWT} = require("../middlewares");
const {search} = require("../controllers");

// router.get(
//   "/:name",
//   verifyJWT, 
//   search.searchByName
// );

router.get(
  "/:number",
  verifyJWT,
  search.searchByNumber
);

module.exports = router;