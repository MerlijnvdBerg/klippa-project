import {MysqlError} from "mysql";

const mysql = require('mysql');

const env = process.env;

export class Mysql {
    constructor() {
        this.connect()
    }

    private connection = mysql.createConnection({
        host: env.db_host,
        user: env.db_user,
        password: env.db_password,
        database: env.db_database,
    });

    public query(sql: string | object, _callback: any) {

        this.connection.query(sql, (error: MysqlError, results: any) => {
            if (error) throw error;
            if (results != null) _callback(results);
        });
    }

    public bulkQuery(sql: string, values: object, _callback: any) {

        this.connection.query(sql, [values], (error: MysqlError, results: any) => {
            if (error) throw error;
            if (results != null) _callback(results);
        });
    }

    public connect() {
        console.log("Mysql connection started!");
        this.connection.connect();
    }

    public closeConnection() {
        this.connection.end();
    }
}
