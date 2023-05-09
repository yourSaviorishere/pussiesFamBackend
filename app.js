const express = require('express')
const mongoose = require("mongoose");
const logger = require('logger');
const cors = require("cors");

const { request } = require('express');
const app = express()
require('dotenv/config')


const api=process.env.API_URL

const dataModel = mongoose.Schema({
    Title: String,
    VideoUrl: String,
    Details: String
})

const productSchema = mongoose.Schema({
    Title: {
        type: String,
        // required: true
    },
    VideoUrl: {
        type: String,
        // required: true
    },
    Description: {
        type: String,
        // required: true
    },
    Thumbnail: { //image base64
        type: String,
        // required: true
    }
});

const Product = mongoose.model('video_info',productSchema)
app.use(express.json());
app.use(cors());
// app.options('*', cors());

app.get('/videos',async (req,res)=>{
    // res.send("hello");
    const list = await Product.find();
    res.send(list)
    
})

app.post('/videos',(req,res)=>{
    // const data=req.body
    const newData = new Product({
        Title: req.body.Title,
        VideoUrl: req.body.VideoUrl,
        Description: req.body.Description,
        Thumbnail: req.body.Thumbnail
    })
    newData.save()
    .then(createdData => {
        res.status(201).json(createdData)
    })
    .catch(err=>{
        res.status(500).json({
            error: err,
            success: false
        })
    })
    // res.send(newData);
})

mongoose.connect(api,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    dbName: 'ExclusivePussies'
})
.then(()=> {
    console.log("mongodb connected")
})
.catch(err=> {
    console.log(err)
})

app.listen(3000,()=>{
    console.log("server 3000")
})