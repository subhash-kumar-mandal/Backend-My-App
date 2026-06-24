require('dotenv/config');
const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./configs/dbconnented');
const handleOTPs = require('./src/otp/routers.otp');
const userRoute = require('./src/user/router.user');
const cookieParse = require('cookie-parser');
const { Auth, AuthUserCheck } = require('./configs/authMD');
const cloudinary = require('./configs/cloudinary');
const profileRoute = require('./src/profileComplet/router.profile');
const postRoute = require('./src/posts/router.post');
const commentRoute = require('./src/comments/router.comment');

app.use(cors(
    {
        origin:JSON.parse(process.env.FRONTED_ROUTE),
        credentials:true
    }
))


app.use(function(req,res,next){
  console.log(req.url)
  next()
})

app.use(express.json()) // body parse 
app.use(cookieParse()) // cookie parse





app.use('/otp',handleOTPs);
app.use('/user',userRoute);
app.use('/profile',profileRoute);
app.use('/post',postRoute);
app.use('/comment',commentRoute)


app.get('/',(req,res)=>{
    res.json({
        message:"ok hai sab"
    })
});

app.use((req,res)=>{
    res.sendFile(path.join(process.cwd(),'src','helpers','Error.404.html'))
})



app.use((err,req,res,next)=>{
    res.status(err.statusCode || 500).json({
        success:false,
        message:err.message ||`Internal Server Error`
    })
})

connectDB(process.env.MONGODB_URL)
    .then(r => {
        app.listen(process.env.PORT_NUMBER, () => {
            console.log(`PORT listen ${process.env.PORT_NUMBER}`)
        })
    })
    .catch(err => console.log(err))