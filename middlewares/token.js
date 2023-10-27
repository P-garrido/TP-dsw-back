import pkg from 'jsonwebtoken';
import { config } from "dotenv";

config();

const jwt = pkg;

const secret = process.env.SECRET;

export const generateToken = (user) => {
  return jwt.sign(user, secret, { expiresIn: '20s' })
}


export const validateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (authHeader) {
    const token = authHeader.split(' ')[1]
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        return res.status(401).json({ message: "Token no válido" });
      }
      else {
        next();
      }
    })
  }
  else {
    return res.status(401).json({ message: "Token no proporcionado" });
  }
}