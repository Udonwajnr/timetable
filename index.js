const express = require("express")
const app = express();
const dotenv = require('dotenv');
const colors = require('colors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port=process.env.PORT||3000

app.use("/api",require("./route/userRoute"))
app.use("/api/course",require("./route/courseRoute"))
app.use('/api/timetables', require("./route/timetableRoute"));

app.listen(port,()=>{
    console.log(`I am back ${port}` )
})

connectDB()