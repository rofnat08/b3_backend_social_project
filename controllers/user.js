import User from '../models/users.js';
import Follow from '../models/follows.js';
import Publication from '../models/publications.js';
import bcrypt from 'bcrypt';
import { createToken } from '../services/jwt.js';
import { followThisUser, followUserIds } from '../services/followServices.js';

//Metodo de prueba del controlador user
export const testUser = (req, res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde el controlador de usuarios"
    });
};

// Método Registro de Usuarios
export const register = async (req, res) => {
    try {
      // Obtener los datos de la petición
      let params = req.body;
  
      // Validar los datos obtenidos (que los datos obligatorios existan)
      if(!params.name || !params.last_name || !params.nick || !params.email || !params.password) {
        return res.status(400).json({
          status: "error",
          message: "Faltan datos por enviar"
        });
      }
  
      // Crear el objeto del usuario con los datos que validamos
      let user_to_save = new User(params);
  
      // Control de usuarios duplicados
      const existingUser = await User.findOne({
        $or: [
          { email: user_to_save.email.toLowerCase() },
          { nick: user_to_save.nick.toLowerCase() }
        ]
      });
  
      // Validar el existingUser
      if (existingUser) {
        return res.status(409).send({
          status: "error",
          message: "¡El usuario ya existe en la BD!"
        });
      }
  
      // Cifrar la contraseña
      // Genera los saltos para encriptar
      const salt = await bcrypt.genSalt(10);
  
      // Encriptar la contraseña y guardarla en hashedPassword
      const hashedPassword = await bcrypt.hash(user_to_save.password, salt);
  
      // Asignar la contraseña encriptada al objeto del usauario
      user_to_save.password = hashedPassword;
  
      // Guardar el usuario en la base de datos
      await user_to_save.save();
  
      // Devolver el usuario registrado
      return res.status(201).json({
        status: "created",
        message: "Registro de usuario exitoso",
        user_to_save
      });
  
    } catch (error) {
      console.log("Error en el registro de usuario: ", error);
      // Devolver mensaje de error
      return res.status(500).send({
        status: "error",
        message: "Error en el registro de usuario"
      });
    }
};
  