import { Box, Grid, Stack, Typography } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { getComments, getPost } from "../../back-end/service_functions";
import { AddCommentModal } from "./AddCommentModal";
import { CommentCard } from "./CommentCard";
import {PostContext} from "../postPage";
import { commentBox_body_style } from "../Styling/TypographyStyling";
import { commentsBox_box_style } from "../Styling/CardStyling";



export function CommentsBox(){
    const {post} = useContext(PostContext);
    const [commentArray, setCommentArray] = useState([]);
    const [count, setCount] = useState(0);
    
    

    useEffect(()=>{
        
        async function gettingComments(){
            const array = await getComments(post.postId);
            const cArray = await array.map((c) => <CommentCard key={c.commentId} commentObject={c} > </CommentCard>  );
            setCommentArray(cArray);
            setCount(cArray.length);
            //console.log(cArray);
        }

        gettingComments();
    }, [count,post]);


    return(
        <Box sx={commentsBox_box_style}>
        <Stack spacing={2}>
           
                <Grid container justifyContent="space-between">
                    <Grid item xs = {2}>
                        <Typography
                        sx={commentBox_body_style}> Comments </Typography>
                    </Grid>
                    
                    <Grid item xs ={2}>
                        <AddCommentModal func={setCount} count={count}></AddCommentModal>
                    </Grid>
                </Grid> 
            

            <Stack spacing={2} alignItems="center">
                {commentArray}
            </Stack>
                
                
        </Stack>
           
          

        </Box>
    );
}

