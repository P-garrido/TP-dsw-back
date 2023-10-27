import mysql from 'mysql2/promise';

// const DEFAULT_CONFIG = {
//   host: 'localhost',
//   user: 'root',
//   port: 3306,
//   password: 'agus3278',
//   database: 'tpdsw',
// };

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'tpdsw',
};

const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG;

const connection = await mysql.createConnection(connectionString);

export class OrderProductsModel {
  static async createOrderProductTuple({ input }) {
    const { id_pedido, id_producto, cantidad } = input;
    await connection.query(
      'INSERT INTO productos_pedidos (id_pedido,  id_producto, cantidad) values (?,?,?)',
      [id_pedido, id_producto, cantidad]
    );
    const [newOrderProduct] = await connection.query(
      'SELECT * FROM productos_pedidos WHERE id_pedido=? AND id_producto=?',
      [id_pedido, id_producto]
    );
    return newOrderProduct;
  }
}
