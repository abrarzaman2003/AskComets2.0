import { Card, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function PostCard( props ){
    const link = "/post/" + ""+ props.postId;

    
    return(
            
            <Card sx={{
                width: 0.95,
                backgroundColor: '#8FB8ED',
                borderRadius: '21px',
            }}>
                
                <Link to={link} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    <Typography sx={
                                {
                                    fontSize: '25px',
                                    padding: 1,
                                }
                            }> {props.postTitle} </Typography>
                    <Typography sx={
                                {
                                    fontSize: '20px',
                                    padding: 1,
                                }
                            }> {props.postBody} 
                    </Typography>
                </Link>
            </Card>
        
       
    );
}