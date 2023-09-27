import mysql from "mysql2/promise";

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'TPdsw'
}

const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG;

const connection = await mysql.createConnection(connectionString);

export class ServiceModel {

  static async getall() {
    const services = await connection.query(
      `SELECT *
      FROM servicios;`
    );
    return services[0];
  }

  static async getById({ id }) {
    const service = await connection.query(
      `SELECT *
      FROM servicios
      WHERE id_servicio=?;`, [id]
    );

    if (service.length == 0) {
      return null;
    }
    return services[0];
  }

  static async create({ service }) {
    const {
      desc,
      hourValue
    } = service;

    try {
      await connection.query(
        `INSERT INTO servicios(desc_servicio, precio_por_hora)
        VALUES (?,?);`, [desc, hourValue]
      );
      const [serv] = await connection.query(
        `SELECT * 
        FROM servicios
        WHERE desc_servicio=?;`, [desc]
      );
      if (service.length != 0) {
        return serv[0];
      }
    }
    catch (e) {
      throw e;
    }
    return false;
  }

  static async delete({ id }) {
    try {
      const result = await connection.query(
        `DELETE FROM servicios
        WHERE id_servicio=?;`, [id]
      );
      if (result[0].affectedRows == 0) {
        return true;
      }
    }
    catch (e) {
      throw e;
    }
    return false;
  }

  static async update({ id, serv }) {
    const oldServ = await connection.query(
      `SELECT *
      FROM servicios
      WHERE id_servicio=?;`, [id]
    );

    if (oldServ[0].length == 0) {
      throw new Error("Servicio no encontrado");
    }

    const oldService = oldServ[0][0];

    const {
      desc: newDesc = oldService.desc_servicio,
      hourVal: newHourVal = oldService.precio_por_hora
    } = serv;

    try {
      await connection.query(
        `UPDATE servicios
        SET desc_servicio=?, precio_por_hora=? 
        WHERE id_servicio=?;`, [newDesc, newHourVal]
      );
      const newService = await connection.query(
        `SELECT *
        FROM servicios
        WHERE id_servicio=?;`, [id]
      );
      if (newService.length != 0) {
        return newService[0];
      }
    }
    catch (e) {
      throw e;
    }
    return false;
  }
}
