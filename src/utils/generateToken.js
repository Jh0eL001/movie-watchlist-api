import jwt from "jsonwebtoken";

export const generateToken = (userId) => {
  // para generar nuestra palabra secreta random usamos cmd: openssl rand -base64 32 y la ponemos en ENV
  const payload = { id: userId };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

  return token;
};
