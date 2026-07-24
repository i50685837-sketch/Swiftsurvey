// auth.js

const API = "http://localhost:5000/api/auth";


// REGISTER

async function registerUser(event){

    event.preventDefault();


    const name =
    document.getElementById("name").value;


    const email =
    document.getElementById("email").value;


    const phone =
    document.getElementById("phone").value;


    const password =
    document.getElementById("password").value;


    const response = await fetch(
        `${API}/register`,
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                name,
                email,
                phone,
                password
            })
        }
    );


    const data = await response.json();


    alert(data.message || "Registration successful");


    if(response.ok){

        window.location.href="login.html";

    }

}



// LOGIN

async function loginUser(event){

    event.preventDefault();


    const email =
    document.getElementById("email").value;


    const password =
    document.getElementById("password").value;



    const response = await fetch(
        `${API}/login`,
        {

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            email,
            password
        })

        }
    );



    const data = await response.json();



    if(response.ok){

        localStorage.setItem(
            "token",
            data.token
        );


        window.location.href="dashboard.html";

    }
    else{

        alert(data.message);

    }


}
