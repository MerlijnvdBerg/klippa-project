import {response} from "express";

const fs = require('fs').promises;
const axios = require('axios')

const env = process.env;

export class Klippa {

    private klippaApiKey = env.api_key;
    private klippaApiUrl = env.api_url;
    // @ts-ignore
    private host = env.host + ":" + env.port
    private filePath = env.fileLocation;
    private jsonPath = env.jsonLocation;

    constructor() {
    }


    export(req: any, res: any) {
        let file = JSON.parse(req.body.files);
        this.checkIfDataExists(file, (response: any, path: string) => {
            if (response == null) {
                let filePath = __dirname + "/../" + this.filePath + "/" + file.filename
                fs.readFile(filePath, {encoding: 'base64'}).then((base64: string) => {
                    let data = {filename: file.filename, filePath: path, base64: base64};
                    this.sendRequest(req, res, data, (data: any) => {
                        res.send({data: data, filename: path})
                    })
                }).catch((error: any) => {
                    res.send({error: "file not found",})
                })
            } else {
                res.send({data: response.data, filename: path})
            }
        })
    }

    async sendRequest(req: any, res: any, file: any, __callback: any) {
        const apiKey = req.body.apiKey || this.klippaApiKey;
        const template = req.body.template || "";
        const pdf_text_extraction = req.body.pdf_text_extraction || "fast";

        const url = this.klippaApiUrl + "parseDocument";
        axios({
            method: 'post',
            url: url,
            headers: {
                'X-Auth-Key': apiKey,
                "Content-Type": "application/json",
            },
            data: {
                document: file.base64,
                template: template,
                pdf_text_extraction: pdf_text_extraction,
            },
            json: true

        }).then((response: any) => {
            let data = this.processData(response.data.data);
            this.saveData(data, file.filename, () => {
                __callback(data);
            });
        }).catch((error: any) => {
            if (error.hasOwnProperty("error"))
                res.send(error.error)
        });
    }

    processData(data: any) {
        let fields = data
        for (let field in fields) {
            if (fields[field] === null || fields[field] === undefined || fields[field] === "") {
                delete fields[field];
            }
        }
        return fields;
    }

    saveData(data: any, filename: string, _callback: any) {
        filename = "./"+this.jsonPath+"/" + this.getJsonName(filename);
        fs.appendFile(filename, JSON.stringify(data)).then(() => {
            _callback(filename);
        }).catch((error: any) => {
            console.log(error);
        })
    }

    getJsonName(filename: string) {
        return filename.split('.').slice(0, -1).join('.') + ".json"
    }

    checkIfDataExists(file: any, __callback: any) {
        let path = this.host + "/"+this.jsonPath+"/" + encodeURIComponent(this.getJsonName(file.filename));
        axios.get(path).then((response: any) => {
            __callback(response, path);
        }).catch((error: any) => {
            if (error.hasOwnProperty("response"))
                __callback(null, path);
        })
    }


    getTemplates(req: any, res: any) {
        axios({
            method: 'get',
            url: this.klippaApiUrl + "templates",
            headers: {
                'X-Auth-Key': this.klippaApiKey,
                "Content-Type": "application/json",
            },
            data: {},
        }).then((response: any) => {
            res.send(response.data);
        }).catch((error: any) => {
            console.log(error)
        })
    }
}

