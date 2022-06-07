import { useEffect , useState} from "react";
import { getPost, addComment, getComments } from "../back-end/service_functions";
import {Typography, Box, Button, Grid, Modal, Stack, TextField } from '@mui/material';
import { useParams } from "react-router";
import { AskCometsLogo, LoginButton } from "./HomePageComponents";
import { Comment } from "../back-end/commentObject";
import { CommentsBox, PostBox } from "./PostPageComponents";
import { Post } from "../back-end/postModel";
export function PostPage(){

    

    let {id} = useParams(); 

    

    
    

    return(
        <div>
        <Grid container direction='column' justifyContent='center' spacing={3}>
        
        
            <Grid item xs={4}>
                <Grid container spacing={0} alignItems="center">
                    <Grid item xs={1}></Grid>
                    <Grid item xs={4}>
                        <AskCometsLogo />
                    </Grid>
                    <Grid item xs={5}></Grid>
                    <Grid item xs={1}>
                        <LoginButton />    
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
            </Grid>


            <Grid item xs={8}>
                <Grid container spacing={3}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}>
                            <PostBox id={id}></PostBox>
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>  
            </Grid>

        </Grid>
        </div>
        
    );
}