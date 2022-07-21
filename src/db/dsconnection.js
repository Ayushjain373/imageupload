const mongoose = require("mongoose");

mongoose.connect(process.env.DB ,
{ useNewUrlParser: true,
useUnifiedTopology: true,

}).then(()=>{

    console.log("connection is succesfull")
}).catch((e)=>{
    console.log(e)
    console.log("Data Base No connection")
})

