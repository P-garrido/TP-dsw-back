import { Sequelize, Op, Model, DataTypes, NOW, QueryTypes } from 'sequelize';
import 'dotenv/config';
// import { OrderProduct } from './order-products.js';

const PASSWORD = process.env.PASSWORD;

const sequelize = new Sequelize('tpdsw', 'root', PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
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

// export const getProductsOrder = () => {
//   return sequelize.query(
//     `select p.id_pedido 'id_pedido' , p.fecha 'fecha', p.total 'total', cli.nombre 'nombre', cli.apellido 'apellido', pr.nombre_producto 'nombre_producto', pp.cantidad 'cantidad'
//     from pedidos p
//     inner join productos_pedidos pp on pp.id_pedido = p.id_pedido
//     inner join productos pr on pr.id_producto = pp.id_producto
//     inner join usuarios cli on cli.id_usuario = p.id_cliente`,
//     {
//       type: Sequelize.QueryTypes.SELECT,
//     }
//   );
// };

