import { DataTypes, Sequelize } from "sequelize";
import 'dotenv/config'

const PASSWORD = process.env.PASSWORD


const sequelize = new Sequelize('TPdsw', 'root', PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

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