import { branchSchema } from "../schemas/branches.js";


export class BranchesController {

  constructor({ branchModel }) {
    this.model = branchModel;
  }

  getAll = async (req, res) => {
    try {
      const services = await this.model.findAll();
      res.status(200).json(services);
    }
    catch (e) {
      res.status(400).json({ error: 'Error al buscar'});
    }
  }

  getById = async (req, res) => {
    const id = req.params.id;
    try {
      const instance = await this.model.findOne({
        where: {
          id_sucursal: id
        }
      });
      res.status(200).json(instance);
    }
    catch (e) {
      res.status(400).json({ error: 'Error al buscar'});
    }
  }

  create = async (req, res) => {
    const result = branchSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: JSON.parse(result.error.message)
      });
    }

    try {
      const instance = await this.model.create({
        nombre: result.data.nombre,
        direccion: result.data.direccion
      });

      res.status(201).json(instance);
    }
    catch (error) {
      res.status(400).json({ error: 'Error al crear'});
    }
  }

  delete = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await this.model.destroy({
        where: {
          id_sucursal: id
        }
      });
      if (result == 0) {
        return res.status(404).json();
      }

      res.status(204).json();
    }
    catch (e) {
      res.status(400).json({ error: 'Error al eliminar'});
    }
  }

  update = async (req, res) => {
    const result = branchSchema.partial().safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        error: JSON.parse(result.error.message)
      });
    }

    const id = req.params.id;
    try {
      const result = await this.model.update(req.body, {where: { id_sucursal: id }});

      if (result == 0) {
        res.status(404).json();
      }

      const instance = await this.model.findOne({where: { id_sucursal: id }});
      res.status(200).json(instance);
    }
    catch (error) {
      res.status(400).json({ error: 'Error al actualizar'});
    }

  }

}