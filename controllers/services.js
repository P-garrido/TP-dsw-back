import { validatePartialService, validateService } from "../schemas/services.js";


export class ServicesController {

  constructor({ serviceModel }) {
    this.serviceModel = serviceModel;
  }

  getAll = async (req, res) => {
    try {
      const services = await this.serviceModel.findAll();
      res.json(services);
    }
    catch (e) {
      console.log(e);
    }
  }

  getById = async (req, res) => {
    const idServ = req.params.id;
    try {
      const service = await this.serviceModel.findAll({
        where: {
          id_servicio: idServ
        }
      });
      res.json(service);

    }
    catch (e) {
      console.log(e);
    }

  }

  create = async (req, res) => {
    const result = validateService(req.body);
    if (!result.success) {
      return res.status(404).json({ error: JSON.parse(result.error.message) });
    }
    try {
      const newService = await this.serviceModel.create({ desc_servicio: result.data.description, precio_por_hora: result.data.hourValue });
      console.log(newService.id_servicio);
      res.status(201).json(newService);
    }
    catch (e) {
      console.log(e);
    }


  }

  delete = async (req, res) => {
    const idServ = req.params.id;
    try {
      const result = await this.serviceModel.destroy({
        where: {
          id_servicio: idServ
        }
      });
      if (result == 0) {
        return res.status(404).json({ message: "No se encontró el servicio" });
      }
      res.json({ message: "Servicio eliminado" });
    }
    catch (e) {
      console.log(e);
    }

  }

  update = async (req, res) => {
    const result = validatePartialService(req.body);
    if (!result.success) {
      return res.status(404).json({ error: JSON.parse(result.error.message) });
    }

    const idServ = req.params.id;
    try {
      const updatedService = await this.serviceModel.update(
        { desc_servicio: result.data.description, precio_por_hora: result.data.hourValue },
        {
          where: {
            id_servicio: idServ
          }
        });
      if (updatedService == 0) {
        return res.status(404).json({ message: "No se encontró el servicio" });
      }
      res.json({ message: "Servicio actualizado" });
    }
    catch (e) {
      console.log(e);
    }

  }

}