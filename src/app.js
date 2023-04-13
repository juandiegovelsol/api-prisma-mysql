import express from "express";
import gestorRoutes from "./routes/gestor.route.js";
import projectRoutes from "./routes/project.route.js";
import gestorProjectRoutes from "./routes/gestorProject.route.js";
const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.json({ message: "Hello API prisma" });
});

app.use(express.json());

app.use("/gestor", gestorRoutes);

app.use("/project", projectRoutes);

app.use("/gestor-project", gestorProjectRoutes);

app.listen(PORT, () => {
  console.log("Initialized server...");
});
