const express=require('express');

const router=express.Router();

let todos=[];
let currentID=1;
  
router.post('/addTodo',(req,res)=>{
    const {user_id,title,desc}=req.body;
    if(user_id && title && desc){
        //checking if user exits
        
            const todo={
                id:currentID,
                user_id,
                title,
                desc
            }
            currentID++;
            todos.push(todo);
            return res.json({message : "added a todo",})
    }
    res.json({message:"Please Provide required feilds"})
})
// get all todos

router.get('/allTodos',(req,res)=>{
    res.json({message:"ALL TODOS",todos})
})

router.get('/getTodos/:user_id',(req,res)=>{
    const {user_id}=req.params;
    console.log("hello")
    let userTodos=todos.filter((todo)=>todo.user_id==user_id);
    console.log(userTodos);
    if(userTodos){
       return res.json({message:"here are your todos",userTodos});
    }
    console.log("end")
    res.json({message:"No Todos"})
})

router.put("/updateTodo/:todoId",(req,res)=>{
    const {todoId}=req.params;
    const {title,desc,user_id}=req.body;
    // to check if we have todo with that id
    const todo=todos.find((elem)=>elem.id==todoId);
    if(todo){
        if(user_id){
            console.log("condition 1 passed");
            if(todo.user_id==user_id){
                console.log("condition 2 passed");
                if(title && desc){
                    todo.title=title;
                    todo.desc=desc;
                    // the below method or fn returns index of the todo from the todos array
                    let todoIndex=todos.findIndex((elem)=>elem.id==todoId);
                    todos[todoIndex]=todo;
                    return res.json({message:"okay upddate successful"})
                   }
                   return res.json({message:"please provide title and desc"});
            }
            res.status(403).json({message:"unauthorized access"});
        }
        console.log("condition 1 failed");
       return  res.json({message:"please provide user_id "});
       
    }
    res.json({message:"no todo with this id"});
})

router.delete("/deleteTodo/:todoId",(req,res)=>{
    const {todoId}=req.params;
    const {user_id}=req.body;
    const todo=todos.find((elem)=>elem.id==todoId);
    if(todo){
        if(user_id){
            if(todo.user_id==user_id){
                let updatedTodos=todos.filter((elem)=>elem.id!=todoId);
                todos=updatedTodos;
                return res.status(203).json({message:"deleted a todo"});
            }
            return res.json({message:"unauthortized dsuiuhfguidh"});
        }
       return res.json({message: "please provide  user_id"});
    }
    res.status(404).json({message:"no such todo"});
})

module.exports=router;