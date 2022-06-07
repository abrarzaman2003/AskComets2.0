import { addComment, getComments, getPost } from "../back-end/service_functions";
import { useState, useEffect } from "react";
import {Typography, Box, Button, Grid, Modal, Stack, TextField, Card, CardActionArea } from '@mui/material';
import { Comment } from "../back-end/commentObject";
import { Post } from "../back-end/postModel";

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

export function CommentsBox(props){

    const [commentArray, setCommentArray] = useState([]);
    const [count, setCount] = useState(0);
    
    

    useEffect(()=>{
        async function gettingComments(){
            //console.log(await props.post.postId);
            const array = await getComments(props.post.postId);
           //console.log(await array);
            const cArray = await array.map((c) => <CommentCard key={c.commentId} commentBody={c.commentBody} > </CommentCard>  );
            setCommentArray(cArray);
            setCount(cArray.length);
            //console.log(cArray);

        }

        gettingComments();
    }, [count]);


    return(
        <Box sx={{
            width: 1 ,
            height: "fit-content",
            backgroundColor: '#F09AA9',
            borderRadius: '21px',
            paddingBottom: 3
        }}>
        <Stack spacing={2}>
           
                <Grid container justifyContent="space-between">
                    <Grid item xs = {2}>
                        <Typography
                        sx={
                            {
                                fontSize: '35px',
                                padding: 2,
                            }
                        }> Comments </Typography>
                    </Grid>
                    
                    <Grid item xs ={2}>
                        <AddCommentModal post={props.post} func={setCount} count={count}></AddCommentModal>
                    </Grid>
                </Grid> 
            

            <Stack spacing={2} alignItems="center">
                {commentArray}
            </Stack>
                
                
        </Stack>
           
          

        </Box>
    );
}


export function CommentCard(props){
        return(
                <Card sx={{
                    width: 0.95,
                    backgroundColor: '#8FB8ED',
                    borderRadius: '21px',
                }}>
                    
                        <Typography sx={
                                    {
                                        fontSize: '20px',
                                        padding: 1,
                                    }
                                }> {props.commentBody} </Typography>
                </Card>
            
           
        );
}

export function AddCommentModal(props){
    const [open, setOpen] = useState(false);
    const [eOpen, seteOpen] = useState(false);


    const [commentBodyText, setCommentBodyText] = useState("");



    const handleBodyChange = (event)=>{
        setCommentBodyText(event.target.value);

    }

    const submit = ()=> {
        //console.log(props.postId)
        const newComment = new Comment(props.post.userId, commentBodyText, props.post.postId, 0);
        addComment(newComment);
        setOpen(false);
        const x = props.count + 1;
        props.func(x);
    }


    const handleOpen = () => {
        if (props.userId === ""){
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

export function PostBox(props){

    const[post, setPost] = useState("");
    const [comp, setComp] = useState(<Typography sx={
        {
            fontSize: '40px',
            padding: 1,
        }
    }> Loading... </Typography>);


    useEffect(()=>{
        async function retrievePost(){
            const postObject = await getPost(props.id);
            await setPost(postObject);
            await setComp( <CommentsBox post = {postObject}> </CommentsBox>)
        }
        //console.log(localStorage.getItem('user'));
        retrievePost();
        
    },[]);


    return(<Box sx={{
        width: 1 ,
        height: "fit-content",
        backgroundColor: '#8FB8ED',
        borderRadius: '21px',
        paddingBottom: 3
    }}>
        <Typography sx={
                                {
                                    fontSize: '40px',
                                    padding: 1,
                                }
                            }> {post.postTitle} </Typography>
        <Typography sx={
                    {
                        fontSize: '30px',
                        padding: 1,
                    }
                }> {post.postBody} </Typography>
        <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
                {comp}
            </Grid>
            
            <Grid item xs={1}></Grid>
        </Grid>
        
    
    
    
    
    
    </Box>);
}