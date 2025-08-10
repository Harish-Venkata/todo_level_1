import express, { Router } from "express";
import "dotenv/config";
import cors from "cors";
import db from "./utils/db.js";
import router from "./routes/taskRoutes.js";

const app = express();
const port = process.env.PORT || 8001;

app.use(cors());
app.use(express.urlencoded({ extended: true })); // Parse the post request coming from req.body
app.use(express.json()); //Accept the json data from frontend

//connect Database
db();

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
