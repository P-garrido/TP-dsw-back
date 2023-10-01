import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'TPdsw'
}
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

const connection = await mysql.createConnection(connectionString)

export class UserModel {
  static async getAllUsers() {
    const [users] = await connection.query('select * from usuarios')
    return users
  }

  static async getUserById({ id }) {
    const [users] = await connection.query('select * from usuarios where id_usuario = ?', [id])
    return users[0]
  }

  static async deleteUserById({ id }) {
    const [users] = await connection.query('select * from usuarios where id_usuario = ?', [id])
    await connection.query('delete from usuarios where id_usuario = ?', [id])
    return users[0]
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
      tipo_usuario
    } = input
    await connection.query('insert into usuarios values (?,?,?,?,?,?,?,?,?)', [id_usuario, nombre_usuario, clave, email, telefono, nombre, apellido, direccion, tipo_usuario])
    const [newUser] = await connection.query('select * from usuarios where id_usuario = ?', [id_usuario])
    return newUser[0]
  }

  static async modifyUser({ id, input }) {
    const oldUserContainer = await connection.query('select * from usuarios where id_usuario = ?', [id])
    if (oldUserContainer.length === 0) {
      throw new Error("Usuario no encontrado")
    }
    const oldUser = oldUserContainer[0][0]
    const {
      nombre_usuario = oldUser.nombre_usuario,
      clave = oldUser.clave,
      email = oldUser.email,
      telefono = oldUser.telefono,
      nombre = oldUser.nombre,
      apellido = oldUser.apellido,
      direccion = oldUser.direccion,
      tipo_usuario = oldUser.tipo_usuario
    } = input;
    await connection.query(`update usuarios set nombre_usuario = ?, clave = ?, email = ?, telefono = ?, 
    nombre = ?, apellido = ?, direccion = ?, tipo_usuario = ? where id_usuario = ?`, [nombre_usuario, clave, email, telefono, nombre, apellido, direccion, tipo_usuario, id])
    const updatedUser = await connection.query('select * from usuarios where id_usuario = ?', [id])
    if (!updatedUser) {
      throw new Error('Error actualizando el usuario')
    }
    return updatedUser
  }
}