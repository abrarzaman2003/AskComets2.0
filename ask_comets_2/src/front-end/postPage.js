import { Grid } from '@mui/material';
import { createContext, useMemo, useState } from 'react';
import { useParams } from "react-router";
import { AskCometsLogo } from './HomePageComponents/AskCometsLogo';
import { LoginButton } from './HomePageComponents/LoginButton';
import { PostBox } from './PostPageComponents/PostBox';
import { Post } from '../back-end/postModel';

export const PostContext = createContext(null);

export  const PostProvider = (props) => {
  const [post, setPost] = useState(new Post(
    {
    userId : 0,
    postTitle :"Loading...",
    postBody : "Loading...",
    userId : "Loading...",
    }
)); // a dummy object to read the text from 
  const value = useMemo(
   () => ({post, setPost}),[post]);
  
  
    return ( 
        <PostContext.Provider value={value}>
            {props.children}
        </PostContext.Provider>
    );
  }

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
                            <PostProvider>
                                <PostBox id={id}></PostBox>
                            </PostProvider>
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>  
            </Grid>

        </Grid>
        </div>
        
    );
}