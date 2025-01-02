const express = require("express")
const router = express.Router()
const {getAdmin, enviarDados } = require("../controllers/admin")
const {getInvestimento} = require("../controllers/investimento")

router.route("/").get(getAdmin),
router.route("/submit").post(enviarDados)

module.exports = router