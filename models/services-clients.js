
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


export const servicesClientsModel = sequelize.define("services-clients", {
  id_servicio: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  fecha_servicio: {
    type: DataTypes.DATE,
    primaryKey: true
  },
  cant_horas: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: "clientes_servicios",
  timestamps: false
});