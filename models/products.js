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
  database: 'TPdsw'
}

const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG;

const connection = await mysql.createConnection(connectionString);

export class ProductModel {
  static async getAllProducts() {
    const [products] = await connection.query('select * from productos');
    return products;
  }

  static async getProductById({ id }) {
    const [product] = await connection.query(
      'select * from productos where id_producto = ?',
      [id]
    );
    return product[0];
  }

  static async deleteProductById({ id }) {
    const [product] = await connection.query(
      'select * from productos where id_producto = ?',
      [id]
    );
    await connection.query('delete from productos where id_producto = ?', [id]);
    return product[0];
  }

  static async createProduct({ input }) {
    const {
      id_producto,
      nombre_producto,
      desc_producto,
      stock,
      precio,
      imagen,
    } = input;
    await connection.query(
      'insert into productos (nombre_producto, desc_producto, stock, precio, imagen) values (?,?,?,?,?)',
      [nombre_producto, desc_producto, stock, precio, imagen]
    );
    const [newProduct] = await connection.query('select * from productos', [
      id_producto,
    ]);
    return newProduct;
  }

  static async updateProduct({ input }) {
    const {
      id_producto,
      nombre_producto,
      desc_producto,
      stock,
      precio,
      imagen,
    } = input;
    await connection.query(
      'UPDATE productos SET nombre_producto=?, desc_producto=?, stock=?, precio=?, imagen=? WHERE id_producto=?',
      [nombre_producto, desc_producto, stock, precio, imagen, id_producto]
    );
    const [newProduct] = await connection.query(
      'SELECT * FROM productos WHERE id_producto = ?',
      [id_producto]
    );
    return newProduct;
  }
}
