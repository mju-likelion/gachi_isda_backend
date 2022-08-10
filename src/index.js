import express from "express";
import api from "./api/index.js";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const port = 3300;

const { sequelize } = require("../models");
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(morgan("tiny"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api", api);

app.listen(port, () => {
  console.log(`서버실행 => http://localhost:${port}`);
});
