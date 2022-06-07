import { Card, Typography } from "@mui/material";
import { Link } from "react-router-dom";



export function AskCometsLogo(){
    const link = "/";

    return(
        <Card sx={{
            width: 'fit-content',
            backgroundColor: '#bAb86c',
            borderRadius: '21px',
        }}>
            
            <Link to={link} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <Typography sx={
                    {
                        fontSize: '70px',
                        padding: 1,
                    }
                }>
                    AskComets
                </Typography>
            </Link>
        </Card>
    );
}