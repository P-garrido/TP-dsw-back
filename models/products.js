import { Op, Model, DataTypes, NOW } from 'sequelize';
import sequelize from './sequelize.js';

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