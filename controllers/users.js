import {validateUser, validatePartialUser} from '../schemas/users.js';

export class UserController {
  constructor({ userModel }) {
    this.userModel = userModel
  }

  getAllUsers = async (req, res) => {
    const users = await this.userModel.getAllUsers()
    if (users.length > 0) {
      res.json(users)
    }
    else {
      res.status(404).send({ message: 'no users available' })
    }

  }

  getUserById = async (req, res) => {
    const id = req.params
    const user = await this.userModel.getUserById(id)
    if (user) {
      res.json(user)
    }
    else {
      res.status(404).send({ message: 'user not found' })
    }
  }

  deleteUserById = async (req, res) => {
    const id = req.params
    const user = await this.userModel.deleteUserById(id)
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
    
    if (!result.success){
      return res.status(400).json({error: JSON.parse(result.error.message)})
    }

    const newUser = await this.userModel.createUser({ input: result.data })
    res.status(201).json(newUser)
  }

    modifyUser = async (req, res) => {
      const result = validatePartialUser(req.body)
      if (!result.success){
        return res.status(400).json({error: JSON.parse(result.error.message)})
      }
      const {id} = req.params
      const updatedUser = await this.userModel.modifyUser({ id, input: result.data })
      return res.json(updatedUser)
    }
}

