import { Router } from "express";
import korail from "./korail";
import words from "./words";
import DBstore from "./DBstore";

const api = Router();

api.use("/DBstore", DBstore); //api 데이터 저장
api.use("/korail", korail); //korai톡
api.use("/words", words); //외래어 사전

export default api;
