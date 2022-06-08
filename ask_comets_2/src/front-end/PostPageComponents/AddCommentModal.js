import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { useState, useContext } from "react";
import { addComment } from "../../back-end/service_functions";
import { Comment } from "../../back-end/commentObject";
import { UserContext } from "../../App";

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

export function AddCommentModal(props){
    const [open, setOpen] = useState(false);
    const [eOpen, seteOpen] = useState(false);

    const { user } = useContext(UserContext);



    const [commentBodyText, setCommentBodyText] = useState("");



    const handleBodyChange = (event)=>{
        setCommentBodyText(event.target.value);

    }

    const submit = ()=> {
        const newComment = new Comment(user.userId, commentBodyText, props.post.postId, 0);
        addComment(newComment);
        setOpen(false);
        const x = props.count + 1;
        props.func(x);
    }


    const handleOpen = () => {
        if (user.name === "Log In"){
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
        }}>Comment</Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={{...style, width: 400 }}>
            <Stack spacing={3}>

                <Typography> Add Comment </Typography>
                <TextField id="outlined-basic" label="Comment Body" variant="outlined" multiline onChange={handleBodyChange}/>
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

                <Typography> Please Log In To Comment! </Typography>
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