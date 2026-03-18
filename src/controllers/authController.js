// Por cada endpoint que tenga en mi authRoutes.js
// vamos a crear su funcion correspondiente aca
import { prisma } from "../config/db.js"; // PRIMER ERROR NO AGREGAR .js
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
// ********************************* REGISTER FUNCTION *******************************************//
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
    return res
      .status(400)
      .json({ error: "User already exists with this email." });
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
    },
  });

  const token = generateToken(user.id);

  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        name: name,
        email: email,
      },
      token,
    },
  });
};

// ********************************* LOGIN FUNCTION *******************************************//
const login = async (req, res) => {
  const { email, password } = req.body;
  // revisamos si el user existe
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  // Si el usuario NO existe, devolvemos un res con status de error (400) y un msj
  if (!user) {
    return res.status(400).json({ error: "Invalid email or password." });
  }
  // despues de verificar si existe el usuario vamos a verificar la password
  const isPassword = await bcrypt.compare(password, user.password);

  if (!isPassword) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  // Generate JWT Token vamos a crear una funcion de ayuda para cada vez que necesitemos un JWT (esta en: src\utils\generateToken.js)
  const token = generateToken(user.id);
  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        email: email,
      },
      token,
    },
  });
};

export { register, login };
