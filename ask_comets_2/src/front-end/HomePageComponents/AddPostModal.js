import { Box, Button, Modal, Stack, Typography, TextField } from "@mui/material";
import { useState, useContext } from "react";
import { addPost } from "../../back-end/service_functions";
import { UserContext } from "../../App";
import { Post } from "../../back-end/postModel";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#8FB8ED',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius: "21px",
};

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
      <Button onClick={handleOpen} sx={{
            backgroundColor: '#bAb86c',
            borderRadius: '10px',
            color: '#000000',
            margin: 2
        }}>Add Post</Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={{...style, width: 400 }}>
            <Stack spacing={3}>

                <Typography> New Post! </Typography>
                <TextField id="outlined-basic" label="Post Title" variant="outlined" onChange={handleTitleChange} />
                <TextField id="outlined-basic" label="Post Body" variant="outlined" multiline onChange={handleBodyChange}/>
                <Button onClick={submit} sx={{
            backgroundColor: '#bAb86c',
            borderRadius: '10px',
            color: '#000000'
        }}> Submit! </Button>

            </Stack>
          



         
        </Box>
      </Modal>

      <Modal
        open={eOpen}
        onClose={eClose}
      >
        <Box sx={{...style, width: 400 }}>
            <Stack spacing={3}>

                <Typography> Please Log In To Post! </Typography>
                <Button onClick={eClose} sx={{
            backgroundColor: '#bAb86c',
            borderRadius: '10px',
            color: '#000000'
        }}> Ok </Button>
                

            </Stack>
          
        </Box>
      </Modal>
    </div>
    );
}