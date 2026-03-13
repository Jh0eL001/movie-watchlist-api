// Por cada endpoint que tenga en mi authRoutes.js
// vamos a crear su funcion correspondiente aca 
import { prisma } from "../config/db.js";// PRIMER ERROR NO AGREGAR .js
import bcrypt from "bcryptjs";

const register = async (req, res) => {
  // to send data with POST we use the variable 'req' inside of it allows us to access a  lot of data, body, headers, params.
  // body is a json that can be send from the frontend to the backend 
  // vamos a desestructurar nuestra DB
  const { name, email, password } = req.body;
  // Vamos a ver si el user ya existe
  const userExists = await prisma.user.findUnique({
    where: { email: email },
  });

  if (userExists) {
    return res.status(400).json({ error: "User already exists with this email." });
  }

  // HASH PASSWORD for security
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // CREATE USER
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    }
  })


  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        name: name,
        email: email,
      }
    }
  })
};


export { register };