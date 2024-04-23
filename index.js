const express=require('express');
const port=8000;
const app=express();
var cookieParser = require('cookie-parser');
// users array
app.use(cookieParser())

const todos=[];
// middleware to accesses req.body

app.use('/app',express.static('./client'))
app.use(express.json());
app.get("/",(req,res)=>{
    
    res.send("hello world!!!!!");
})
// users route 
app.use((req,res,next)=>{
console.log(req.url);
next()
})
app.use('/users',require('./routes/userRoute').router);
app.use('/todos',require('./routes/todosRouts'));
app.listen(port,()=>{
    console.log("listeningg onn port 8000");
})