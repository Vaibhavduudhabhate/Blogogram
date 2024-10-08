const express = require('express');
const path = require('path');
const mongoose = require('mongoose')
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');

const cookieParser = require('cookie-parser');
const checkForAuthenticationCookie = require('./middlewares/authentication');
const Blog = require('./models/blog');
const app = express();

const PORT = 8000;

app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve('./public')))

app.get("/",async(req,res)=>{
    const allBlogs = await Blog.find({});
    res.render("home",{
        user:req.user,
        blogs:allBlogs
    })
})

app.use('/user',userRoute)
app.use('/blog',blogRoute)


async function connectMongoDb(url){
    return mongoose.connect(url)
}
connectMongoDb('mongodb+srv://admin:admin1234@cluster0.w3huoar.mongodb.net/practiceDatabase').then(()=>console.log("mongodb connected"))



// export default{
//     connectMongoDb,
// }
app.listen(PORT ,()=>console.log(`server started on PORT:${PORT}`))