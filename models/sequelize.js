import { Sequelize } from 'sequelize';
import 'dotenv/config'

const PASSWORD = process.env.PASSWORD

const sequelize = new Sequelize('TPdsw', 'root', PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default sequelize;