//---- Dependencies
import express from 'express';
import { formatBody } from '../utils/table.js';
import fs from 'fs/promises'

import path from 'path';
import * as url from 'url';

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
    data.forEach(array=>{
        array.forEach((input,index)=>{
            text += `${input}`
            if(index != (array.length - 1)) text += ','
        })
        text += '\n'
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

//---- Export
export { router as apiPage }