import { validateUser, validatePartialUser } from '../schemas/users.js';
import { generateToken } from '../middlewares/token.js';

export class UserController {
  constructor({ userModel }) {
    this.userModel = userModel
  }

  getAllUsers = async (req, res) => {
    const users = await this.userModel.findAll()
    if (users.length > 0) {
      res.json(users)
    }
    else {
      res.status(404).send({ message: 'no users available' })
    }

  }

  getUserById = async (req, res) => {
    const id = req.params
    const user = await this.userModel.findAll({
      where: {
        id_usuario: id
      }
    })
    if (user) {
      res.json(user)
    }
    else {
      res.status(404).send({ message: 'user not found' })
    }
  }

  deleteUserById = async (req, res) => {
    const id = req.params.id
    const user = await this.userModel.destroy({
      where: {
        id_usuario: id
      }
    })
    if (user) {
      res.json(user)
    }
    else {
      res.status(404).send({ message: 'user not found' })
    }
  }

  createUser = async (req, res) => {
    console.log(req.body)
    const result = validateUser(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newUser = await this.userModel.create({
      nombre_usuario: result.data.nombre_usuario,
      clave: result.data.clave,
      email: result.data.email,
      telefono: result.data.telefono,
      nombre: result.data.nombre,
      apellido: result.data.apellido,
      direccion: result.data.direccion,
      tipo_usuario: result.data.tipo_usuario
    })
    res.status(201).json(newUser)
  }

  modifyUser = async (req, res) => {
    const result = validatePartialUser(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedUser = await this.userModel.update(
      {
        nombre_usuario: result.data.nombre_usuario,
        clave: result.data.clave,
        email: result.data.email,
        telefono: result.data.telefono,
        nombre: result.data.nombre,
        apellido: result.data.apellido,
        direccion: result.data.direccion,
        tipo_usuario: result.data.tipo_usuario
      },
      {
        where: {
          id_usuario: id
        }
      })
    return res.json(updatedUser)
  }

  loginUser = async (req, res) => {
    const userName = req.body.nombre_usuario;
    const pass = req.body.clave;


    const user = await this.userModel.findOne({
      where: {
        nombre_usuario: userName,
        clave: pass
      }
    });
    if (user) {
      const payload = {
        userName: userName,
        password: pass
      }
      const token = generateToken(payload);
      res.json({ token });
    }
    else {
      res.status(404).send({ message: 'user not found' });
    }

  }
}

