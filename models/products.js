import { Sequelize, Op, Model, DataTypes, NOW } from 'sequelize';
import 'dotenv/config';

const PASSWORD = process.env.PASSWORD;

const sequelize = new Sequelize('tpdsw', 'root', PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
});

export const ProductsModel = sequelize.define(
  'productos',
  {
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre_producto: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    desc_producto: {
      type: DataTypes.STRING,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_categoria: {
      type: DataTypes.INTEGER,
    },
    precio: {
      type: DataTypes.DECIMAL(9, 3),
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);
