import express from "express";
import { register } from "../controllers/authController.js";
// vamos a crear un ROUTER
//Es una mini-aplicación que solo sabe manejar rutas. Sirve para que tu código sea mantenible, escalable y modular.
const router = express.Router();

//Register endpoint (para registrar un usuario)
// aca solo tenemos la definicion de cada route y la logica ira en authRoutes.js
router.post("/register", register); //la logica ira en la funcion 'register' que estara en el archivo authRoutes.js

export default router; // cuando exportamos con default, podemos renombrar la variable como necesitemos.