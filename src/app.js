import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";

import gestorRoutes from "./routes/gestor.route.js";
import projectRoutes from "./routes/project.route.js";
import gestorProjectRoutes from "./routes/gestorProject.route.js";
import userRoutes from "./routes/user.route.js";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello API prisma" });
});

app.get("/token", (req, res) => {
  const user = { id: 1, name: "maria" };
  const secret = "$2a$12$V9TcJzy49ylH16DAgaOo.uIPeGAiXC0v7Tf2kAjJ4GSt//ALyBSB6";
  const token = jwt.sign(user, secret);
  res.send(token);
});

app.use(express.json());
app.use("/gestor", gestorRoutes);
app.use("/project", projectRoutes);
app.use("/gestor-project", gestorProjectRoutes);
app.use("/user", userRoutes);

export default app;
