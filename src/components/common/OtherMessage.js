import { Grid, Paper, Typography } from "@material-ui/core"
import StyleHook from "../hooks/style.hook";

const OtherMessage = (props) => {
    const [classes] = StyleHook()
    return (
        <>
            <Grid container alignContent="flex-start" alignItems="center" direction="column">
                <Paper className={classes.msgOther} style={{width:'auto', padding:5, minWidth:50, borderRadius:10}}>
                    {props.username && 
                        <Typography style={{color:'#7C00D2', fontWeight:'bold'}} variant="h5">{props.username}</Typography>
                    }
                    <Typography style={{color:'#ffff'}} variant="h6">{props.msg}</Typography>
                </Paper>
            </Grid>
        </>
    )
}

export default OtherMessage;