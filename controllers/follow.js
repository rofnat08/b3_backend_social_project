import Follow from '../models/follows.js';
import User from '../models/users.js';
import { ensureAuth } from '../middlewares/auth.js';


// Método de prueba del controlador follow
export const testFollow = (req, res) => {
  return res.status(200).send({
    message: "Mensaje enviado desde el controlador de Follow"
  });
};