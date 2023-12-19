const express = require("express");
const router = express.Router();
const {
  getAllSphinx,
  createSphinx,
  updateSphinxLikes,
} = require("../controllers/sphinxController");
const { sphinxSchema } = require("../validations/sphinxValidation");
const { validate } = require("../utils/validateInput");

router.route("/all").get(getAllSphinx);
router.route("/create").post(validate(sphinxSchema), createSphinx);
router.route("/update-likes").put(updateSphinxLikes);

module.exports = router;
