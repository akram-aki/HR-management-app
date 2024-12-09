import express from "express";
import cors from "cors";
import routes from "./Routes/routes.js";
import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use("/images", express.static(__dirname + "/images"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use("/", routes);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
