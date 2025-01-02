const express = require("express")
const router = express.Router()
const {getDespesas} = require("../controllers/despesas")

router.route("/").post(getDespesas)

module.exports = router