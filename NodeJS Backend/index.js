require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');

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

app.get("/", async (req,res)=>{
    const result = await User.find();
    console.log('result =>', result);

    return res.send(result);
})

app.listen(3000, () => console.log('Server running'));