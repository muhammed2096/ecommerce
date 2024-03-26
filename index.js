import 'dotenv/config.js'
import express from "express";
import { dbConnection } from "./database/connection.js";
import { allRoutes } from "./src/modules/routes.js";
import { appError } from "./src/utilties/appError.js";
import cors from 'cors'
const app = express()
const port = 3000
app.use(cors())
app.use(express.json())
app.use("/uploads", express.static("uploads"))
dbConnection()



allRoutes(app)

app.get('/', (req, res)=>{
    res.json("Welcome to the E-Commerce App")
})
app.use("*", (req,res,next)=>{
    next(new appError("Url not found :(", 404))
})


app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(err.statusCode).send({message:err.message, stack:err.stack})
})



app.listen(process.env.PORT || port, ()=>{
    console.log(`server is running on port ${port}`);
})