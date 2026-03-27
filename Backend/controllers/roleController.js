const Rol = require("../models/Rol");

// CREAR
const createRol = async (req, res) => {
  try {
    const rol = await Rol.create(req.body);
    res.json(rol);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LISTAR
const getRoles = async (req, res) => {
  try {
    const roles = await Rol.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// EDITAR
const updateRol = async (req, res) => {
  try {
    const { id } = req.params;
    await Rol.update(req.body, { where: { id } });
    res.json({ message: "Rol actualizado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ELIMINAR
const deleteRol = async (req, res) => {
  try {
    const { id } = req.params;
    await Rol.destroy({ where: { id } });
    res.json({ message: "Rol eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 👇 EXPORT CORRECTO
module.exports = {
  createRol,
  getRoles,
  updateRol,
  deleteRol
};