import { useContext } from "react";
import { deletePost } from "../../back-end/service_functions";
import { PostContext } from "../postPage";
import { Modal, Stack, Typography, Button, Box } from "@mui/material";
import  { useNavigate } from 'react-router-dom';


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
        <Box sx={{...style, width: 400 }}>
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