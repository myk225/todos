const express=require('express');

const router=express.Router();
const users=[];
let currentID=1;
router.get('/',(req,res)=>{
    res.send("i am user route");
})
router.get("/allUsers",(req,res)=>{
    res.json({users})
})
router.post('/register',(req,res)=>{
     const {name,password}=req.body;
     console.log(name,password)
    if(name && password){
        console.log("inside");
        //bug here 
        let userRegistered=users.find((user)=>user.name===name);
       

        if(userRegistered){
            console.log("user present");
            return res.json({message:"already registered with this name",userRegistered})
        }
            const user={
                id : currentID,
                name,
                password
            }
            users.push(user);
            // incremnting id so that every user gets unique id
            currentID++;
         return res.json({message :" registered", user}); 
        
        
     }
     res.json({message : "hello register"});
})

router.post('/login',(req,res)=>{
    const {name,password}=req.body;

    if(name && password){
        const user=users.find((elem)=>elem.name===name);
        if(user){
            if(user.password===password){
                return res.cookie('token',user.id,{maxAge:10000,httpOnly:true,}).json({message : "Login Successfull",id:user.id});
            }
            return res.json({message:"Invalid Password"});
        }
       return res.json({message:"No User With These Credentails,please try register"});
    }

    res.json({message:"please provide required creds"});
})


module.exports={router,users};