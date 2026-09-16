import { env } from "@/env";
import { AppError } from "@/errors/app-error";
import { prisma } from "@/lib/prisma";
import { processRoutes } from "@/routes/process-routes";
import { stageRoutes } from "@/routes/stage-routes";
import cors from "@fastify/cors";
import Fastify from "fastify";
import { ZodError } from "zod";

const app = Fastify();

const port = Number(env.PORT);

app.register(cors, { origin: "*" });

app.get("/health", async () => {
  return { status: "ok", message: "Hello World" };
});

app.register(processRoutes);
app.register(stageRoutes);

async function start() {
  try {
    await prisma.$connect();
    console.log("✅ Database successfully connected!");
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error);
    process.exit(1);
  }

  app.listen({ port: port }, (error) => {
    if (error) {
      console.error("❌ Failed to start server:", error.message);
      process.exit(1);
    }

    console.log(`🚀 Server running on http://localhost:${port}`);
  });
}

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error", issues: error.issues });
  }

  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({ message: error.message });
  }

  console.error(error);
  return reply.status(500).send({ message: "Internal server error" });
});

start();
