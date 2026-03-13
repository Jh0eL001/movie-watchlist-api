import express from "express";
import dotenv from 'dotenv';
import { connectDB, disconnectDB } from "./config/db.js";

dotenv.config(); // Aquí ocurre la magia: lee el archivo y llena el objeto process.env
connectDB();
// IMPORT ROUTES
import movieRoutes from "./routes/movieRoutes.js";

const app = express();
// API ROUTES
app.use("/movies", movieRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Watchlist Movie Server running on PORT: ${PORT} babe MY FIRST SERVER LET'S GOO`)
})