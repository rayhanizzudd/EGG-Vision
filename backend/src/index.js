import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import users_routes from "../routes/users_routes.js"
import activity_routes from "../routes/activity_routes.js"
import calibration_routes from "../routes/calibration_routes.js"

import cookieParser from "cookie-parser"
dotenv.config();

const app = express();

app.use(cookieParser())
app.use(cors({credentials: true, origin: 'http://localhost:5173'}))
app.use(express.json())
app.use(users_routes)
app.use(activity_routes)
app.use(calibration_routes)


app.listen(process.env.APP_PORT, ()=> {
    console.log(`runnn di port ${process.env.APP_PORT}`)
})