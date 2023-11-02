import { Sequelize, DataTypes } from 'sequelize'
import 'dotenv/config'
import { servicesClientsModel } from './services-clients.js';


const PASSWORD = process.env.PASSWORD





const sequelize = new Sequelize('TPdsw', 'root', PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
})


try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}



export const userModel = sequelize.define(
  'Usuario',
  {
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nombre_usuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clave: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'usuarios',
    timestamps: false,
  }
);

userModel.hasMany(servicesClientsModel, { foreignKey: "id_usuario" });
servicesClientsModel.belongsTo(userModel, { foreignKey: "id_usuario" });