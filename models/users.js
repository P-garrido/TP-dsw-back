import mysql from 'mysql2/promise';
import {Sequelize, DataTypes} from 'sequelize'


//base de datos agus
// const DEFAULT_CONFIG = {
//   host: 'localhost',
//   user: 'root',
//   port: 3306,
//   password: 'agus3278',
//   database: 'TPdsw',
// };

//base de datos pedro
// const DEFAULT_CONFIG = {
//   host: 'localhost',
//   user: 'root',
//   port: 3306,
//   password: '',
//   database: 'TPdsw'
// }

// base de datos fran
const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'francisco',
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
}


const sequelize = new Sequelize('TPdsw', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  password: 'francisco'
})

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export const userModel = sequelize.define("Usuario",{
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  nombre_usuario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  clave: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  }}, {
  tableName: "usuarios",
  timestamps: false
})