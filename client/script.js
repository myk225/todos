console.log("hello i am index")

console.log(window.location.href);

if(window.location.href==="http://localhost:8000/app/index.html" || window.location.href==="http://localhost:8000/app/"  ){
    if(localStorage.getItem('userId')){
        console.log("loggednin")
    }else{
        console.log("not logged in")
        window.location.assign('/app/login.html');
    }
}