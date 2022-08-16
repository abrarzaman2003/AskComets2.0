import { Button, Typography, Menu, MenuItem} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {UserContext} from "../../App";
import { logOut, signIn } from '../../back-end/authfunctions';
import { User } from "../../back-end/userModel";
import { loginButton_style } from "../Styling/ButtonStyling";
import {useTransition, animated} from 'react-spring';
import { button_text_style } from "../Styling/TypographyStyling";



export function LoginButton() {

    const {user, setUser} = useContext(UserContext);
    const [loggedIn, setLoggednIn] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    const transition = useTransition(open, {
        from: {x: 0, y:-50 , opacity: 0},
        enter: {x: 0,y:0 , opacity: 1},
        leave: {x: 0,y:-50 , opacity: 0}
    });

    const AnimatedMenu = animated(Menu);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };
    const handleClose = () => {
        //console.log(open);
        //setAnchorEl(null);
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
            <Typography sx={button_text_style}> {user.name} </Typography>  
        </Button>
        {transition((style,open) =>
            <AnimatedMenu id="basic-menu" open={open} onClose={handleClose} anchorEl={anchorEl} style={style}>
                <MenuItem onClick={handleLogOutClick}>Log Out</MenuItem>
            </AnimatedMenu>
        )}
        
        </div>
    );
}