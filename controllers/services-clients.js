import { validatePartialServiceClient, validateServiceClient } from "../schemas/services-clients.js";


export class ServicesClientsController {

  constructor({ servicesClientsModel }) {
    this.servicesClientsModel = servicesClientsModel;
  }

  getAll = async (req, res) => {
    const servClis = await this.servicesClientsModel.getAll();
    res.json(servClis);
  }

  getById = async (req, res) => {
    const idServ = req.params.idServ;
    const idCli = req.params.idCli;
    const date = req.params.date;
    const servCli = await this.servicesClientsModel.getById({ idServ, idCli, date });
    res.json(servCli);
  }

  create = async (req, res) => {
    const result = validateServiceClient(req.body);
    if (!result.success) {
      return res.status(404).json({ error: JSON.parse(result.error.message) });
    }

    const newServCli = await this.servicesClientsModel.create({ servCli: result.data });
    res.status(201).json(newServCli);
  }

  delete = async (req, res) => {
    const idServ = req.params.idServ;
    const idCli = req.params.idCli;
    const date = req.params.date;
    const result = await this.servicesClientsModel.delete({ idCli, idServ, date });
    if (!result) {
      return res.status(404).json({ message: "No se pudo eliminar el servicio del cliente" });
    }
    res.json("Servicio del cliente eliminado");
  }

  update = async (req, res) => {
    const result = validatePartialServiceClient(req.body);
    if (!result.success) {
      return res.status(404).json({ error: JSON.parse(result.error.message) });
    }
    const idServ = req.params.idServ;
    const idCli = req.params.idCli;
    const date = req.params.date;
    const updatedServCli = await this.servicesClientsModel.update({ idServ, idCli, newHourAmmount: result.data, date });
    return res.json(updatedServCli);
  }
}