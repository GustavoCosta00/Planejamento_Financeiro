const express = require("express")
const router = express.Router()
const {getInvestimento} = require("../controllers/investimento")

router.route("/").get(getInvestimento)

module.exports = router