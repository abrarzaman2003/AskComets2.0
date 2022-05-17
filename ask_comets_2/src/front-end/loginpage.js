import { useEffect, useState } from "react";
import { signIn } from "../back-end/authfunctions";



export function LoginPage(){
    const [user, setUser] = useState("Log In");

    useEffect(  () =>{
        async function getResponse(){
            const a = await signIn()
            const b = await a;
            setUser(b);
        }
        getResponse();
        
    },[] 
    );


    return(
        <div>
            <h1>{user.name}</h1>
            <h1>
                This is the login page!
            </h1>
            <button > sign in </button>
        </div>
    )
}