import { Card, Typography } from "@mui/material";

export function CommentCard(props){
    return(
            <Card sx={{
                width: 0.95,
                backgroundColor: '#8FB8ED',
                borderRadius: '21px',
            }}>
                
                    <Typography sx={
                                {
                                    fontSize: '20px',
                                    padding: 1,
                                }
                            }> {props.commentBody} </Typography>
            </Card>
        
       
    );
}