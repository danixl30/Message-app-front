import { Button, Container, Grid, Paper, Tooltip, Typography, TextField, IconButton, Avatar } from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PasswordInput from "../common/PasswordInput";
import StyleHook from "../hooks/style.hook";
import ErrorMessage from "../common/error.message";
import { signup } from "../API/Request.API";

const SignupDisplay = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState();
    const [errorPassword, setErrorPassword] = useState('');
    const [errorConfirm, setErrorConfirm] = useState('');
    const [errorImage, setErrorImage] = useState('');
    const [errorEmail, setErrorEmail] = useState('');

    const history = useHistory();

    const [classes] = StyleHook();

    const onChange = async (e) => {
        //console.log(e.target.name)
        if (e.target.name === 'username'){
            await setUsername(e.target.value);
        }

        if (e.target.name === 'password'){
            await setPassword(e.target.value.trim());
        }

        if (e.target.name === 'email'){
            await setEmail(e.target.value);
        }

        if (e.target.name === 'confirmPassword'){
            await setConfirmPassword(e.target.value.trim());
        }
    }

    useEffect(() => {

        if (password.includes(' ')){
            setErrorPassword('The password must not to contain white spaces')
        }else{
            setErrorPassword('');
        }
    }, [password])

    useEffect(() => {
        if (confirmPassword.includes(' ')){
            setErrorConfirm('The password must not to contain white spaces')
        }else if (confirmPassword.trim().length > 0 && confirmPassword !== password && password.trim().length > 0){
            setErrorConfirm('The passwords are not the same')
        }else{
            setErrorConfirm('');
        }
    }, [confirmPassword, password])

    useEffect(() => {
        if (email.trim().length > 0 && (!email.includes('@') || !email.includes('.'))){
            setErrorEmail('This is not an email')
        }else{
            setErrorEmail('');
        }
    }, [email])

    const onChangeImage = (e) => {
        const file = e.target.files[0];
        console.log(file);
        setImage(null);
        setErrorImage('');
        if (file && file.type.includes('image')){
            const reader = new FileReader();
            reader.onloadend = () => {
                //console.log(reader.result);
                setImage(reader.result);
            }
            reader.readAsDataURL(file);
        }else{
            setErrorImage('This file is not an image');
        }
    }

    const onClickSignup = async () => {
        if (errorEmail === '' && errorPassword === '' && errorConfirm === '' && errorImage === ''){
            if (username.trim !== '' && password.trim() !== '' && confirmPassword !== '' && email !== ''){
                if (password === confirmPassword){
                    const data = await signup(username, email, password, confirmPassword, image);
                    console.log(data);
                    if (data.status === false){
                        toast.error(data.msg);
                    }else{
                        toast.success('User created sucessfully');
                        history.replace('/login')
                    }
                }else {
                    toast.warning('The passwords are not the same');
                }
            }else {
                toast.warning('The boxes are not to be empty');
            }
        }else {
            toast.warning('You have errors...');
        }
    }

    return (
        <>
            <Container>
                <Tooltip title = "Go to Home">
                    <Button className={classes.backHomeBTN} variant="outlined" startIcon={<ArrowBackIosIcon/>} onClick={e => history.replace('/')}/>
                </Tooltip>
                <Grid container alignItems="center" direction="column" spacing={2}>
                    <Typography style={{color:'#ffff'}} variant="h3">
                       Signup 
                    </Typography>
                    <Grid style={{marginTop:10}} item xs>
                        <Paper className={classes.paperForm}>
                           <Grid spacing={3} container direction="column" alignItems="center">
                                <Grid item xs = {12}>
                                    <Grid container spacing={3}>
                                        <Grid item xs = {6}>
                                            <TextField InputProps={{className:classes.textFieldStyles}} InputLabelProps={{className:classes.textFieldStylesLabel}} id="username" label="Username" value={username} name = "username" onChange={onChange} onKeyPress={ e => {if (e.key === 'Enter') onClickSignup()}}/> 
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField InputProps={{className:classes.textFieldStyles}} InputLabelProps={{className:classes.textFieldStylesLabel}} value={email} onChange={onChange} id= "email" label= "email" name="email" onKeyPress={ e => {if (e.key === 'Enter') onClickSignup()}}/>
                                            {errorEmail &&
                                                <ErrorMessage error={errorEmail}/>
                                            }
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid xs = {12}>
                                    <Grid container spacing={3}>
                                        <Grid item xs = {6}>
                                            <PasswordInput name="password" label="Password" value={password} onChangePass = {onChange} onKeyPress={ e => {if (e.key === 'Enter') onClickSignup()}}/>
                                            {errorPassword !== '' &&
                                                <ErrorMessage error={errorPassword}/>
                                            }
                                        </Grid>
                                        <Grid item xs = {6}>
                                            <PasswordInput name = "confirmPassword" label="Confirm password" value={confirmPassword} onChangePass = {onChange} onKeyPress={e => {if (e.key === 'Enter') onClickSignup()}}/>
                                            {errorConfirm !== '' &&
                                                <ErrorMessage error={errorConfirm}/>
                                            }
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} justifyContent="center">
                                    <Typography style={{color:'#ffff'}} variant="body2">
                                        Image profile
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={1} alignItems="center" justifyContent="center">
                                        <Grid item xs={6}>
                                            <input accept="image/*" style={{display:'none'}} id="icon-button-file" type="file" onChange={onChangeImage}/>
                                            <label htmlFor="icon-button-file">
                                                <Tooltip title="Select an image">
                                                  <IconButton style={{color:'#DE6100'}} aria-label="upload picture" component="span">
                                                    <PhotoCamera />
                                                 </IconButton>  
                                                </Tooltip>
                                                
                                            </label>
                                        </Grid>
                                        <Grid item xs={6}>
                                            {image? 
                                                <Avatar src={image} alt="Image profile" style={{width:60, height:60}}/>: <AccountCircleIcon className={classes.colorIconUsers} style={{width:60, height:60}}/>
                                            }
                                        </Grid>
                                        {errorImage !== '' &&
                                            <Grid item xs={12}>
                                                <ErrorMessage error={errorImage}/>
                                            </Grid>
                                        }
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button className={classes.confirmFormBTN} variant="outlined" startIcon={<DoneOutlineIcon/>} onClick={onClickSignup}>
                                    Signup 
                                    </Button>
                                </Grid>
                           </Grid>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Typography style={{color:'#ffff'}} variant="body2">
                            You have an account? <Link to="/login">Login</Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default SignupDisplay;