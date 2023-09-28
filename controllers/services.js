import { validatePartialService, validateService } from "../schemas/services.js";


export class ServicesController {

  constructor({ servicesModel }) {
    this.servicesModel = servicesModel;
  }

  getAll = async (req, res) => {
    const services = await this.servicesModel.getAll();
    res.json(services);
  }

  getById = async (req, res) => {
    const { id } = req.params;

    const service = await this.servicesModel.getById({ id });
    res.json(service);
  }

  create = async (req, res) => {
    const result = validateService(req.body);
    if (!result.success) {
      return res.status(404).json({ error: JSON.parse(result.error.message) });
    }
    const newService = await this.servicesModel.create({ service: result.data });
    res.status(201).json(newService);
  }

  delete = async (req, res) => {
    const { id } = req.params;
    const result = await this.servicesModel.delete({ id });
    if (result == false) {
      return res.status(404).json({ message: "No se encontró el producto" });
    }
    res.json({ message: "Servicio eliminado" });
  }

  update = async (req, res) => {
    const result = validatePartialService(req.body);
    if (!result.success) {
      return res.status(404).json({ error: JSON.parse(result.error.message) });
    }
    const { id } = req.params;
    const newService = await this.servicesModel.update({ id, serv: result.data });
    return res.json(newService);
  }

}