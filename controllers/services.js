import { validatePartialService, validateService } from "../schemas/services.js";


export class ServiceController {

  constructor({ serviceModel }) {
    this.serviceModel = serviceModel;
  }

  getAll = async (req, res) => {
    const services = await this.serviceModel.getAll();
    res.json(services);
  }

  getById = async (req, res) => {
    const { id } = req.params;

    const service = await this.serviceModel.getById({ id });
    res.json(service);
  }

  create = async (req, res) => {
    const result = validateService(req.body);
    if (!result.success) {
      return res.status(404).json({ error: JSON.parse(result.error.message) });
    }
    const newService = await this.serviceModel.create({ service: result.data });
    res.status(201).json(newService);
  }

  delete = async (req, res) => {
    const { id } = req.params;
    const result = await this.serviceModel.delete({ id });
    if (result == false) {
      return res.status(404).json({ error: JSON.parse(result.error.message) });
    }
    res.json({ message: "Servicio eliminado" });
  }

  update = async (req, res) => {
    const result = validatePartialService(req.body);
    if (!result.success) {
      return res.status(404).json({ error: JSON.parse(result.error.message) });
    }
    const { id } = req.params;
    const newService = await this.serviceModel.update({ id, serv: result.data });
    return res.json(newService);
  }

}