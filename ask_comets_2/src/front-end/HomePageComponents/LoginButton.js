import { Button, Typography } from "@mui/material";
import { useContext } from "react";
import {UserContext} from "../../App";
import { signIn } from '../../back-end/authfunctions';



export function LoginButton() {

    const {user, setUser} = useContext(UserContext);

    async function getResponse(){
        const a = await signIn()
        const b = await a;
        //console.log(b);
        await setUser(b);
    }

    const handleClick = function (){
        getResponse().then(console.log(user));
    }
    
    return(
        <Button variant="contained" onClick={handleClick} sx={{
            backgroundColor: '#bAb86c',
            borderRadius: '10px',
            color: '#000000'
        }}>
            <Typography> {user.name} </Typography>
        </Button>
    );
}