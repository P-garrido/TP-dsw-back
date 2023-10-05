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

  static async getById({ idServ, idCli, date }) {
    try {
      const servCli = await connection.query(
        `SELECT *
      FROM clientes_servicios
      WHERE id_servicio=? AND id_usuario=? AND fecha_servicio like ?;`, [idServ, idCli, date + '%']
      );

      if (servCli.length == 0) {
        return null;
      }
      return servCli[0];
    }
    catch (e) {
      console.log(e);
      throw new Error("No se puede devolver el servicio del cliente");
    }
  }

  static async create({ servCli }) {
    const {
      idServ,
      idCli,
      date,
      hourAmmount
    } = servCli;

    try {
      await connection.query(
        `INSERT INTO clientes_servicios (id_servicio, id_usuario, fecha_servicio, cant_horas)
     VALUES (?,?,?,?);`, [idServ, idCli, date, hourAmmount]
      );
      const [newServCli] = await connection.query(
        `SELECT *
      FROM clientes_servicios
      WHERE id_servicio=? AND id_usuario=? AND fecha_servicio = ?;`, [idServ, idCli, date]
      );
      if (newServCli.length != 0) {
        return newServCli[0];
      }

    }
    catch (e) {
      console.log(e);
      throw new Error("No se puede crear el servicio del cliente");
    }
    return false;
  }

  static async delete({ idCli, idServ, date }) {
    try {
      const result = await connection.query(
        `DELETE
        FROM clientes_servicios
        WHERE id_servicio=? AND id_usuario=? AND fecha_servicio like ?;`, [idServ, idCli, date + '%']
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

  static async update({ idServ, idCli, newHourAmmount, date }) {

    try {
      const oldServCli = await connection.query(
        `SELECT *
        FROM clientes_servicios
        WHERE id_servicio=? AND id_usuario=? AND fecha_servicio like ?;`, [idServ, idCli, date + '%']
      );

      if (oldServCli.length == 0) {
        throw new Error("Servicio no encontrado");
      }

      const oldServCliObject = oldServCli[0][0];

      const { hourAmmount = oldServCliObject.cant_horas } = newHourAmmount;

      await connection.query(
        `UPDATE clientes_servicios
        SET cant_horas=?
        WHERE id_servicio=? AND id_usuario=? AND fecha_servicio like ?;`, [hourAmmount, idServ, idCli, date + '%']
      );
      const newServCli = await connection.query(
        `SELECT *
        FROM clientes_servicios
        WHERE id_servicio=? AND id_usuario=? AND fecha_servicio like ?;`, [idServ, idCli, date + '%']
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
