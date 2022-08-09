import { Card, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { askCometsLogo_text_style } from "../Styling/TypographyStyling";
import { askCometsLogo_card_style } from "../Styling/CardStyling";


// a simple functional component for the logo 
export function AskCometsLogo(){
    const link = "/"; 
    // the logo also serves as a link to the home page
    // the color and text decoration has to be inherited in order to avoid the text becoming blue links
    return(
        <Card sx={askCometsLogo_card_style}>
            
            <Link to={link} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <Typography sx={askCometsLogo_text_style}>
                    AskComets
                </Typography>
            </Link>
        </Card>
    );
}