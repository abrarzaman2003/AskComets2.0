import { Card, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { postCard_card_style } from "../Styling/CardStyling";
import { postCard_postBody_style, postCard_postTitle_style } from "../Styling/TypographyStyling";

export function PostCard( props ){
    const link = "/post/" + props.postId;
    return(
            <Card sx={postCard_card_style}>
                <Link to={link} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    <Typography sx={postCard_postTitle_style}> {props.postTitle} </Typography>
                    <Typography sx={postCard_postBody_style}> {props.postBody} 
                    </Typography>
                </Link>
            </Card>
        
       
    );
}