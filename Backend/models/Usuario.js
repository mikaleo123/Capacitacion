const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");
const Rol = require("./Rol");

const Usuario = sequelize.define("Usuario", {
    cuil: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    password: {
        type: DataTypes.STRING,
        },
    });


// relación entre Usuario y Rol
Usuario.belongsTo(Rol, { foreignKey: "rolId" });

module.exports = Usuario;