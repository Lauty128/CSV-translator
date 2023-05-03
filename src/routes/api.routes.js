//---- Dependencies
import express from 'express';

//---- Controllers
import apiController from '../controllers/api.controller.js';

//---- Multer
import upload from '../config/multer.config.js';

//---- Config
const router = express.Router()

//---- Middlewares


//---- Routes
router.post('/create', apiController.createPage)
router.post('/submit', upload.single('File'), apiController.submitPage)

//---- Export
export { router as apiPage }