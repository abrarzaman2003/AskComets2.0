import { Button, Card, Typography, Grid , Stack} from "@mui/material";
import { UpvoteBar } from "./UpvoteBar";
import { Comment } from "../../back-end/commentObject";

export function CommentCard(props){
    return(
            <Card sx={{
                width: 0.95,
                backgroundColor: '#8FB8ED',
                borderRadius: '21px',
            }}>
                <Stack alignItems="left">
                    <Typography sx={
                                {
                                    fontSize: '20px',
                                    padding: 1,
                                }
                            }> {props.commentObject.commentBody} </Typography>


                    <UpvoteBar comment={props.commentObject}></UpvoteBar>
                </Stack>
                    
            </Card>
        
       
    );
}