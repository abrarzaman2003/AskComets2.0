import { Box, Grid, Typography } from "@mui/material";
import {  useEffect, useState } from "react";
import { getPost, getUser } from "../../back-end/service_functions";
import { CommentsBox } from "./CommentsBox";
import { User } from "../../back-end/userModel";

export function PostBox(props){

    const[post, setPost] = useState("");
    const [user, setUser] = useState("");

    useEffect(()=>{
        async function retrievePost(){
            const postObject = await getPost(props.id);
            await setPost(postObject);
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
        <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
                {post ? <CommentsBox post={post} ></CommentsBox> : <div></div>}           
            </Grid>

            <Grid item xs={1}></Grid>
        </Grid>
    </Box>);
} 
