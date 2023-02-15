const express= require('express');
const app= express();
const mongoose= require('mongoose');
const cors= require('cors');
const config= require('./DB');
const userRouter= require('./Route/user')
const productRouter=require('./Route/Accessories')


mongoose.connect((config.DB)).then(()=>{
    console.log("connection establish");
}).catch((err)=>{
    console.log(err);
})

app.use(cors());
app.use(express.json())
app.use('/user',userRouter)
app.use('/Accessories',productRouter)

const port=3500;
 app.listen(port,()=>{
      console.log(`Listening on port ${port}`);
 })
