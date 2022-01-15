import express from 'express';
import path from 'path';
import getFormattedData from './getData.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
const port = process.env.PORT || 3000
const staticFilesDir = 'public'
const parentDir = path.resolve(__dirname, '..')

app.get('/getData', async function (req, res){
    const data = await getFormattedData()
    res.json(data)
})

app.use(express.static(`${parentDir}/${staticFilesDir}/`))

/* final catch-all route to index.html defined last */
app.get('/*', (req, res) => {
    res.sendFile(`${parentDir}/${staticFilesDir}/index.html`);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})