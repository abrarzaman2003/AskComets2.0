import { Grid, Typography, Box, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Comment, incrementUpvote, decrementUpvote } from "../../back-end/commentObject";
import { addComment, upvoteComment, checkUserUpvote } from "../../back-end/service_functions";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { UserContext } from "../../App";
import { PostContext } from "../postPage";
import { upvoteBar_box_style } from "../Styling/CardStyling";
import { upvoteCard_upvoteButton_style } from "../Styling/ButtonStyling";
import { upvote_Count_style } from "../Styling/TypographyStyling";
import { textColor } from "../Styling/Colors";


export  function UpvoteBar(props){
    //take the comment object as a prop.
    const  [commentObject, setCommentObject] = useState(props.comment);
    const [upvoteCount, setUpvoteCount] = useState(props.comment.upvotes);
    const [disable , setDisable] = useState(true);
    const [upvoted, setUpvoted] = useState(false);

    const {user} = useContext(UserContext);
    const {post} = useContext(PostContext);

    const incrementUpvote = () =>{
        commentObject.incrementUpvote();
        setCommentObject(commentObject);
        setUpvoteCount(upvoteCount + 1);
        setUpvoted(true);
        console.log("incremented? ", upvoted);
        
    }

    const decrementUpvote = () =>{
        commentObject.decrementUpvote();
        setCommentObject(commentObject);
        setUpvoteCount(upvoteCount-1);
        setUpvoted(false);
    }

    const firestoreUpdate = async ()=>{
       
        console.log("upvoted? ", upvoted);

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
            
        } , [user, props.comment]
    );

    useEffect(
        ()=>{
            if (user.name==="Log In"){
                setDisable(true);
            }else{
                setDisable(false);
            }
            return() => {
                console.log("component unmounted");
                firestoreUpdate();
            };
            
        } , [user, firestoreUpdate]
    );

    const handleClick = () => {
        if (upvoted){
            decrementUpvote();
        }else{
            incrementUpvote();
        }
    }

    return(
        <Box sx={upvoteBar_box_style}>
            <Grid container alignItems='center' direction='row'>
                <Grid item xs={2}>
                    <Typography sx={upvote_Count_style}> {upvoteCount} </Typography>
                </Grid>

                <Grid item xs={1}>
                    <Button sx={upvoteCard_upvoteButton_style} onClick={handleClick} disabled={disable}> <ThumbUpIcon style={{ color: textColor }} /> </Button>
                </Grid>

                

            </Grid>
        </Box>
    );
}