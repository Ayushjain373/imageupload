// images routes


const { request } = require("express");
const express = require("express");
const multer = require("multer");
const app = express();

const router = express.Router();
const Image = require("../src/models/Imageschema")



/// define storage for images

const storage = multer.diskStorage({

    destination:function(req,file,callback)
    {
        callback(null,'./public/uploads/images');
    },


    // add back the extension

    filename:function(req,file,callback){

        callback(null,Date.now()+file.originalname)
    }
});

//upoad parameters for multer

const upload = multer({
    storage:storage,
    limits:{

        fieldSize:1024*1024*20
    }
})


router.post("/new",upload.single('image'),async(req,res)=>{

    try{

        const addImages = new Image({

            Imagename:req.body.name,
            desc: req.body.desc,
            Image:req.file.filename,
        })

        const result = await addImages.save();
        res.status(201).redirect("/");
    }catch(err)
    {
        console.log(err)
        res.status(404).json(err);
    }



})

router.put("/edit/:id",upload.single('image'),async(req,res)=>{
    
    try {

        if(req.file)
        {
            var  data = await Image.findByIdAndUpdate({_id:req.params.id},{

                Imagename:req.body.name,
                desc:req.body.desc,
                Image: req.file.filename
            },{new:true});

        }else{

            var data = await Image.findByIdAndUpdate({_id:req.params.id},{

                Imagename:req.body.name,
                desc:req.body.desc,
                
            },{new:true});
        }

       

        
        if (!data) {
            return res.status(404).send()
        }
        else {

            res.status(200).redirect("/")
        }
        
    } catch (error) {

        console.log(error)

        res.status(500).send("Internal error")
        
    }
})
router.get("/delete/:id",async(req,res)=>{

    try {
 
        const id = req.params.id;

        const delData = await Image.findByIdAndDelete({_id:id});

        if (!id) {
            return res.status(404).send();
        }


        res.status(200).redirect("/")





    }
    catch (e) {
        res.status(404).send(e);
    }



})


module.exports = router