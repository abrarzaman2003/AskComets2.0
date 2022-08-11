import { Grid, Stack, Typography, Card } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { PostArrayContext, UserContext } from "../../App";
import { getAllPosts } from "../../back-end/service_functions";
import { postsBox_card_style, postsBox_recentPosts_style } from "../Styling/TypographyStyling";
import { AddPostModal } from "./AddPostModal";
import { PostCard } from "./PostCard";
import {animated, useTransition} from 'react-spring';
import { Post } from "../../back-end/postModel";
import { SearchModal } from "./SearchPopUp";




export function PostsBox(){

    //const [postArray, setPostArray] = useState([]);
    const [count, setCount] = useState(0);
    const {user} = useContext(UserContext);
    const {postArray, setPostArray} = useContext(PostArrayContext);
   
   

    useEffect(()=>{
        async function gettingPosts(){
            const array = await getAllPosts();
            const pArray = await array.map((p) => <PostCard key={p.postId} postTitle={p.postTitle} postBody={p.postBody} postId={p.postId}> </PostCard>  );
            setPostArray(pArray);
            setCount(pArray.length);
        }
        if (postArray.length === 0){
            gettingPosts();
        }
        
        console.log('update');
    }, []);

    return(
        <Card sx={postsBox_card_style}>
        <Stack spacing={2}>
           
                <Grid container justifyContent="space-between">
                    <Grid item xs = {2}>
                        <Typography
                        sx={postsBox_recentPosts_style}> Recent Posts </Typography>
                    </Grid>
                    <Grid item xs = {2}>
                        <SearchModal func={setPostArray}></SearchModal>
                    </Grid>
                    <Grid item xs ={2}>
                        <AddPostModal userId={user.userId} func={setCount} count={count}></AddPostModal>
                    </Grid>
                </Grid> 
            

            <Stack spacing={2} alignItems="center">
                {postArray}               
            </Stack>
                
                
        </Stack>
           
          

        </Card>
    );
}