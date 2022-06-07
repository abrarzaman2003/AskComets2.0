import { Box, Grid, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { getComments, getPost } from "../../back-end/service_functions";
import { AddCommentModal } from "./AddCommentModal";
import { CommentCard } from "./CommentCard";



export function CommentsBox(props){
    const [post, setPost] = useState(null);
    const [commentArray, setCommentArray] = useState([]);
    const [count, setCount] = useState(0);
    
    

    useEffect(()=>{
        async function retrievePost(){
            const postObject = await getPost(props.id);
            await setPost(postObject);
            return postObject;
        }
        async function gettingComments( postObject){
            const array = await getComments(postObject.postId);
            const cArray = await array.map((c) => <CommentCard key={c.commentId} commentBody={c.commentBody} > </CommentCard>  );
            setCommentArray(cArray);
            setCount(cArray.length);
        }

        retrievePost().then((x)=> gettingComments(x));
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
                        <AddCommentModal post={post} func={setCount} count={count}></AddCommentModal>
                    </Grid>
                </Grid> 
            

            <Stack spacing={2} alignItems="center">
                {commentArray}
            </Stack>
                
                
        </Stack>
           
          

        </Box>
    );
}

