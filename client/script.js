console.log("hello i am index")

console.log(window.location.href);

if(window.location.href==="https://todos-rqsj.onrender.com/app/index.html" || window.location.href==="https://todos-rqsj.onrender.com/app/"  ){
    if(localStorage.getItem('userId')){
        console.log("loggednin")
    }else{
        console.log("not logged in")
        window.location.assign('/app/login.html');
    }
}