import { userModel } from "../models/users.js";
import { serviceModel } from "../models/services.js";
import { validateServiceClient, validatePartialServiceClient } from "../schemas/services-clients.js";


export class ServicesClientsController {

  constructor({ servicesClientsModel }) {
    this.servicesClientsModel = servicesClientsModel;
  }

  getAll = async (req, res) => {

    try {
      const servicesClients = await this.servicesClientsModel.findAll({ include: [{ model: userModel }, { model: serviceModel }] });
      res.json(servicesClients);
    }
    catch (error) {
      res.status(400).json({error: 'error buscando las instancias'})
    }
  }

  getById = async (req, res) => {
    const idServ = req.params.idServ;
    const idCli = req.params.idCli;
    const date = req.params.date;

    try {
      const serviceClient = await this.servicesClientsModel.findAll({
        where: {
          id_servicio: idServ,
          id_usuario: idCli,
          fecha_servicio: date
        }
      });
      res.json(serviceClient);
    }
    catch (error) {
      res.status(400).json({error: 'error buscando la instancia'})
    }
  }

  create = async (req, res) => {
    const result = validateServiceClient(req.body);

    if (!result.success) {
      return res.status(404).json({ error: JSON.parse(result.error.message) });
    }

    try {
      const newServiceClient = await this.servicesClientsModel.create({
        id_servicio: result.data.idServ,
        id_usuario: result.data.idCli,
        fecha_servicio: result.data.date,
        cant_horas: result.data.hourAmmount,
        mensaje_cliente: result.data.clientMessage
      });
      res.status(201).json(newServiceClient);
    }
    catch (error) {
      res.status(400).json({error: 'error registrando la contratación'})
    }
  }

  delete = async (req, res) => {
    const idServ = req.params.idServ;
    const idCli = req.params.idCli;
    const date = req.params.date;

    try {
      const result = await this.servicesClientsModel.destroy({
        where: {
          id_servicio: idServ,
          id_usuario: idCli,
          fecha_servicio: date
        }
      });
      if (result == 0) {
        return res.status(404).json({ message: "Servicio del cliente no encontrado" });
      }
      res.json({ message: "Servicio del cliente eliminado" });
    }
    catch (error) {
      res.status(400).json({error: 'error en la eliminación'})
    }
  }

  update = async (req, res) => {
    const result = validatePartialServiceClient(req.body);

    if (!result.success) {
      return res.status(404).json({ error: JSON.parse(result.error.message) });
    }

    const idServ = req.params.idServ;
    const idCli = req.params.idCli;
    const date = req.params.date;

    try {
      const updatedServCli = await this.servicesClientsModel.update({
        cant_horas: result.data.hourAmmount,
      }, {
        where: {
          id_servicio: idServ,
          id_usuario: idCli,
          fecha_servicio: date
        }
      });
      if (updatedServCli == 0) {
        return res.status(404).json({ message: "No se encontró el servicio del cliente" });
      }
      res.json({ message: "Servicio actualizado" });
    }
    catch (error) {
      res.status(400).json({error: 'error en la actualización'})
    }
  }
}
