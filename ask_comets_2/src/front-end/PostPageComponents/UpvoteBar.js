import { Grid, Typography, Box, Button } from "@mui/material";
import { useState } from "react";
import { Comment } from "../../back-end/commentObject";
import { addComment } from "../../back-end/service_functions";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

export  function UpvoteBar(props){
    //take the comment object as a prop.
    const [upvoteCount, setUpvoteCount] = useState(props.comment.upvotes);

    const incrementUpvote = () =>{
        console.log(props.comment);
        props.comment.incrementUpvote();
        setUpvoteCount(upvoteCount + 1);
        fun(props.comment);
    }

    const fun = async (cObject)=>{
        
        const a = await addComment(cObject);
        const b = await (a);
        console.log(b);
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
        }} onClick={incrementUpvote}> <ThumbUpIcon style={{ color: '#19647E' }} /> </Button>
                </Grid>

                

            </Grid>
        </Box>
    );
}