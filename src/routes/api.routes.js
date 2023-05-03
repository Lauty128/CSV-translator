//---- Dependencies
import express from 'express';
import fs from 'fs/promises'
import path, { join } from 'path';
import * as url from 'url';

//---- Utils
import upload from '../config/multer.config.js';
import { formatBody, convert_text_to_array } from '../utils/table.js';

//---- Config
const router = express.Router()
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

//---- Middlewares


//---- Routes
router.post('/create', async (req,res)=>{
    const { body } = req;

    const data = formatBody(body)
    const url = path.join(__dirname, '../download/text.csv')

    let text = '';
    data.forEach((array, index)=>{
        array.forEach((input,index)=>{
            text += `${input}`
            if(index != (array.length - 1)) text += ','
        })
        if(index < (data.length-1)) text += '\n'
    }) 

    try{
        await fs.writeFile(url, text, {  flag:"as" })
        res.download(url)
        await fs.unlink(url)
    }
    catch(error){
        return res.status(500).json({
            message:"Ocurrio un error mientras se generaba el archivo",
            error
        })
    }
})

router.post('/submit', upload.single('File') ,async (req,res)=>{
    const url = path.join(__dirname, '../download/fileToRead.csv')
    try{
        const text_read = await fs.readFile(url, { encoding:'utf-8' })
        const text = convert_text_to_array(text_read);
        await fs.unlink(url)
        res.status(200).json({
            data:text,
            message:"Archivo leido con exito",
            status:200
        })
    }
    catch(error){
        res.status(500).json({
            error,
            message:"Ocurrio un error mientras se leia el archivo",
            status:500
        })
    }
})

//---- Export
export { router as apiPage }