import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useHistory } from "react-router-dom";
import StyleHook from "../hooks/style.hook";

const MainDisplay = () => {
    const [classes] = StyleHook();
    const history = useHistory();
    return(
        <>
            <Container alignItems="center">
                <Grid spacing={0} container direction="column" justifyContent="center" alignItems="center">
                    <Box m={6}>
                        <Typography style={{color:'#ffff'}} variant="h2">
                            Welcome to Message App
                        </Typography>
                    </Box>
                    <Box>
                        <Typography style={{color:'#ffff'}} variant="h4">
                            Please login or signup
                        </Typography>
                    </Box>
                    <Grid style={{padding:5}} item xs={3}>
                        <Button className={classes.mainBTN} style={{marginRight:10}} startIcon={<PersonIcon/>} variant="contained" onClick={e => history.push('/login')}>Login</Button>
                        <Button className={classes.mainBTN} startIcon={<PersonAddIcon/>} variant="contained" onClick={e => history.push('/signup')}>Signup</Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default MainDisplay;