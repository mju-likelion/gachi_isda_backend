import { Router } from 'express';
import * as dictionaryController from '../controller/dictionary.js';

const router = Router();

//GET /words?keword=keyword
router.get('/words', dictionaryController.getWords);

export default router;
