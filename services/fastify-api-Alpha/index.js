import "./config/env.js"; // Import env config first
import Fastify from "fastify";
const fastify = Fastify({ logger: true });
import sequelize from "../../shared/db/database.js";

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");
    fastify.listen({ port: 3001, host: "0.0.0.0" });
    await sequelize.sync();
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
})();

// Liveness probe
fastify.get("/", (request, reply) => {
  reply.send({ api: "Alhpa", status: "OK" });
});
