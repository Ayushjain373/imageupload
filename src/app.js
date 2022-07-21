const express  = require('express');
const app = express();
const port = process.env.PORT || 8400;
const hbs = require("hbs")
require('dotenv').config()
const axios = require("axios")
// Require the database
require("../src/db/dsconnection")

// get the Model of database
const Image = require("../src/models/Imageschema")

// method override
const methodOverride = require("method-override")
// Using path module to get the directories
const path = require('path')
const static_path = path.join(__dirname,"../public");

const template_path = path.join(__dirname, "../templates/views")
const partials_path = path.join(__dirname, "../templates/partials")
const router = express.Router()
app.set("view engine", "hbs")
app.use(express.static(static_path));
app.set("views", template_path)
hbs.registerPartials(partials_path)
app.use(express.json())
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }))//important line

// import image router 

const image = require("../routes/images")

// Image Routes
app.use("/images",image);

// Get all data from database
app.get("/", async(req,res)=>{

    

    const images = await Image.find()

    //console.log(images.length)

    res.render("index",{images:images, size: images.length});
})



// get edit requesrt and render to update page

app.get("/edit",async(req,res)=>{

    axios.get('https://imageupload-project.herokuapp.com/show',{params:{id:req.query.id}})
    .then(function(userdata){

        console.log(userdata)

       
        res.render("updateimage",{data : userdata.data})
      
    }).catch(err=>{
        res.send(err)
    })

  
})

// Upload the UI page to show the card detils


app.get("/detail",async(req,res)=>{

    axios.get('https://imageupload-project.herokuapp.com/show',{params:{id:req.query.id}})
    .then(function(userdata){

        console.log(userdata)

       
        res.render("ImageDetails",{data : userdata.data})
      
    }).catch(err=>{
        res.send(err)
    })

})

// Render the Ui  Upload data in Datav=base
app.get("/add-image",(req,res)=>{

    res.render("addimage")
})




// get the image data for particular id for edit
app.get("/show", async (req, res) => {

    try {

        if (req.query.id) {
            const id = req.query.id;

            const info = await Image.find({_id:id});
            res.send(info)
        }
      



    } catch (err) {
        res.status(500).send(err)
    }
})

app.listen(port, () => {

    console.log(`Server is running at ${port}`)
})