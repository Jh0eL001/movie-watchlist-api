import { PrismaClient } from "@prisma/client";

// Instanciar: Crear la herramienta (new PrismaClient).
const prisma = new PrismaClient({
  log: 
    process.env.NODE_ENV === "development" 
      ? ["query", "error", "warn"] 
      : ["error"],
})

// Intentar: Abrir el canal de comunicación ($connect).
const connectDB = async () => {
  try {
    await prisma.$connect(); // el $ se usa para funciones o comandos Administrativos (prisma convention)
    console.log("DB connected via Prisma.");
    // Gestionar: Si falla, avisar (catch).
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};


const disconnectDB = async () => {
  await prisma.$disconnect();
};

// Exportar: Compartir la herramienta con el resto de archivos (export).
export { prisma, connectDB, disconnectDB };