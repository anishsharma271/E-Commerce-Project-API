const express=require('express');
const userRouter= express.Router();
const userModel= require('../Model/user');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken')
const signature="anish@34%$%*^%%#4shar##@$^%$%$ma@&7!*1"
const {middleware}=require('../Verify');
const {body, validationResult}= require('express-validator');




userRouter.post('/signup',
body('name').isLength({min:3}).withMessage('invalid name'),
body("email").isEmail().withMessage('enter a valid email'),
body('email').custom((value)=>{
  return userModel.findOne({email:value}).then((user)=>{
    if(user){
     return  Promise.reject('this E-mail is already is use')
    }
  })
}),
//  body('age').isLength({min:4}).isNumeric().withMessage('invalid age'),
body('password').isLength({min:6}).withMessage('invalid password'),
(req,res)=>{
    console.log('req',req.body);
//     const errors = validationResult(req);
//    if(!errors.isEmpty()){
//     return res.status(400).json({errors:errors.array()});
//    }
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        if(err){
            console.log(err);
        }  else if(hash) {
            let user = new userModel({name:req.body.name, email: req.body.email,age: req.body.age, password:hash});
            console.log("user" ,user);

            user.save().then((data)=>{
                res.status(200).json({msg:'successfully signuped',data})
            }).catch((err)=>{
                res.status(400).json({msg:"fail",err})
            })

        }
    });
  
})

userRouter.post('/login',async(req,res)=>{
    // console.log("req",req.body);
    const user = await userModel.findOne({ email: req.body.email });
    console.log('user',user);
    try{
        const match = await bcrypt.compare(req.body.password, user.password);
      
        if(match){
            const accessToken = jwt.sign({id:user._id}, signature)
            res.json({ msg:'successfully',data:{ name: user.name,email:user.email ,id:user. _id} , accessToken });
        } else {
            res.json({ message: "Invalid Credentials" });
        }
    } catch(e) {
        console.log(e)
    }


})

userRouter.post('/verfiy',middleware,(req,res)=>{
    console.log('bb',req.body);
   res.send(req.body);
})

userRouter.get('/get',(req,res)=>{
    userModel.find((err,data)=>{
        if(err){
            console.log('err',err);
        } else{
            res.send(data);
        }
    })
})



module.exports=userRouter;