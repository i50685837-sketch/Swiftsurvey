// dashboard.js

const API = "http://localhost:5000/api";


// Check login

const token = localStorage.getItem("token");


if(!token){

    window.location.href = "login.html";

}



// Load user profile

async function loadDashboard(){


    try{


        const response = await fetch(

            `${API}/profile`,

            {

                method:"GET",

                headers:{

                    "Authorization":
                    `Bearer ${token}`

                }

            }

        );



        const data = await response.json();



        if(response.ok){


            document.getElementById("username")
            .innerText =
            data.name;



            document.getElementById("balance")
            .innerText =
            "KES " + data.balance;



        }else{


            localStorage.removeItem("token");

            window.location.href="login.html";


        }



    }catch(error){


        console.log(error);

        alert("Server connection error");


    }


}



loadDashboard();
