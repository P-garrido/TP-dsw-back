//importar validadores

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
    const result = req.body
    const newUser = await this.userModel.createUser({ input: result })
    if (newUser) {
      res.status(201).json(newUser)
    }
    else {
      res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    modifyUser = async (req, res) => {
      const { id } = req.params
      const updatedUser = await this.userModel.modifyUser({ id, input: req.body })
      return res.json(updatedUser)
    }
  }
}