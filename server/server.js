// const express=require("express")
// const mongoose=require("mongoose")
// const userController=require("./routes/user")
// const dotenv = require('dotenv');
// const cors=require("cors")

// const app=express()
// dotenv.config();
// app.use(cors())
// app.use(express.urlencoded({ extended: false }))
// app.use(express.json())




// mongoose.connect('mongodb://localhost/usersdb',
// (data)=>{
//     console.log("connected to DB")
// })



// app.use("/user",userController)


// app.listen(3008,()=>{
//     console.log("server started")
// })
const express = require('express');
const mongoose = require('mongoose');
const userModel = require('./model/user');
const contentModel=require('./model/contentmodel')
const {checkExistingUser, generatePasswordHash} = require("./utility");
const jwt = require('jsonwebtoken');
const multer = require("multer")();
const bcrypt = require("bcryptjs");
const salt=10;
const cors = require('cors')
const app = express();
require('dotenv').config();
app.use(multer.array());

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));

app.listen(3002,(err)=>{
    if(!err) {
        console.log("Server started at  port 3002")
    } else {
        console.log(err);
    }
});
mongoose.connect('mongodb://localhost/usersdb',
(data)=>{
    console.log("connected to DB")
})

app.post("/register", async (req, res)=> {
    if(await checkExistingUser(req.body.username)) {
        res.status(400).send("email exist. Please try with different email");
    } else {
        generatePasswordHash(req.body.password).then((passwordHash)=> {
            userModel.create({username: req.body.username,password: passwordHash})
                            .then(()=> { 
                                res.status(200).send(`${req.body.username} added successfully`); 
                            }).catch((err)=> {
                                res.status(400).send(err.message)
            })
        });
    }
    
});

app.post("/login", (req, res)=> {
    userModel.find({username: req.body.username}).then((userData)=> {
        
        if(userData.length) {
            bcrypt.compare(req.body.password, userData[0].password).then((val)=> {
                if(val) {
                    const authToken = jwt.sign(userData[0].username, process.env.SECRET_KEY);
                    res.status(200).send({authToken});
                } else {
                    console.log("Invalid Password")
                    res.status(400).send("Invalid Password");
                }
            })
        } else {
            res.status(400).send("Unauthorized user");
        }
    })
});
app.post("/create",(req,res)=>{
    if(req.headers.authorization) {
        try {
            const user = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
            userModel.find({username:user}).then((data)=>{
                contentModel.create({username:data[0].username,heading:req.body.heading,context:req.body.context})
                .then(()=>{
                    res.status(200).send("successfully created")
                }).catch((err)=>{
                    console.log(err)
                })
            })
        } catch(err) {
            res.status(403).send("User Not Authorized")
        }
    } else {
        res.status(400).send("Missing Authorization token")
    }
})

app.get("/history",(req,res)=>{
    if(req.headers.authorization) {
        try {
            const user = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
            contentModel.find({username:user})
                .then((data)=>{
                    res.status(200).json(data)
                }).catch((err)=>{
                    console.log(err)
                })

        } catch(err) {
            res.status(403).send("User Not Authorized")
        }
    } else {
        res.status(400).send("Missing Authorization token")
    }
})

