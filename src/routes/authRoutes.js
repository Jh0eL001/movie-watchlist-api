import express from "express";
import { register, login } from "../controllers/authController.js";
// vamos a crear un ROUTER
//Es una mini-aplicación que solo sabe manejar rutas. Sirve para que tu código sea mantenible, escalable y modular.
const router = express.Router();

//Register endpoint (para registrar un usuario)
// aca solo tenemos la definicion de cada route y la logica ira en authController.js
router.post("/register", register); //la logica ira en la funcion 'register' que estara en el archivo authRoutes.js

router.post("/login", login);

export default router; // cuando exportamos con default, podemos renombrar la variable como necesitemos.
