import {Mysql} from "../mysql";

export class Receipt {
    private mysql: Mysql;

    constructor(mysql: Mysql) {
        this.mysql = mysql;
    }

    public postReceipt(req: any, res: any) {
        let sql = "REPLACE INTO `receipt` (`id`, `name`, `amount`, `folder_id`, `date`) VALUES (?, ?, ?, ?, ?)";
        let values = [req.body.id, req.body.name, req.body.amount, req.body.folder, req.body.date]

        this.mysql.query({sql, values}, (results: any) => {

            if (results != null) {
                if (req.files.files == null) {
                    res.send(JSON.stringify("ok"));
                    return;
                }

                let sql = "REPLACE INTO `images` (`id`, `filename`, `receipt_id`) VALUES ?";
                let values = [];

                for (const file of req.files.files) {
                    values.push([file.id, file.filename, results.insertId]);
                }

                this.mysql.bulkQuery(sql, values, (results: any) => {
                    if (results != null) {
                        res.send(JSON.stringify("ok"));
                    } else {
                        res.sendStatus(500);
                    }
                });

            } else {
                res.sendStatus(500);
            }
        })
    }


    public getReceipts(req: any, res: any) {
        let pageNumber = req.query.pagenr || 0;
        let pageCount = req.query.amount || 25;

        let sql = "SELECT * FROM receipt LIMIT " + (pageNumber * pageCount) + ", " + pageCount;
        this.mysql.query(sql, (results: any) => {

            if (results == null) {
                res.send("{500}")
                return
            }
                res.send(JSON.stringify(results));
        });
    }

    getReceiptImage(req: any, res: any) {
        let sql = "SELECT * FROM images WHERE receipt_id = " + req.query.id;
        this.mysql.query(sql, (results: any) => {
            res.send(JSON.stringify(results));
        });
    }

}
