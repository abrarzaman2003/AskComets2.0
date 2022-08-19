import { Button, Typography, Menu, MenuItem, Slide, Fade} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import {UserContext} from "../../App";
import { logOut, signIn } from '../../back-end/authfunctions';
import { User } from "../../back-end/userModel";
import { loginButton_style } from "../Styling/ButtonStyling";
import {useTransition, animated} from 'react-spring';
import { button_text_style, commentCard_body_style, menuItemStyling } from "../Styling/TypographyStyling";
import { backgroundColor, buttonColor, textColor } from "../Styling/Colors";
import { menu_styling } from "../Styling/MenuStyling";



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

    useEffect(()=>{
        console.log(anchorEl ? anchorEl.offsetWidth: 0);
    },[open]);
    
    return(
        <div>
        <Button onClick={handleClick} sx={loginButton_style}>
            <Typography sx={button_text_style}> {user.name} </Typography>  
        </Button>
        
            <Menu id="basic-menu" open={open} onClose={handleClose} anchorEl={anchorEl} sx = {{...menu_styling, width: `${anchorEl && anchorEl.offsetWidth}px`}} TransitionComponent={Fade} >
                <MenuItem> <Typography sx = {menuItemStyling}>Profile Page</Typography></MenuItem>
                <MenuItem onClick={handleLogOutClick}> <Typography sx = {menuItemStyling}>Log Out</Typography></MenuItem>
            </Menu>
        
        
        </div>
    );
}