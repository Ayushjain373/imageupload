const mongoose = require("mongoose");


const imageSchema = mongoose.Schema({

    Imagename:{

        type:String,
        required:true
    },
    desc:{

        type:String,
        required:true,
    },
    Image:{

        type:String,
        required:true
        
    },
    date:{
        type:Date,
        default: Date.now()
    }


});

const Images = new mongoose.model("Image",imageSchema)

module.exports = Images
