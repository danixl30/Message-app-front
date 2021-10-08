import { Button, Container, Grid, Paper, Tooltip, Typography, TextField } from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import Cookies from 'js-cookie';
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { login } from "../API/Request.API";
import { toast } from "react-toastify";
import PasswordInput from "../common/PasswordInput";
import StyleHook from "../hooks/style.hook";

const LoginDisplay = () => {

    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const [classes] = StyleHook();

    const history = useHistory();

    const onChangeInput = (e) => {
        if (e.target.name === 'username'){
            setUsername(e.target.value);
        }

        if (e.target.name === 'password'){
            setPassword(e.target.value.trim());
        }
    }

    const onClickLogin = async () => {
        if (username.trim() !== '' && password.trim() !== ''){
            const data = await login(username, password);
            console.log(data);
            if (data.status){
                Cookies.set('id', data.token);
                history.replace('/');
            }else{
                toast.error(data.msg);
            }
        }else{
            toast.warning('The boxes are not to be empty');
        }
    }

    return (
        <>
            <Container>
                <Tooltip title = "Go to Home">
                    <Button className={classes.backHomeBTN} variant="outlined" startIcon={<ArrowBackIosIcon/>} onClick = {e => history.replace('/')}/>
                </Tooltip>
                <Grid container alignItems="center" direction="column">
                    <Typography style={{color:'#ffff'}} variant="h3">
                        Login
                    </Typography>
                    <Grid style={{marginTop:10}} item xs={3}>
                        <Paper className={classes.paperForm}>
                           <Grid spacing = {2} container direction="column" alignItems="center">
                                <Grid item xs = {12}>
                                    <TextField InputProps={{className:classes.textFieldStyles}} InputLabelProps={{className:classes.textFieldStylesLabel}} id="username" label="Username" value={username} name = "username" onChange={onChangeInput} onKeyPress={e => {if(e.key === "Enter") onClickLogin()}}/> 
                                </Grid>
                                <Grid item xs = {12}>
                                    <PasswordInput name = "password" label="Password" value={password} onChangePass = {onChangeInput} onKeyPress={e => {if(e.key === "Enter") onClickLogin()}}/>
                                </Grid>
                                <Grid item xs = {12}>
                                    <Button className={classes.confirmFormBTN} style={{marginTop:10}} variant="outlined" startIcon={<DoneOutlineIcon/>} onClick={e => onClickLogin()}>
                                        Login
                                    </Button>
                                </Grid>
                           </Grid>
                        </Paper>
                    </Grid>
                    <Typography style={{marginTop:10, color:'#ffff'}} variant="body2">
                        You not have an account? <Link to="/signup">Signup</Link>
                    </Typography>
                </Grid>
            </Container>
        </>
    )
}

export default LoginDisplay;