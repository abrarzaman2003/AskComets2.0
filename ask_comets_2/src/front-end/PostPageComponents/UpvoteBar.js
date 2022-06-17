import { Grid, Typography, Box, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Comment, incrementUpvote, decrementUpvote } from "../../back-end/commentObject";
import { addComment, upvoteComment, checkUserUpvote } from "../../back-end/service_functions";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { UserContext } from "../../App";
import { PostContext } from "../postPage";


export  function UpvoteBar(props){
    //take the comment object as a prop.
    const  [commentObject, setCommentObject] = useState(props.comment);
    const [upvoteCount, setUpvoteCount] = useState(props.comment.upvotes);
    const [disable , setDisable] = useState(true);
    const [upvoted, setUpvoted] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const {user} = useContext(UserContext);
    const {post} = useContext(PostContext);

    const incrementUpvote = () =>{
        commentObject.incrementUpvote();
        setCommentObject(commentObject);
        //console.log(props.comment);
        setUpvoteCount(upvoteCount + 1);
        setUpvoted(true);
    }

    const decrementUpvote = () =>{
        commentObject.decrementUpvote();
        setCommentObject(commentObject);
        //console.log(props.comment);
        setUpvoteCount(upvoteCount-1);
        setUpvoted(false);
    }

    const firestoreUpdate = async ()=>{
        console.log(commentObject);

        await addComment(commentObject);
       
        await upvoteComment(commentObject, user, upvoted);
    
    }

    useEffect(
        ()=>{
            const a = async () =>{
                const uv = await checkUserUpvote(props.comment, user);
                setUpvoted(uv);
            }
            a();
            
        } , [user]
    );

    useEffect(
        ()=>{
            if (user.name=="Log In"){
                setDisable(true);
            }else{
                setDisable(false);
            }
            return() => {
                console.log("component unmounted");
                firestoreUpdate();
            };
            
        } , [user]
    );

    const handleClick = () => {
        if (upvoted){
            decrementUpvote();
        }else{
            incrementUpvote();
        }
    }

    return(
        <Box sx={{
            width: 'fit-content',
            height: 'fit-content',
            backgroundColor: '#F1DAC4',
            borderRadius: '10px',
            flexGrow: 1,
            m: 1
        }}>
            <Grid container alignItems='center' direction='row'>
                <Grid item xs={2}>
                    <Typography sx={{mx : 1}}> {upvoteCount} </Typography>
                </Grid>

                <Grid item xs={1}>
                    <Button sx={{
            backgroundColor: '#8FB8ED',
            borderRadius: '10px',
            color: '#000000',
            margin: 1,
            mx: 2
        }} onClick={handleClick} disabled={disable}> <ThumbUpIcon style={{ color: '#19647E' }} /> </Button>
                </Grid>

                

            </Grid>
        </Box>
    );
}