import { Box, Button, Modal, Stack, Typography, TextField } from "@mui/material";
import { useState, useContext } from "react";
import { addPost } from "../../back-end/service_functions";
import { UserContext } from "../../App";
import { Post } from "../../back-end/postModel";
import { addPostModal_style } from "../Styling/ModalStyling";
import { addPostModal_button_style, addPostModal_submitButton_style } from "../Styling/ButtonStyling";



export function AddPostModal(props){
    const [open, setOpen] = useState(false);
    const [eOpen, seteOpen] = useState(false);

    const [postTitleText, setPostTitleText] = useState("");
    const [postBodyText, setPostBodyText] = useState("");

    const { user } = useContext(UserContext);


    const handleTitleChange = (event)=>{
        setPostTitleText(event.target.value);
        
    }

    const handleBodyChange = (event)=>{
        setPostBodyText(event.target.value);

    }

    const submit = ()=> {
        const newPost = new Post(props.userId, postTitleText, postBodyText, 0);
        console.log(newPost);
        addPost(newPost);
        setOpen(false);
        const x = props.count + 1;
        props.func(x);
    }


    const handleOpen = () => {
        
        console.log(user.name);
        if (user.name=="Log In"){
            seteOpen(true);
        }else{
            setOpen(true);
        }
        
    };
    const handleClose = () => {
        setOpen(false);
    };

    const eClose = () =>{
        seteOpen(false);
    }

    
    return(
    <div>
      <Button onClick={handleOpen} sx={addPostModal_button_style}>Add Post</Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={{...addPostModal_style, width: 400 }}>
            <Stack spacing={3}>

                <Typography> New Post! </Typography>
                <TextField id="outlined-basic" label="Post Title" variant="outlined" onChange={handleTitleChange} />
                <TextField id="outlined-basic" label="Post Body" variant="outlined" multiline onChange={handleBodyChange}/>
                <Button onClick={submit} sx={addPostModal_submitButton_style}> Submit! </Button>

            </Stack>
          



         
        </Box>
      </Modal>

      <Modal
        open={eOpen}
        onClose={eClose}
      >
        <Box sx={{...addPostModal_style, width: 400 }}>
            <Stack spacing={3}>
                <Typography> Please Log In To Post! </Typography>
                <Button onClick={eClose} sx={addPostModal_button_style}> Ok </Button>
            </Stack>          
        </Box>
      </Modal>
    </div>
    );
}