const bodyparser= require("body-parser");
const express=require("express");
const {MongoClient} = require("mongodb");
const Mongoose = require("mongoose");
const app=express();

app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));

// app.set("view engine","ejs");


Mongoose.connect("mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.1dwcv.mongodb.net/contactdetails");

let db
const contactdetailsSchema = {
    name:String,
    phoneNo:String,
    email:String,
    portfolio:String
};

 const contactdetails = Mongoose.model('contactdetails',contactdetailsSchema);

//  To show the form to localhost7000 so that the user add his/her details there
app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});    

// To show the data present in the mongodb collection("contactdetails")
var database
app.get("/api/data",function(req,res){
    database.collection("contactdetails").find({}).toArray((error,result) =>{
        if (error) throw error
        res.send(result);
    })
})

// add data from form to mongodb
app.post("/",function(req,res){
    let newcontactdetails = new contactdetails({
        name: req.body.name,
        phoneNo: req.body.phoneNo,
        email: req.body.email,
        portfolio: req.body.portfolio
    });
    newcontactdetails.save();
    res.redirect("/");
});

// To connect mongodb and give path where our rest API works
app.listen(7000,()=>{
    MongoClient.connect("mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.1dwcv.mongodb.net/contactdetails",{useNewUrlParser:true},(error,result)=>{
    if (error) throw error;
    database=result.db("contactdetails")
    console.log("connection successful")
    });
});
