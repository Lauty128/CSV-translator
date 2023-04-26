//------ Dependencies
    import express from 'express';
    import morgan from "morgan";
    import expressEjsLayouts from 'express-ejs-layouts';
    import path from 'path';
    import * as url from 'url';

//------ Database
//import { sequelize } from './src/config/sequelize.js';

//------ Config
    const app = express()
    const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
    const PORT = process.env.PORT || 4000

//------ Template Engine
    app.set('view engine', 'ejs');
    app.set('views', './src/views')

//------ Middlewares
    app.use(morgan('dev'));
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(expressEjsLayouts)
    app.use(express.static(path.join(__dirname, 'src/public')))


//------ Routes
    app.get('/', (req,res)=> res.render('pages/index', { head_title:"CSV Translator" }))
    app.get('/api', (req,res)=> res.send("API"))

//------ Listen
    app.listen(PORT, ()=>{
        console.log('Server on in port ' + PORT);
    })
