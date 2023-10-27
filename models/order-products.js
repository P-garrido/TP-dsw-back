import { Sequelize, Op, Model, DataTypes, NOW } from 'sequelize';
import { OrdersModel } from './orders.js';
import 'dotenv/config';

const PASSWORD = process.env.PASSWORD;
const sequelize = new Sequelize('tpdsw', 'root', PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
});

export const OrderProduct = sequelize.define(
  'productos_pedidos',
  {
    id_pedido: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    id_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

OrdersModel.hasMany(OrderProduct, {
  foreignKey: 'id_pedido',
});