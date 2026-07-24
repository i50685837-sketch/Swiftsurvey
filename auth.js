// SwiftSurvey Authentication


const API = "http://localhost:5000/api/auth";



// REGISTER USER

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


    const confirmPassword =
    document.getElementById("confirmPassword").value;



    if(password !== confirmPassword){

        alert("Passwords do not match");

        return;

    }



    try{


        const response = await fetch(
            `${API}/register`,
            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },


                body:JSON.stringify({

                    name:name,

                    email:email,

                    phone:phone,

                    password:password

                })

            }
        );



        const data = await response.json();



        if(response.ok){


            alert("Registration successful!");


            window.location.href="login.html";


        }else{


            alert(
                data.message || "Registration failed"
            );


        }



    }catch(error){


        console.log(error);


        alert(
            "Cannot connect to server"
        );


    }


}






// LOGIN USER


async function loginUser(event){


    event.preventDefault();



    const email =
    document.getElementById("email").value;



    const password =
    document.getElementById("password").value;




    try{


        const response = await fetch(

            `${API}/login`,

            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },


                body:JSON.stringify({

                    email:email,

                    password:password

                })

            }

        );



        const data = await response.json();



        if(response.ok){


            localStorage.setItem(
                "token",
                data.token
            );



            alert("Login successful!");



            window.location.href =
            "dashboard.html";



        }else{


            alert(
                data.message || "Login failed"
            );


        }



    }catch(error){


        console.log(error);


        alert(
            "Cannot connect to server"
        );


    }


}
