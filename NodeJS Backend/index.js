require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require('./src/user/index');
const contactRouter = require('./src/contact');

//establish connection to Mongodb
const DB_CONNECT = process.env.DB_CONNECT || "";

mongoose.connect(DB_CONNECT)
.then(()=> 
    console.log('Connected to DB!') 
).catch((error) => {
    console.log(error);
});

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/contact', contactRouter);


app.listen(3000, () => console.log('Server running'));