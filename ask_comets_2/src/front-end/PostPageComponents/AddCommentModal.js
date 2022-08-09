import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { useState, useContext } from "react";
import { addComment } from "../../back-end/service_functions";
import { Comment } from "../../back-end/commentObject";
import { UserContext } from "../../App";
import { PostContext } from "../postPage";
import { addCommentModal_button_style, addCommentModal_okButtonStyle, addCommentModal_submitButton_style } from "../Styling/ButtonStyling";
import { addCommentModal_style } from "../Styling/ModalStyling";



export function AddCommentModal(props){
    const [open, setOpen] = useState(false);
    const [eOpen, seteOpen] = useState(false);

    const { user } = useContext(UserContext);
    const { post } = useContext(PostContext);



    const [commentBodyText, setCommentBodyText] = useState("");



    const handleBodyChange = (event)=>{
        setCommentBodyText(event.target.value);

    }

    const submit = ()=> {
        const commentMap = {
            userId : user.userId,
            commentBody : commentBodyText,
            postId : post.postId,
            upvotes : 0
        }
        const newComment = new Comment(commentMap);
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
      <Button onClick={handleOpen} sx={addCommentModal_button_style}>Comment</Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={addCommentModal_style}>
            <Stack spacing={3}>

                <Typography> Add Comment </Typography>
                <TextField id="outlined-basic" label="Comment Body" variant="outlined" multiline onChange={handleBodyChange}/>
                <Button onClick={submit} sx={addCommentModal_submitButton_style}> Submit! </Button>

            </Stack>
          



         
        </Box>
      </Modal>

      <Modal
        open={eOpen}
        onClose={eClose}
      >
        <Box sx={addCommentModal_style}>
            <Stack spacing={3}>

                <Typography> Please Log In To Comment! </Typography>
                <Button onClick={eClose} sx={addCommentModal_okButtonStyle}> Ok </Button>
                

            </Stack>
          
        </Box>
      </Modal>
    </div>
    );
}