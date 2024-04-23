
let name=document.getElementById("name");

let password=document.getElementById("password");

async function handleLogin(){
    console.log(password.value,name.value);
    const body={
        name : name.value,
        password:password.value
    };
    const response=await fetch('/users/login',{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify(body)
    })
    const res=await response.json();
    alert(res.message);
   if(res.id){
    localStorage.setItem("userId",res.id);
    window.location.assign('/app/index.html');

   }

}