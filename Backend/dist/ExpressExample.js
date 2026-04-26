import express from "express";
const app = express();
const port = 4000;
export class ExpressExample {
    constructor() {
        app.listen(port, () => {
            console.log(`server started at locfffalhost:${port}`);
        });
        app.get("/api", (req, res) => {
            res.send(`Hello, world! name: ${req}`);
        });
        app.get("/api2", (req, res) => {
            res.send(`Hello, world! name: ${req.query.name}`);
        });
    }
}
//# sourceMappingURL=ExpressExample.js.map