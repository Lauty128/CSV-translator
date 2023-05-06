//---- Dependencies
import express from 'express';
import { homePage, createPage, submitPage, intervalsPage } from '../controllers/pages.controller.js';

//---- Config
const router = express.Router()

//---- Middlewares


//---- Routes
router.get('/', homePage)
router.get('/table', createPage)
router.get("/submit", submitPage)
router.get("/intervals", intervalsPage)

//---- Export
export { router as routerPage }