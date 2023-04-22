//------ Dependencies
    import express from 'express';
    import morgan from "morgan";
    //import cors from 'cors'
    import path from 'path';
    import * as url from 'url';

//------ Database
//import { sequelize } from './src/config/sequelize.js';

//------ Config
    const app = express()
    const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
    const PORT = process.env.PORT || 4000

//------ Middlewares
    // app.use(cors({ origin:true }))
    app.use(morgan('dev'));
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(express.static(path.join(__dirname, 'src/public')))


//------ Routes
    app.get('/', (req,res)=> res.send("HOME"))
    app.get('/api', (req,res)=> res.send("API"))

//------ Listen
    app.listen(PORT, ()=>{
    console.log('Server on in port ' + PORT);
    })
