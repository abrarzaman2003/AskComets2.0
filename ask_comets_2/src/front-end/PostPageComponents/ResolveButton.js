import { Button, Typography, IconButton, Menu , Grid, MenuItem} from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { Post } from "../../back-end/postModel";
import { addPost } from "../../back-end/service_functions";
import { User } from "../../back-end/userModel";
import { PostContext } from "../postPage";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DeletePostModal } from "./DeletePostModal";
import { EditPostModal } from "./EditPostModal";
import { resolveButton_box_style } from "../Styling/CardStyling";
import { menu_styling } from "../Styling/MenuStyling";
import { menuItemStyling } from "../Styling/TypographyStyling";

export function ResolveButton(){
    const { user } = useContext(UserContext);
    const { post, setPost } = useContext(PostContext);
    const [resolved, setResolved] = useState(false);
    const [same, setSame] = useState(false);
    const [label, setLabel] = useState("Not Resolved");

    const[anchorEl, setAnchorEl] = useState(null);
    const[ open, setOpen] = useState(false);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);


    useEffect(()=>{
        const postUserId = post.userId;
        const currentUserId = user.userId;
        if (postUserId === currentUserId){
            console.log("same");
            setSame(true);
        }else{
            setSame(false);
        }
    },[user, post]);

    useEffect(()=>{
        //console.log("post object from effect", post);
        setResolved(post.resolved);
        if (resolved){
            setLabel("Resolved");
        }else{
            setLabel("Not Resolved");
        }
    },[post, resolved, user]);
    
    const handleResolveClick = () =>{
        if (same){
            
            post.resolvePost();
            setPost(post);
           
            setResolved(post.resolved);
            addPost(post);
        }
    }

    const handleDeleteClick = () => {
        setDeleteOpen(true);
        
    }
    const handleEditClick = () =>{
        setEditOpen(true);
    }

    const handleClick =(event)=>{
        setAnchorEl(event.currentTarget);
        setOpen(true);
    }
    const handleClose =()=>{
        setAnchorEl(null);
        setOpen(false);
    }

    return (
        <Box sx={resolveButton_box_style}>
            <Grid container justifyContent='center' alignItems="center">

            <Grid item>
            <Typography>
                {label}
            </Typography>
            </Grid>

            <Grid item>
                {same ? <IconButton onClick={handleClick}>
                <MoreVertIcon></MoreVertIcon>
            </IconButton> : <div></div>}
            
            </Grid>

            </Grid>

            <Menu id="basic-menu" open={open} onClose={handleClose} anchorEl={anchorEl} sx={menu_styling}>
                <MenuItem onClick={handleResolveClick}>
                    <Typography sx={menuItemStyling}>Resolve</Typography>
                </MenuItem>

                <MenuItem onClick={handleEditClick}>
                    <Typography sx={menuItemStyling}>Edit Post</Typography>
                </MenuItem>

                <MenuItem onClick={handleDeleteClick}>
                    <Typography sx={menuItemStyling}>Delete Post</Typography>
                </MenuItem>

            </Menu>

            <DeletePostModal open={deleteOpen} func={setDeleteOpen}></DeletePostModal>
            <EditPostModal open={editOpen} setOpen={setEditOpen}></EditPostModal>
        </Box>
    );

}