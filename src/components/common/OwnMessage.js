import { Grid, Paper, Typography } from "@material-ui/core"
import StyleHook from "../hooks/style.hook";

const OwnMessage = (props) => {
    const [classes] = StyleHook();
    return (
        <>
            <Grid container alignContent="flex-end" direction="column" style={{marginRight:'auto'}}>
                <Paper className={classes.msgOwn} style={{marginRight:'auto', padding:5, minWidth:50, borderRadius:10}}>
                    <Grid container alignContent="flex-end" style={{textAlign:'right', marginRight:'auto'}}>
                        <Typography style={{ marginRight:'auto', color:'#fff'}} variant="h6">{props.msg}</Typography>
                    </Grid>
                </Paper>
            </Grid>
        </>
    )
}

export default OwnMessage;