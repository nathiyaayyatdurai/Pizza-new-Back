const mongoose=require("mongoose");

var mongoURl='mongodb+srv://admin:admin123@cluster0.hijj3.mongodb.net/mern-pizza'

mongoose.connect(mongoURl,{useUnifiedTopology:true, useNewUrlParser:true})

var db=mongoose.connection

db.on("connected",()=>{
    console.log("Mongo db Connection Successfull")
})

db.on("error",()=>{
    console.log("Mongo db Connection field")
})