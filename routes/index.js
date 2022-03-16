//const { route } = require("./movies.route");

const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});
router.use(require("./celebrities.route.js"));
router.use(require("./movies.route.js"))
module.exports = router;
