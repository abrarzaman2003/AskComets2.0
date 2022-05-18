import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Grid, Typography } from '@mui/material';
import { sizing } from '@mui/system';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../App';
import {AskCometsLogo , LoginButton, PostsBox} from './HomePageComponents';
import { Post } from '../back-end/postModel';
import { useState } from 'react';

export var userId;

export function HomePage(){
    const [userId, setUserId] = useState("");
    

    
    return(
        <div>
            <Grid container spacing={3} direction='column' justifyContent="center">


                <Grid item xs = {4}>
                    <Grid container spacing={0} alignItems="center">
                        <Grid item xs={1}></Grid>

                        <Grid item xs={4}>
                            <AskCometsLogo />
                        </Grid>

                        <Grid item xs={5}></Grid>

                        <Grid item xs={1}>
                            <LoginButton func={setUserId}/>    
                        </Grid>

                        <Grid item xs={1}></Grid>
                    </Grid>
                </Grid>

                <Grid item xs={8}>
                    <Grid container spacing={3}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}>
                            <PostsBox userId={userId}></PostsBox>
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>

                    
                </Grid>

            </Grid>

        </div>
    )
}