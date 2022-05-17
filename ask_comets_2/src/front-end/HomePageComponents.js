import {Typography, Box, Button, Grid, Item, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { getAllPosts } from '../back-end/service_functions';
import { signIn } from '../back-end/authfunctions';

export function AskCometsLogo(){
    return(
        <Box sx={{
            width: 'fit-content',
            backgroundColor: '#bAb86c',
            borderRadius: '21px',
        }}>
        <Typography sx={
            {
                fontSize: '70px',
                padding: 1,
            }
        }>
            AskComets
        </Typography>
        </Box>
    );
}


export function LoginButton() {
    const [user, setUser] = useState("Log In");
    
    async function getResponse(){
        const a = await signIn()
        const b = await a;
        setUser(b.name);
    }

    const handleClick = function (){
        getResponse();
    }

    
    
    return(
        <Button variant="contained" onClick={handleClick} sx={{
            backgroundColor: '#bAb86c',
            borderRadius: '21px',
            color: '#000000'
        }}>
            <Typography> {user} </Typography>
        </Button>
    );
}


export function PostsBox(){

    const [postArray, setPostArray] = useState([]);

    useEffect(()=>{
        async function gettingPosts(){
            const array = await getAllPosts();
            console.log(await array);
            const pArray = await array.map((p) => <PostCard key={p.postId} postTitle={p.postTitle} postBody={p.postBody}> </PostCard>  )
            setPostArray(pArray);
            console.log(pArray);

        }

        gettingPosts();
    }, [])


    return(
        <Box sx={{
            width: 1 ,
            height: 1000,
            backgroundColor: '#19647E',
            borderRadius: '21px'
        }}>
        <Stack spacing={2}>
           
                <Grid container >
                    <Grid item xs = {2}>
                        <Typography
                        sx={
                            {
                                fontSize: '35px',
                                padding: 2,
                            }
                        }> Recent Posts </Typography>
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
    return(
        
            <Box sx={{
                width: 0.95,
                backgroundColor: '#8FB8ED',
                borderRadius: '21px',
            }}>

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
                        }> {props.postBody} </Typography>

            </Box>
        
    );
}

