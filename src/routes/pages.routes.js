//---- Dependencies
import express from 'express';
import { homePage, createPage } from '../controllers/pages.controller.js';

//---- Config
const router = express.Router()

//---- Middlewares


//---- Routes
router.get('/', homePage)
router.get('/create', createPage)

//---- Export
export { router as routerPage }