import { useEffect , useState} from "react";
import { getPost } from "../back-end/service_functions";
import {Typography, Box, Button, Grid, Modal, Stack, TextField } from '@mui/material';
import { useParams } from "react-router";

export function PostPage(props){

    const[post, setPost] = useState("");
    let {id} = useParams(); 
    useEffect(()=>{
        async function retrievePost(){
            const postObject = await getPost(id);
            setPost(postObject);
            
        }

        retrievePost();
    },[]);
    

    return(

        <Box sx={{
            width: 0.95,
            backgroundColor: '#8FB8ED',
            borderRadius: '21px',
        }}>
           <Typography>{post.postTitle}</Typography> 
           <Typography>{post.postBody}</Typography> 
        </Box>
    );
}