import {  Op, Model, DataTypes, NOW, QueryTypes, Sequelize } from 'sequelize';
import { userModel } from './users.js';
import sequelize from './sequelize.js';

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
