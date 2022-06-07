import {Typography, Box, Button, Grid, Modal, Stack, TextField, Card, CardActionArea } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { addPost, getAllPosts } from '../back-end/service_functions';
import { signIn } from '../back-end/authfunctions';
import { Post } from '../back-end/postModel';
import { UserContext } from '../App';
import { Link } from 'react-router-dom';

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

export function AskCometsLogo(){
    const link = "/";

    return(
        <Card sx={{
            width: 'fit-content',
            backgroundColor: '#bAb86c',
            borderRadius: '21px',
        }}>
            
            <Link to={link} style={{ color: 'inherit', textDecoration: 'inherit'}}>

            
                
                <Typography sx={
                    {
                        fontSize: '70px',
                        padding: 1,
                    }
                }>
                    AskComets
                </Typography>
            </Link>
        </Card>
    );
}


export function LoginButton() {
    const {user, setUser} = useContext(UserContext);
    console.log(user);
    //const text = "Log In";
    
    async function getResponse(){
        const a = await signIn()
        const b = await a;
        //console.log(b);
        await setUser(b);
    }

    const handleClick = function (){
        getResponse().then(console.log(user));
    }
    
    return(
        <Button variant="contained" onClick={handleClick} sx={{
            backgroundColor: '#bAb86c',
            borderRadius: '10px',
            color: '#000000'
        }}>
            <Typography> {user.name} </Typography>
        </Button>
    );
}


export function PostsBox(props){

    const [postArray, setPostArray] = useState([]);
    const [count, setCount] = useState(0);
    const {user } = useContext(UserContext);
    

    useEffect(()=>{
        async function gettingPosts(){
            const array = await getAllPosts();
            //console.log(await array);
            const pArray = await array.map((p) => <PostCard key={p.postId} postTitle={p.postTitle} postBody={p.postBody} postId={p.postId}> </PostCard>  );
            setPostArray(pArray);
            setCount(pArray.length);
            //console.log(pArray);

        }

        gettingPosts();
    }, [count]);

    useEffect(()=>{
        if (user.name === "Log In"){
            console.log("bruh");
        }else{
           console.log('ye');
        }
    },[])


    return(
        <Box sx={{
            width: 1 ,
            height: "fit-content",
            backgroundColor: '#19647E',
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
                        }> Recent Posts </Typography>
                    </Grid>
                    
                    <Grid item xs ={2}>
                        <AddPostModal func={setCount} count={count}></AddPostModal>
                    </Grid>
                </Grid> 
            

            <Stack spacing={2} alignItems="center">
                {postArray}
            </Stack>
                
                
        </Stack>
           
          

        </Box>
    );
}


export function PostCard( props ){
    const link = "/post/" + ""+ props.postId;

    
    return(
            
            <Card sx={{
                width: 0.95,
                backgroundColor: '#8FB8ED',
                borderRadius: '21px',
            }}>
                
                <Link to={link} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    <Typography sx={
                                {
                                    fontSize: '25px',
                                    padding: 1,
                                }
                            }> {props.postTitle} </Typography>
                    <Typography sx={
                                {
                                    fontSize: '20px',
                                    padding: 1,
                                }
                            }> {props.postBody} 
                    </Typography>
                </Link>
            </Card>
        
       
    );
}

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