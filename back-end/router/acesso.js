const express = require("express")
const router = express.Router()
const {getAcesso, postPaginaInicial} = require("../controllers/acesso")

router.route("/").get(getAcesso).post(postPaginaInicial)

module.exports = router