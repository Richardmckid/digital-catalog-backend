import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import mongoose from "mongoose";
import routes from "./routes/router.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ['https://supplier-app-rich.herokuapp.com','supplier-app-rich.herokuapp.com','http://localhost:3000','http://localhost:8080']
}));
app.use(express.json());

app.use('/api/v1/', routes)




try {
    const db = await mongoose.connect(process.env.MONGO_CON_STR, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log(`DB connected to ${db.connection.name}`)
} catch (error) {
    console.log(error);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})