//---- Dependencies
import express from 'express';
import { homePage, createPage, submitPage } from '../controllers/pages.controller.js';

//---- Config
const router = express.Router()

//---- Middlewares


//---- Routes
router.get('/', homePage)
router.get('/create', createPage)
router.get("/submit", submitPage)

//---- Export
export { router as routerPage }