const express = require("express");
const router = express.Router();

const roleController = require("../controllers/roleController");

// CRUD
router.post("/", roleController.createRol);
router.get("/", roleController.getRoles);
router.put("/:id", roleController.updateRol);
router.delete("/:id", roleController.deleteRol);

// 👇 ESTO ES CLAVE
module.exports = router;