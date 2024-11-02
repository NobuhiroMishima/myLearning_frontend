import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import env from 'dotenv'
import apiRoutes from "./api-routes/index.mjs"
import "./helpers/db.mjs"
env.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('dist'));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'dist/server/uploads')));

app.use('/api', apiRoutes);

app.get('*', function(req, res) {
    const indexHTML = path.resolve('dist', 'index.html')
    res.sendFile(indexHTML)
})

app.use(function(req, res) {
    res.status(404).json({msg: 'Page Not Found'})
})

app.use(function(err, req, res, next){
    if(res.headersSent){
        return next(err);
    }
    res.status(500).json({msg: '不正なエラーが発生しました。'})
})

app.listen(port, () => {
    console.log(`Server Start: http://localhost:${port}`);
});