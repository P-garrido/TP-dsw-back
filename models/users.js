import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
  host: 'localhost', 
  user: 'root',
  port: 3306,
  password: 'francisco',
  database: 'tpdsw'  
}

const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

const connection = await mysql.createConnection(connectionString)

export class UserModel {
  static async getAllUsers() {
    const [users] = await connection.query('select * from usuarios')
    return users
  }

  static async getUserById({id}) {
    const [users] = await connection.query('select * from usuarios where id_usuario = ?', [id])
    return users[0]
  }

  static async deleteUserById({id}){
    const [users] = await connection.query('select * from usuarios where id_usuario = ?', [id])
    await connection.query('delete from usuarios where id_usuario = ?', [id])
    return users[0]
  }

  static async createUser({input}){
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
  }