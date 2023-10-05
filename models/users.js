import mysql from 'mysql2/promise';

// const DEFAULT_CONFIG = {
//   host: 'localhost',
//   user: 'root',
//   port: 3306,

//   password: 'agus3278',
//   database: 'TPdsw',
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

export class UserModel {
  static async getAllUsers() {
    const [users] = await connection.query('select * from usuarios');
    return users;
  }

  static async getUserById({ id }) {
    const [users] = await connection.query(
      'select * from usuarios where id_usuario = ?',
      [id]
    );
    return users[0];
  }

  static async deleteUserById({ id }) {
    const [users] = await connection.query(
      'select * from usuarios where id_usuario = ?',
      [id]
    );
    await connection.query('delete from usuarios where id_usuario = ?', [id]);
    return users[0];
  }

  static async createUser({ input }) {
    const {
      id_usuario,
      nombre_usuario,
      clave,
      email,
      telefono,
      nombre,
      apellido,
      direccion,
      tipo_usuario,
    } = input;
    await connection.query(
      'insert into usuarios(nombre_usuario, clave, email, telefono, nombre, apellido, direccion, tipo_usuario) values (?,?,?,?,?,?,?,?)',
      [
        nombre_usuario,
        clave,
        email,
        telefono,
        nombre,
        apellido,
        direccion,
        tipo_usuario,
      ]
    );
    const [newUser] = await connection.query(
      'select * from usuarios where id_usuario = ?',
      [id_usuario]
    );
    return newUser[0];
  }

  static async modifyUser({ id, input }) {
    const oldUser = await connection.query(
      `SELECT *
      FROM usuarios
      WHERE id_usuario=?;`,
      [id]
    );

    if (oldUser[0].length == 0) {
      throw new Error('Usuario no encontrado');
    }

    const foundUser = oldUser[0][0];

    const {
      clave = foundUser.clave,
      email = foundUser.email,
      telefono = foundUser.telefono,
      nombre = foundUser.nombre,
      apellido = foundUser.apellido,
      direccion = foundUser.direccion,
      tipo_usuario = foundUser.tipo_usuario,
    } = input;

    try {
      await connection.query(
        `UPDATE usuarios
        SET clave=?, email =?, telefono=?, nombre=?, apellido=?, direccion=?, tipo_usuario=? 
        WHERE id_usuario=?;`,
        [clave, email, telefono, nombre, apellido, direccion, tipo_usuario, id]
      );
      const newUser = await connection.query(
        `SELECT *
        FROM usuarios
        WHERE id_usuario=?;`,
        [id]
      );
      if (newUser.length != 0) {
        return newUser[0];
      }
    } catch (e) {
      throw new Error('No se pudo actualizar el usuario por  ' + e);
    }
    return false;
  }
}

// const oldUserContainer = await connection.query('select * from usuarios where id_usuario = ?', [id])
//     if (oldUserContainer.length === 0) {
//       throw new Error("Usuario no encontrado")
//     }
//     const oldUser = oldUserContainer[0][0]
//     const {
//       nombre_usuario = oldUser.nombre_usuario,
//       clave = oldUser.clave,
//       email = oldUser.email,
//       telefono = oldUser.telefono,
//       nombre = oldUser.nombre,
//       apellido = oldUser.apellido,
//       direccion = oldUser.direccion,
//       tipo_usuario = oldUser.tipo_usuario
//     } = input;
//     await connection.query(`update usuarios set nombre_usuario = ?, clave = ?, email = ?, telefono = ?,
//     nombre = ?, apellido = ?, direccion = ?, tipo_usuario = ? where id_usuario = ?`, [nombre_usuario, clave, email, telefono, nombre, apellido, direccion, tipo_usuario, id])
//     const updatedUser = await connection.query('select * from usuarios where id_usuario = ?', [id])
//     if (!updatedUser) {
//       throw new Error('Error actualizando el usuario')
//     }
//     return updatedUser
