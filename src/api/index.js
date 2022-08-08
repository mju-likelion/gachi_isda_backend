import { Router } from 'express';
import korail from './router/korail.js';

const api = Router();

api.use('/korail', korail); //korail톡

export default api;
