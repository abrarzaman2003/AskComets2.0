import { Button, Card, Typography, Grid , Stack} from "@mui/material";
import { UpvoteBar } from "./UpvoteBar";
import { Comment } from "../../back-end/commentObject";
import { useEffect, useState } from "react";
import { getUser } from "../../back-end/service_functions";
import { User } from "../../back-end/userModel";

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
                            <Typography sx={
                                {
                                    fontSize: '15px',
                                    padding: 1,
                                }
                            }> Commented By: {user.name} </Typography>


                    <UpvoteBar comment={props.commentObject}></UpvoteBar>
                </Stack>
                    
            </Card>
        
       
    );
}