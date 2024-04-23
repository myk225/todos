console.log("lets start")
const todoTitle=document.getElementById('todoTitle');
const todoDesc=document.getElementById('todoDesc');
const allTodos=document.getElementById("allTodos");
let allRemoveBtns;
async function fetchTodos(){
    const userId=localStorage.getItem('userId');
    const response=await fetch(`/todos/getTodos/${userId}`,{
        method:"GET",
    })
    const res=await response.json();
    console.log(res)
    //added
    allTodos.innerHTML='';
    res.userTodos.map((todo)=>{
        // 3 divs
        const div1=document.createElement('div');
        const div2=document.createElement('div');
        const div3=document.createElement('div');
        // 2-buttons
        const edit=document.createElement('button');
        const remove=document.createElement('button');
        //2-paras
        const todoTitle=document.createElement('p');
        const todoDesc=document.createElement('p');
    
        todoTitle.innerText=todo.title;
        todoDesc.innerText=todo.desc;
        edit.innerText="edit";
        remove.innerText="remove";

        remove.classList.add("remove");
        remove.setAttribute('data-todoId',todo.id);
        
        div3.appendChild(edit);
        div3.appendChild(remove);
        div1.classList.add("todo");
        div1.classList.add("d-flex");
        div1.classList.add("justify-content-between");
        div2.appendChild(todoTitle);
        div2.appendChild(todoDesc);
        div1.appendChild(div2);
        div1.appendChild(div3);
        console.log(allTodos)

        allTodos.appendChild(div1)
        

    })
    
    allRemoveBtns=document.querySelectorAll(".remove");

    allRemoveBtns.forEach((rbtn)=>{
        rbtn.addEventListener('click',async()=>{
            let userId=localStorage.getItem('userId');
            const todoId=rbtn.getAttribute('data-todoId');

            const response=await fetch(`/todos/deleteTodo/${todoId}`,{
                method:"DELETE",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({user_id:userId})
    
            })
            const res=await response.json();

            if(response.status==203){
                fetchTodos();
                alert(res.message);
            }
            alert(res.message);
        })
    })
    

     
}

fetchTodos()

// logic to add todos to server

// we will add todos on the click of add btn

//lets get the button by id

const addBtn=document.getElementById('addBtn');
addBtn.addEventListener('click',async()=>{
    alert("adding")
    const userId=localStorage.getItem('userId');
    const response=await fetch(`/todos/addTodo`,{
        method:"POST",
        headers:{
            
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            user_id: userId,
            title : todoTitle.value,
            desc : todoDesc.value
        })
    })
    const res=await response.json();
    console.log(res)
    fetchTodos();
})

// logic to delete a todo

