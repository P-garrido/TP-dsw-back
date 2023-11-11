import { Sequelize, Op, Model, DataTypes, NOW, QueryTypes } from 'sequelize';
import 'dotenv/config';
import { userModel } from './users.js';

const PASSWORD = process.env.PASSWORD;

const sequelize = new Sequelize('tpdsw', 'root', PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
});

export const OrdersModel = sequelize.define(
  'pedidos',
  {
    id_pedido: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    // agregar como clave foranea cuando tenga los demas modelos
    // id_cliente: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references:{
    //     model: usuarios,
    //     key: 'id_usuario'
    //   }
    // }
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(9, 3),
    },
  },
  {
    timestamps: false,
  }
);
