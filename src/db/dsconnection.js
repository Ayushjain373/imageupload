const mongoose = require("mongoose");
const DB = "mongodb+srv://Ayush:ayushjain@cluster0.8wcst.mongodb.net/Images"
mongoose.connect(DB,
{ useNewUrlParser: true,
useUnifiedTopology: true,

}).then(()=>{

    console.log("connection is succesfull")
}).catch((e)=>{
    console.log(e)
    console.log("Data Base No connection")
})

