import express from "express";
import viewEngine from './config/viewEngine'
import initRouter from './route/web'
import connect from './config/connectDB'
require('dotenv').config()
let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
viewEngine(app)
initRouter(app)
connect()
let port = process.env.PORT || 8888
app.listen(port, () => {
    console.log(" Server chay tren cong " + port);
})