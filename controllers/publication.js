// Método de prueba del controlador publication
export const testPublication = (req, res) => {
  return res.status(200).send({
    message: "Mensaje enviado desde el controlador de Publication"
  });
};