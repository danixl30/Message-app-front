import { Grid, Typography } from "@material-ui/core"

const NotSelectedChat = () =>{
    return (
        <>
            <Grid container alignItems="center" justifyContent="center" direction="column">
                <Grid item xs>
                    <Typography style={{color:'#ffff'}}variant="h6">Not chat selected</Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default NotSelectedChat;
