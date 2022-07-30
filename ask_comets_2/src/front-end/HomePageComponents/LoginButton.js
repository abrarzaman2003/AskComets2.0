import { Button, Typography, Menu, MenuItem} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {UserContext} from "../../App";
import { logOut, signIn } from '../../back-end/authfunctions';
import { User } from "../../back-end/userModel";
import { loginButton_style } from "../Styling/ButtonStyling";



export function LoginButton() {

    const {user, setUser} = useContext(UserContext);
    const [loggedIn, setLoggednIn] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };
    const handleClose = () => {
        //console.log(open);
        setAnchorEl(null);
        setOpen(false);
        //console.log(open);
    };

    useEffect(()=>{
        if (user.name != "Log In"){
            setLoggednIn(true);
        }
    },[]);

    


    async function getResponse(){
        const a = await signIn()
        const b = await a;
        await setUser(b);
        setLoggednIn(true);
    }

    const handleClick =  (event) => {

        if (!loggedIn){
            getResponse().then(console.log(user));
        }else{
            handleMenuClick(event);
        }
        
    }

    const handleLogOutClick = () => {
        logOut();
        setAnchorEl(null);
        setOpen(false);
        setUser(new User("Log In" , 0, 0));
        setLoggednIn(false);
    }
    
    return(
        <div>
        <Button variant="contained" onClick={handleClick} sx={loginButton_style}>
            <Typography> {user.name} </Typography>  
        </Button>
        <Menu id="basic-menu" open={open} onClose={handleClose} anchorEl={anchorEl}>
            <MenuItem onClick={handleLogOutClick}>Log Out</MenuItem>
        </Menu>
        </div>
    );
}