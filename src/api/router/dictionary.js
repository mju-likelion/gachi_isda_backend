import { Router } from "express";
import * as dictionaryController from "../controller/dictionary.js";

const router = Router();

//GET /words
router.get("/words", dictionaryController.getWords);

//GET /searchWord?keyword=:keyword
router.get("/searchWord", dictionaryController.getWordById);

export default router;
