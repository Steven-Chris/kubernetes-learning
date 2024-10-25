import "./config/env.js"; // Import env config first
import Fastify from "fastify";
const fastify = Fastify({ logger: true });
import sequelize from "../../shared/db/database.js";
import Request_log from "../../shared/db/models/Requests.js";

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

//endpoint will be alpha/count but alpha/ will be stripped by K8s
fastify.get("/count", async (request, res) => {
  try {
    await Request_log.create({
      api: "alpha",
      request: JSON.stringify({
        method: request.method,
        url: request.url,
        ip: request.ip,
      }),
    });
    const count = await Request_log.count({
      where: {
        api: "alpha",
      },
    });
    res.send({ api: "alpha", count });
  } catch (err) {
    console.log("ERROR:", err);
    fastify.log.error(error);
    process.exit(1);
  }
});
