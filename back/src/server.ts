import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { prisma } from "@/lib/prisma";
import { AppError } from "@/errors/app-error";

const app = Fastify();

const port = Number(process.env.PORT ?? "3333");

app.register(cors, { origin: "*" });

app.get("/health", async () => {
  return { status: "ok", message: "Hello World" };
});

async function start() {
  try {
    await prisma.$connect();
    console.log("✅ Database successfully connected!");
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error);
    process.exit(1);
  }

  app.listen({ port: port }, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
}

app.setErrorHandler(( error, _request, reply ) => {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({ message: error.message });
  }

  console.error(error);
  return reply.status(500).send({ message: "Internal server error" });
});

start();
