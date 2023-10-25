import { DataTypes, Sequelize } from 'sequelize';

const sequelize = new Sequelize('TPdsw', 'root', 'agus3278', {
  host: 'localhost',
  dialect: 'mysql',
  //contraseña bd fran,
  password: 'francisco'
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export const servicesClientsModel = sequelize.define(
  'services-clients',
  {
    id_servicio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    fecha_servicio: {
      type: DataTypes.DATE,
      primaryKey: true,
    },
    cant_horas: {
      type: DataTypes.INTEGER,
    },
    mensaje_cliente: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'clientes_servicios',
    timestamps: false,
  }
);
