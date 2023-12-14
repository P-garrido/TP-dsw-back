import { DataTypes, Sequelize } from 'sequelize';
import sequelize from './sequelize.js';

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

