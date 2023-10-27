import { DataTypes, Sequelize } from 'sequelize';

const sequelize = new Sequelize('TPdsw', 'root', 'agus3278', {
  host: 'localhost',
  dialect: 'mysql'
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

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
