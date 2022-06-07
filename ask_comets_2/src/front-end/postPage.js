import { Grid } from '@mui/material';
import { useParams } from "react-router";
import { AskCometsLogo } from './HomePageComponents/AskCometsLogo';
import { LoginButton } from './HomePageComponents/LoginButton';
import { CommentsBox} from './PostPageComponents/CommentsBox';


export function PostPage(){
    let {id} = useParams(); 
    return(
        <div>
        <Grid container direction='column' justifyContent='center' spacing={3}>
        
        
            <Grid item xs={4}>
                <Grid container spacing={0} alignItems="center">
                    <Grid item xs={1}></Grid>
                    <Grid item xs={4}>
                        <AskCometsLogo />
                    </Grid>
                    <Grid item xs={5}></Grid>
                    <Grid item xs={1}>
                        <LoginButton />    
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>
            </Grid>


            <Grid item xs={8}>
                <Grid container spacing={3}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}>
                            <CommentsBox id={id}></CommentsBox>
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>  
            </Grid>

        </Grid>
        </div>
        
    );
}