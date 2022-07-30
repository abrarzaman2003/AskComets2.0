import { Card, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { askCometsLogo_text_style } from "../Styling/TypographyStyling";
import { askCometsLogo_card_style } from "../Styling/CardStyling";



export function AskCometsLogo(){
    const link = "/";
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