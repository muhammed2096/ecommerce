import 'dotenv/config.js'
import express from "express";
import { dbConnection } from "./database/connection.js";
import { allRoutes } from "./src/modules/routes.js";
import { appError } from "./src/utilties/appError.js";
import cors from 'cors'
import { createOnlineOrder } from './src/modules/order/controller/order.controller.js';
const app = express()
const port = 3000
app.post('/webhook', express.raw({type: 'application/json'}), createOnlineOrder);
app.use(cors())
app.use(express.json())
app.use("/uploads", express.static("uploads"))

  
  app.listen(4242, () => console.log('Running on port 4242'));
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