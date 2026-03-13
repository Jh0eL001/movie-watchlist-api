import express from "express";
import dotenv from 'dotenv';
import { connectDB, disconnectDB } from "./config/db.js";
// IMPORT ROUTES
import movieRoutes from "./routes/movieRoutes.js";

dotenv.config(); // lee el archivo y llena el objeto process.env
connectDB();

const app = express();
// API ROUTES
app.use("/movies", movieRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
	console.log(`Watchlist Movie Server running on PORT: ${PORT} babe MY FIRST SERVER LET'S GOO`)
})

// PLAN DE EMERGENCIA DEL SERVIDOR PARA MORIR CON DIGNIDAD 😎
// Handle unhandled promise rejections (e.g., database conection errors)
// ERRORES DE PROMESAS PUES
process.on("unhandledRejection", (err) => {
	console.error(`Unhandled Rejection: ${err}`);
	server.close(async () => {
		await disconnectDB();
		process.exit(1);
	})
})

// Handle uncaught exceptions
// ERRORES DE CODIGO MY FRIEND
process.on("uncaughtException", async (err) => {
	console.error(`Uncaught Exception ${err}`);
	await disconnectDB();
	process.exit(1);
})

// Graceful shutdown
process.on("SIGTERM", async () => {
	console.log("SIGTERM received, shutting down gracefully.");
	server.close(async () => {
		await disconnectDB();
		process.exit(0);
	})
})