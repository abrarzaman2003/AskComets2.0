import { Grid } from '@mui/material';
import { useState } from 'react';
import { LoginButton } from './HomePageComponents/LoginButton';
import { PostsBox } from './HomePageComponents/PostsBox';
import { AskCometsLogo } from './HomePageComponents/AskCometsLogo';



export function HomePage(){
    const [user, setUser] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    
    

    
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
                            <LoginButton func={setUser} isLoggedIn={loggedIn} setLoggedIn={setLoggedIn} />    
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>
                </Grid>

                <Grid item xs={8}>
                    <Grid container spacing={3}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}>
                            <PostsBox userId={user.userId} isLoggedIn={loggedIn}></PostsBox>
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>

                    
                </Grid>

            </Grid>

        </div>
    )
}