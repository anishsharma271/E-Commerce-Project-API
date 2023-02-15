const express=require('express')
const productRouter=express.Router();
const usermodelproducts= require('../Model/Accessories')
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../e-commerce/public')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  }) 
const upload = multer({ storage: storage })

productRouter.post('/upload',upload.single("image"),(req,res)=>{
    console.log('hh',req.body);
    console.log(req.file);
    // console.log(req.body.fieldname);
    let user= new usermodelproducts({ 
        image: req.file.filename,
        title:req.body.title,
        price:req.body.price,
        discription:req.body.discription,
        rating:req.body.rating,
        })
    console.log("product",user);
    user.save().then((data)=>{
        res.status(200).json({data:data})

    })
    .catch((err)=>{
        res.status(400).json({err:err})
    })
})

productRouter.get("/productget",(req,res)=>{
    usermodelproducts.find((err,data)=>{
        if(err){
            console.log(err);
        } else{
            res.send(data)
        }
    })
})
module.exports=productRouter;