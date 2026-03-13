import express from "express";

// vamos a crear un ROUTER
//Es una mini-aplicación que solo sabe manejar rutas. Sirve para que tu código sea mantenible, escalable y modular.
const router = express.Router();

router.get('/', (req, res) => {
  res.json( {msg: "HELLO UNIVERSE"});
})

export default router;