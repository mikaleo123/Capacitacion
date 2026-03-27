require("dotenv").config();
require("./models/Usuario");


const express = require("express");
const sequelize = require("./config/database");

const Rol = require("./models/Rol");
const roleRoutes = require("./routes/roleRoutes");

const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json()); 
app.use("/roles", roleRoutes);

// crea tablas
sequelize.sync({ force: false })
  .then(async () => {
    console.log("Tablas creadas"); 
    console.log("Base de datos lista - MySql");
    

    // agregar rol si no existe
    const roles = await Rol.findAll();
    // console.log("Roles encontrados:", roles);
    
    if (roles.length === 0) {
      await Rol.create({ descripcion: "ADMIN" });
      await Rol.create({ descripcion: "GENERAL" });
      console.log("Roles iniciales creados");
    }


    app.listen(process.env.PORT, () => {
      console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error al crear tablas:", err);
  });
