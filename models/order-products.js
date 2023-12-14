import { Op, Model, DataTypes, NOW } from 'sequelize';
import { OrdersModel } from './orders.js';
import sequelize from './sequelize.js';

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

