import { DataTypes, Sequelize } from "sequelize";


const sequelize = new Sequelize('TPdsw', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export const branchModel = sequelize.define("Sucursal", {
  id_sucursal: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "sucursales",
  timestamps: false
});