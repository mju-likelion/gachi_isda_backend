import { Router } from "express";
import post from "./post";
import dictionary from "./dictionary";

const api = Router();

api.use("/post", post); //korai톡
api.use("/dictionary", dictionary); //외래어 사전

export default api;
