import { DataTypes } from "sequelize";
import sequelize from "./sequelize.js";



export const branchModel = sequelize.define("Sucursal", {
  id_sucursal: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "sucursales",
  timestamps: false
});