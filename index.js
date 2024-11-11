// Importar dependencias (configurar en package.json)
import express from "express";
import connection from "./database/connection.js";
import cors from "cors";
import bodyParser from "body-parser";
import UserRoutes from "./routes/users.js";
import PublicationRoutes from "./routes/publications.js";
import FollowRoutes from "./routes/follows.js";

//Mensaje de bienvenida a la base de datos
console.log("Api en ejecución");

//Usar la conexión a la base de Datos
connection();

//Crear el servidor node
const app = express();
const puerto = process.env.PORT || 3900;

//Configurar cors para que acepte peticiones del frontend (hacer peticiones al back desde el front)
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

// Decodificar los datos desde los formularios para convertirlos en objetos de JavaScript
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar rutas del aplicativo (módulos)
app.use('/api/user', UserRoutes);
app.use('/api/publication', PublicationRoutes);
app.use('/api/follow', FollowRoutes);

//Configurar el servidor en node
app.listen(puerto, () => { //escucha al servidor y el puerto
    console.log("Servidor de Node ejecutandose en el puerto", puerto);
});

export default app;