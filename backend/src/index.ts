const express = require('express');
const cors = require('cors')
const fs = require('fs');
require('dotenv').config();


import {Receipt} from "./requestHandeler/receipt";
import {Folder} from "./requestHandeler/folder";
import {Klippa} from "./requestHandeler/klippa";
import {Mysql} from "./mysql";
import {tempUpload, upload} from "./multer";

const mysql = new Mysql();

const receipt = new Receipt(mysql);
const folder = new Folder(mysql);
const klippa = new Klippa();

const app = express();
const env = process.env;

app.use('/' + env.fileLocation, express.static(env.fileLocation))
app.use('/' + env.tempFileLocation, express.static(env.tempFileLocation))
app.use('/' + env.jsonLocation, express.static(env.jsonLocation))

app.use(cors());


// Save file that are send to localhost:3000/file/temp
app.post('/file/temp', tempUpload.single('fileKey'), (req: any, res: any) => {
    const host = req.headers.host;
    let url = "http://" + host + "/" + env.tempFileLocation + "/" + encodeURI(req.file.filename)
    res.send({url: url, filename: req.file.filename});
})


// Save all the data in the database.
const uploadMiddleware = upload.fields([{name: 'file'}, {name: 'files'}])
app.post('/receipt', uploadMiddleware, (req: any, res: any) => {
    receipt.postReceipt(req, res);
})

app.get('/receipt/all', (req: any, res: any) => {
    receipt.getReceipts(req, res);
})

app.get('/receipt/image', (req: any, res: any) => {
    receipt.getReceiptImage(req, res);
})

app.get('/receipt/:id', (req: any, res: any) => {
    res.send('hello world')
})


// Save all the data in the database.
app.post('/folder', upload.none(), (req: any, res: any) => {
    folder.postFolder(req, res);
})

app.get('/folder/all', (req: any, res: any) => {
    folder.getFolders(req, res);
})

app.get('/folder/receipts', (req: any, res: any) => {
    folder.getReceiptsByFolder(req, res);
})

app.get('/folder/:id', (req: any, res: any) => {
    res.send('hello world')
})


app.post('/klippa/export', upload.none(), (req: any, res: any) => {
    klippa.export(req, res);
})

app.get('/klippa/templates', upload.none(), (req: any, res: any) => {
    klippa.getTemplates(req, res);
})


app.post('/', (req: any, res: any) => {
    let restonseData = []
    if (res.hasOwnProperty("data"))
        restonseData[1] = {data: res.data}
    if (res.hasOwnProperty("error"))
        restonseData[2] = {data: res.error}

    let reqData = []
    if (req.hasOwnProperty("data"))
        reqData[1] = {data: req.data}
    if (req.hasOwnProperty("error"))
        reqData[2] = {data: req.error}
    res.send(JSON.stringify({response: {massage: "do we get this", data: {restonseData, reqData}, test: req.body}}))

})

// Startup de server
app.listen(env.port, () => {
    console.log(`Backend app listening at ${env.host}:${env.port}`)
})
