import { Box, Grid, Typography } from "@mui/material";
import {  useContext, useEffect, useState } from "react";
import { getPost, getUser } from "../../back-end/service_functions";
import { CommentsBox } from "./CommentsBox";
import { User } from "../../back-end/userModel";
import { Post } from "../../back-end/postModel";
import { ResolveButton } from "./ResolveButton";
import { PostContext, PostProvider } from "../postPage";

export function PostBox(props){

    const {post, setPost} = useContext(PostContext);
    const [user, setUser] = useState("");

    useEffect(()=>{
        async function retrievePost(){
            const postObject = await getPost(props.id);
            await setPost(postObject);
            console.log(postObject);
            return postObject;
        }
        async function retrieveUser(postObject){
            const u = await getUser(postObject.userId);
            await setUser(u);
        }
        retrievePost().then((postObject) => retrieveUser(postObject));

    },[]);


    return(<Box sx={{
        width: 1 ,
        height: "fit-content",
        backgroundColor: '#8FB8ED',
        borderRadius: '21px',
        paddingBottom: 3
    }}>
        <Grid container justifyContent="space-between">
        <Grid item>
            <Typography sx={
                                    {
                                        fontSize: '40px',
                                        padding: 1,
                                    }
                                }> {post.postTitle} </Typography>
            <Typography sx={
                        {
                            fontSize: '30px',
                            padding: 1,
                        }
                    }> {post.postBody} </Typography>
            <Typography sx={
                            {
                                fontSize: '20px',
                                padding: 1,
                            }
                        }> Posted by: {user.name} </Typography>

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
