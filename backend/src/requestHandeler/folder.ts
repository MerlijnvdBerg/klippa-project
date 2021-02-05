import {Mysql} from "../mysql";

export class Folder {
    private mysql: Mysql;

    constructor(mysql: Mysql) {
        this.mysql = mysql;
    }

    public postFolder(req: any, res: any) {
        let sql = "INSERT INTO `folder` (`name`) VALUES (?)";
        let values = [req.body.name]

        this.mysql.query({sql, values}, (results: any) => {
            if (results != null) {
                res.sendStatus(200);
            } else {
                res.sendStatus(500);
            }
        })
    }

    public getFolders(req: any, res: any) {
        let pageNumber = req.params.pageNumber || 0;
        let pageCount = req.params.pageCount || 25;

        let sql = "SELECT f.id, f.name, f.date, COUNT(r.folder_id) as 'amount' FROM folder f LEFT join receipt r on f.id = r.folder_id GROUP BY f.id LIMIT " + (pageNumber * pageCount) + ", " + pageCount;
        this.mysql.query(sql, (results: any) => {
            res.send(JSON.stringify(results));
        });
    }

    public getReceiptsByFolder(req: any, res: any) {
        let sql = "SELECT * FROM receipt WHERE folder_id = " + req.query.id;
        this.mysql.query(sql, (results: any) => {
            res.send(JSON.stringify(results));
        });
    }
}
