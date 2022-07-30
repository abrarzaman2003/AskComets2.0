import { Button, Card, Typography, Grid , Stack} from "@mui/material";
import { UpvoteBar } from "./UpvoteBar";
import { Comment } from "../../back-end/commentObject";
import { useEffect, useState } from "react";
import { getUser } from "../../back-end/service_functions";
import { User } from "../../back-end/userModel";
import { commentCard_card_style } from "../Styling/CardStyling";
import { commentCard_body_style, commentCard_user_style} from "../Styling/TypographyStyling";

export function CommentCard(props){
    const [user, setUser] = useState("");
    useEffect(()=>{
        async function retrieveUser(){
            const u = await getUser(props.commentObject.userId);
            await setUser(u);
        }

        retrieveUser();
    },[]);

    return(
            <Card sx={commentCard_card_style}>
                <Stack alignItems="left">
                    <Typography sx={commentCard_body_style}> {props.commentObject.commentBody} </Typography>
                            <Typography sx={commentCard_user_style}> Commented By: {user.name} </Typography>
                    <UpvoteBar comment={props.commentObject}></UpvoteBar>
                </Stack>
                    
            </Card>
        
       
    );
}