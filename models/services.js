import { DataTypes } from 'sequelize';
import sequelize from './sequelize.js';
import { servicesClientsModel } from './services-clients.js';

export const serviceModel = sequelize.define(
  'Servicio',
  {
    id_servicio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    desc_servicio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio_por_hora: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'servicios',
    timestamps: false,
  }
);

serviceModel.hasMany(servicesClientsModel, { foreignKey: "id_servicio", onDelete: "CASCADE" });
servicesClientsModel.belongsTo(serviceModel, { foreignKey: "id_servicio", onDelete: "CASCADE" });

