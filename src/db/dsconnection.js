const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Ayush:ayushjain@cluster0.8wcst.mongodb.net/Images?retryWrites=true&w=majority" ,
{ useNewUrlParser: true,
useUnifiedTopology: true,

}).then(()=>{

    console.log("connection is succesfull")
}).catch((e)=>{
    console.log(e)
    console.log("Data Base No connection")
})

