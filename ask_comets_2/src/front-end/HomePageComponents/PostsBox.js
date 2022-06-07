import { Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { getAllPosts } from "../../back-end/service_functions";
import { AddPostModal } from "./AddPostModal";
import { PostCard } from "./PostCard";




export function PostsBox(){

    const [postArray, setPostArray] = useState([]);
    const [count, setCount] = useState(0);
    const {user } = useContext(UserContext);
    

    useEffect(()=>{
        async function gettingPosts(){
            const array = await getAllPosts();
            const pArray = await array.map((p) => <PostCard key={p.postId} postTitle={p.postTitle} postBody={p.postBody} postId={p.postId}> </PostCard>  );
            setPostArray(pArray);
            setCount(pArray.length);
        }

        gettingPosts();
    }, [count]);

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
                        <AddPostModal userId={user.userId} func={setCount} count={count}></AddPostModal>
                    </Grid>
                </Grid> 
            

            <Stack spacing={2} alignItems="center">
                {postArray}
            </Stack>
                
                
        </Stack>
           
          

        </Box>
    );
}