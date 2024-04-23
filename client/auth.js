
let name=document.getElementById("name");

let password=document.getElementById("password");

async function handleRegister(){
    console.log(password.value,name.value);
    const body={
        name : name.value,
        password:password.value
    };
    const response=await fetch('/users/register',{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify(body)
    })
    const res=await response.json();
    alert(res.message);
    if(res.user){
       window.location.assign('/app/login.html');
    }

}