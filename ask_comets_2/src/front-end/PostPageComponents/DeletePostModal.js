import { useContext } from "react";
import { deletePost } from "../../back-end/service_functions";
import { PostContext } from "../postPage";
import { Modal, Stack, Typography, Button, Box } from "@mui/material";
import  { useNavigate } from 'react-router-dom';
import { addCommentModal_style } from "../Styling/ModalStyling";



export function DeletePostModal(props){
    
    const navigate = useNavigate();

    const {post} = useContext(PostContext);

    const handleClose = () =>{
        props.func(false);
    }

    const submit = () =>{
        deletePost(post);
        navigate('/');
        
    }



    return ( <Modal
        open={props.open}
        onClose={handleClose}
      >
        <Box sx={addCommentModal_style}>
            <Stack spacing={3}>
                <Typography> Are you sure you want to delete this post? </Typography>
                <Button onClick={submit} sx={{
            backgroundColor: '#bAb86c',
            borderRadius: '10px',
            color: '#000000'
        }}> Delete </Button>
            </Stack>
          



         
        </Box>
      </Modal>);
}