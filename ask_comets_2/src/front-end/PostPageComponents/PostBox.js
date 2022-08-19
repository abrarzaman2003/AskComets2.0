import { Box, Grid, Typography } from "@mui/material";
import {  useContext, useEffect, useState } from "react";
import { getPost, getUser } from "../../back-end/service_functions";
import { CommentsBox } from "./CommentsBox";
import { User } from "../../back-end/userModel";
import { Post } from "../../back-end/postModel";
import { ResolveButton } from "./ResolveButton";
import { PostContext, PostProvider } from "../postPage";
import { postBox_box_style } from "../Styling/CardStyling";
import { postBox_postBody_style, postBox_postTitle_style, postBox_user_style } from "../Styling/TypographyStyling";

export function PostBox(props){

    const {post, setPost} = useContext(PostContext);
    const [user, setUser] = useState("");
    const [date,setDate] = useState("");

    useEffect(()=>{
        async function retrievePost(){
            const postObject = await getPost(props.id);
            await setPost(postObject);
            //console.log(postObject);
            console.log(postObject.timeStamp);
            const newDate = postObject.timeStamp.toDate();
            
            const dateString = await newDate.toUTCString();
            setDate(await dateString);

            return postObject;
        }
        async function retrieveUser(postObject){
            const u = await getUser(postObject.userId);
            await setUser(u);
        }
        retrievePost().then((postObject) => retrieveUser(postObject));
        
    },[]);



    return(<Box sx={postBox_box_style}>
        <Grid container justifyContent="space-between">
        <Grid item>
            <Typography sx={postBox_postTitle_style}> {post.postTitle} </Typography>
            <Typography sx={postBox_postBody_style}> {post.postBody} </Typography>
            <Typography sx={postBox_user_style}> Posted by: {user.name} </Typography>
            <Typography sx={postBox_user_style}> Posted on: {date} </Typography>

        </Grid>

        <Grid item>
            <ResolveButton></ResolveButton>
        </Grid>

        </Grid>
        <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
                {post ? <CommentsBox ></CommentsBox> : <h1>loading</h1>}           
            </Grid>

            <Grid item xs={1}></Grid>
        </Grid>
    </Box>);
} 
