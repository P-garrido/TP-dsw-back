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

export class ServicesClientsModel {

  static async getAll() {
    try {
      const servCli = await connection.query(
        `SELECT * FROM clientes_servicios;`
      );
      return servCli[0];
    }
    catch (e) {
      throw new Error("No se pueden devolver los servicios de los clientes");
    }

  }

  static async getById({ idServ, idCli }) {
    try {
      const servCli = await connection.query(
        `SELECT *
      FROM clientes_servicios
      WHERE id_servicio=? AND id_usuario=?;`, [idServ, idCli]
      );

      if (servCli.length == 0) {
        return null;
      }
      return servCli[0];
    }
    catch (e) {
      throw new Error("No se puede devolver el servicio del cliente");
    }
  }

  static async create({ servCli }) {
    const {
      idServ,
      idCli,
      hourAmmount
    } = servCli;

    try {
      await connection.query(
        `INSERT INTO clientes_servicios (id_servicio, id_usuario, cant_horas)
     VALUES (?,?,?);`, [idServ, idCli, hourAmmount]
      );
      const [newServCli] = await connection.query(
        `SELECT *
        FROM clientes_servicios
        WHERE id_usuario=? AND id_servicio=?;`, [idCli, idServ]
      );
      if (newServCli.length != 0) {
        return newServCli[0];
      }

    }
    catch (e) {
      throw new Error("No se puede crear el servicio del cliente");
    }
    return false;
  }

  static async delete({ idCli, idServ }) {
    console.log(idServ, idCli);
    try {
      const result = await connection.query(
        `DELETE
        FROM clientes_servicios
        WHERE id_servicio=? AND id_usuario=?;`, [idServ, idCli]
      );
      if (result[0].affectedRows == 1) {
        return true;
      }
    }
    catch (e) {
      throw new Error("No se puede eliminar el servicio del cliente");
    }
    return false;
  }

  static async update({ idServ, idCli, newHourAmmount }) {

    try {
      const oldServCli = await connection.query(
        `SELECT *
        FROM clientes_servicios
        WHERE id_servicio=? AND id_usuario=?;`, [idServ, idCli]
      );

      if (oldServCli.length == 0) {
        throw new Error("Servicio no encontrado");
      }

      const oldServCliObject = oldServCli[0][0];

      const { hourAmmount = oldServCli.cant_horas } = newHourAmmount;

      await connection.query(
        `UPDATE clientes_servicios
        SET cant_horas=?
        WHERE id_servicio=? AND id_usuario=?;`, [hourAmmount, idServ, idCli]
      );
      const newServCli = await connection.query(
        `SELECT *
        FROM clientes_servicios
        WHERE id_servicio=? AND id_usuario=?;`, [idServ, idCli]
      );
      if (newServCli.length != 0) {
        return newServCli[0];
      }
    }
    catch (e) {
      console.log(e);
      throw new Error("No se puede actalizar el servicio del cliente");
    }
    return false;
  }
}
