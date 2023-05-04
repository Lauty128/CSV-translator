//---- Dependencies
import fs from 'fs/promises'
import path from 'path';
import * as url from 'url';

//---- Utils
import { formatBody, convert_text_to_array } from '../utils/table.js';

//---- Config
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));


//---- Controllers
const createPage = async (req,res)=>{
    const { body } = req;

    const data = formatBody(body)
    const url = path.join(__dirname, '../download/createdFile.csv')

    let text = '';
    data.forEach((array, index)=>{
        array.forEach((input,index)=>{
            text += `${input}`
            if(index != (array.length - 1)) text += ','
        })
        if(index < (data.length-1)) text += '\n'
    }) 

    try{
        await fs.writeFile(url, text, {  flag:"w" })
        res.download(url)
    }
    catch(error){
        return res.status(500).json({
            message:"Ocurrio un error mientras se generaba el archivo",
            error
        })
    }
}

const submitPage = async (req,res)=>{
    const url = path.join(__dirname, '../download/fileToRead.csv')
    // This file is stored through Multer
    try{
        const text_read = await fs.readFile(url, { encoding:'utf-8' })
        const text = convert_text_to_array(text_read);
        // Reads the file and stores its content in a constant

        await fs.unlink(url)
        // Removes the file, becouse the content has been obtained
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
}

export default { submitPage, createPage }