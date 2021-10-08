import { Button, Divider, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, TextField, Typography, Avatar, Tooltip } from "@material-ui/core"
import ModalLayout from "../common/ModalLayout"
import StyleHook from "../hooks/style.hook"
import CloseIcon from '@material-ui/icons/Close'
import LockIcon from '@material-ui/icons/Lock'
import DeleteIcon from '@material-ui/icons/Delete'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import EmailIcon from '@material-ui/icons/Email'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import SettingsIcon from '@material-ui/icons/Settings'
import BlockIcon from '@material-ui/icons/Block'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Cookies from 'js-cookie';
import { useState, useEffect, useContext } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorMessage from "../common/error.message"
import { deleteUser, getUsername, updateEmail, updateImage, updatePass, updateUsername, verifyUser } from "../API/Request.API"
import ChatContext from "../../context/Chat/ChatContext"
import PasswordInput from "../common/PasswordInput"
import CheckIcon from '@material-ui/icons/Check'

const AccountOptions = (props) => {

    const chatContext = useContext(ChatContext);

    const [secction, setSecction] = useState('');
    const [title, setTitle] = useState('Settings');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [phasePass, setPhasePass] = useState(false);
    const [originalPass, setOriginalPass] = useState('');
    const [newPass, setNewpass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [errorConfirm, setErrorConfirm] = useState('');
    const [image, setImage] = useState(chatContext.image);

    const [classes] = StyleHook();    

    const changeSecction = (newSecction, newTitle) => {
        setError('');
        setUsername('');
        setEmail('');
        setTitle(newTitle);
        setConfirmPass('');
        setPhasePass(false);
        setOriginalPass('');
        setErrorConfirm('');
        setNewpass('');
        setSecction(newSecction);
    }

    const onClose = () => {
        changeSecction('', 'Settings');
        setError('');
        setEmail('');
        setUsername('');
        props.onClose();
    }

    const onChangeItems = (e) => {
        if (e.target.name === 'username'){
            setUsername(e.target.value);
        }

        if (e.target.name === 'email'){
            setEmail(e.target.value);
        }

        if (e.target.name === 'originalPass'){
            setOriginalPass(e.target.value.trim());
        }

        if(e.target.name === 'newPass'){
            setNewpass(e.target.value.trim());
        }

        if(e.target.name === 'confirmNewPass'){
            setConfirmPass(e.target.value.trim());
        }
    }

    const onChangeImage = (e) => {
        const file = e.target.files[0];
        console.log(file);
        setImage(null);
        if (file && file.type.includes('image')){
            const reader = new FileReader();
            reader.onloadend = () => {
                //console.log(reader.result);
                setImage(reader.result);
            }
            reader.readAsDataURL(file);
        }else{
            toast.warning('This file is nor an image');
        }
    }

    useEffect(() => {
        if (email.trim().length > 0 && (!email.includes('@') || !email.includes('.'))){
            setError('This is not an email')
        }else{
            setError('');
        }
    }, [email]);

    const onClickUpdateUsername = async () => {
        if (error === ''){
            if (username.trim() !== ''){
                const data = await updateUsername(Cookies.get('id'), username);
                console.log(data);
                if (data.status){
                    chatContext.setUsername(username);
                    onClose();
                }
            }else{
                toast.warning('The username must not to be empty');
            }
        }else{
            toast.warning('You have errors...');
        }
    }


    const onClickUpdateEmail = async () => {
        if (error === ''){
            if (email.trim() !== ''){
                const data = await updateEmail(Cookies.get('id'), email);
                console.log(data);
            }else{
                toast.warning('The email must not to be empty');
            }
        }else{
            toast.warning('You have errors...');
        }
    }

    const onClickYesLogout = async (e) => {
        const data = await deleteUser(Cookies.get('id'));
        if (data.status){
            props.logout();
        }
    }

    const onClickVerify = async () => {
        if (error === ''){
            if (originalPass.trim() !== ''){
                const data = await verifyUser(Cookies.get('id'), originalPass);
                console.log(data);
                if (data.status){
                    setPhasePass(true);
                }else{
                    toast.error(data.msg);
                }
            }else{
                toast.warning('The password must not to be empty');
            }
        }else{
            toast.warning('You have errors...');
        }
    }

    const onClickUpdatePass = async () => {
        if (error === ''){
            if (newPass.trim() !== '' && confirmPass.trim() !== ''){
                if (newPass === confirmPass){
                    const data = await updatePass(Cookies.get('id'), newPass);
                    if (data.status){
                        onClose();
                    }
                }else {
                    toast.warning('The passwords are not the same');
                }
            }else{
                toast.warning('The password must not to be empty');
            }
        }else{
            toast.warning('You have errors...');
        }
    }

    const onClickUpdateImage = async () => {
        if (image){
            const data = await updateImage(image? image : 'none');
            if (data.status){
                const dataIm = await getUsername(Cookies.get('id'));
                if (dataIm.status){
                    chatContext.setImage(dataIm.image);
                }
            }
        }
    }

    useEffect(() => {

        if (newPass.includes(' ')){
            setError('The password must not to contain white spaces')
        }else{
            setError('');
        }
    }, [newPass])

    useEffect(() => {
        if (confirmPass.includes(' ')){
            setErrorConfirm('The password must not to contain white spaces')
        }else if (confirmPass.trim().length > 0 && confirmPass !== newPass && newPass.trim().length > 0){
            setErrorConfirm('The passwords are not the same')
        }else{
            setErrorConfirm('');
        }
    }, [confirmPass, newPass])

    return(
        <>
            <ModalLayout open={props.open} onClose={onClose}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs = {12}>
                        <Grid container spacing={1} justifyContent="flex-end">
                            {secction !== '' &&
                                <Grid item xs={2}>
                                    <IconButton onClick={e => changeSecction('', 'Settings')}>
                                        <ArrowBackIosIcon style={{color:'#ffff'}}/>
                                    </IconButton>
                                </Grid>
                            }
                            <Grid item xs = {8}>
                                <Grid container spacing={0} alignItems="center" justifyContent="flex-start">
                                    <Grid item xs={2}>
                                        {secction==='' && <SettingsIcon className={classes.styleIconsBar}/>}
                                        {secction==='username' && <AccountBoxIcon className={classes.styleIconsBar}/>}
                                        {secction==='email' && <EmailIcon className={classes.styleIconsBar}/>}
                                        {secction==='password' && <LockIcon className={classes.styleIconsBar}/>}
                                        {secction==='delete' && <DeleteIcon className={classes.styleIconsBar}/>}
                                        {secction==='image' && <AccountCircleIcon className={classes.styleIconsBar}/>}
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Typography style={{color:'#ffff'}}variant="h4">
                                            {title}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton onClick={onClose}>
                                    <CloseIcon className={classes.exitBTN}/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs = {12}>
                        {secction==='' && 
                            <List component="nav">
                                <Paper className={classes.paperAccount}>
                                    <Grid container spacing={3} alignContent="center" alignItems="center" direction="column">
                                        <Grid item xs={12}>
                                            {chatContext.image? <Avatar src={chatContext.image} style={{width:150, height:150}}/>: <AccountCircleIcon style={{width:150, height:150}}/>}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography className={classes.colorUsername} variant="h6">{chatContext.username}</Typography>
                                        </Grid>
                                    </Grid>
                                </Paper>
                                <Divider style={{marginTop:20, backgroundColor:'#F16C03'}}/>
                                <ListItem classes={{root:classes.hoverListItems}} button onClick={e => changeSecction('username', 'Change username')}>
                                    <ListItemIcon>
                                        <AccountBoxIcon style={{color:'#F3D600'}}/>
                                    </ListItemIcon>
                                    <ListItemText style={{color:'#F3D600'}}primary="Change username"/>
                                </ListItem>
                                <ListItem classes={{root:classes.hoverListItems}} button onClick={e => changeSecction('email', 'Change email')}>
                                    <ListItemIcon>
                                        <EmailIcon style={{color:'#8100F3'}}/>
                                    </ListItemIcon>
                                    <ListItemText style={{color:'#8100F3'}}primary="Change email"/>
                                </ListItem>
                                <ListItem classes={{root:classes.hoverListItems}} button onClick={e => changeSecction('image', 'Change image profile')}>
                                    <ListItemIcon>
                                        <AccountCircleIcon style={{color:'#3CB404'}}/>
                                    </ListItemIcon>
                                    <ListItemText style={{color:'#3CB404'}}primary="Change image profile"/>
                                </ListItem>
                                <ListItem classes={{root:classes.hoverListItems}} button onClick={e => changeSecction('password', 'Change password')}>
                                    <ListItemIcon>
                                        <LockIcon style={{color:'#F37A00'}}/>
                                    </ListItemIcon>
                                    <ListItemText style={{color:'#F37A00'}}primary="Change password"/>
                                </ListItem>
                                <ListItem classes={{root:classes.hoverListItems}} button onClick={e => changeSecction('delete', 'Delete user')}>
                                    <ListItemIcon>
                                        <DeleteIcon style={{color: '#A20000'}}/>
                                    </ListItemIcon>
                                    <ListItemText style={{color: '#A20000'}}primary="Delete user"/>
                                </ListItem>
                                <Divider style={{backgroundColor:'#F16C03'}}/>
                            </List>
                        }
                        {secction==='username' &&
                            <Grid container direction="column" alignContent="center" alignItems="center" spacing={2}>
                                <Grid item xs ={12}>
                                    <Typography style={{color:'#ffff'}}variant="body1">Insert the new username</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField InputProps={{className:classes.textFieldStyles}} InputLabelProps={{className:classes.textFieldStylesLabel}} label="Username" name="username" value={username} onChange={onChangeItems}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button style={{color:'#DCDCDC'}}onClick={onClickUpdateUsername} startIcon={<AutorenewIcon style={{color:'#DCDCDC'}}/>}>Update</Button>
                                </Grid>
                            </Grid>
                        }
                        {secction==='email' && 
                            <Grid container direction="column" alignContent="center" alignItems="center" spacing={2}>
                                <Grid item xs ={12}>
                                    <Typography style={{color:'#ffff'}}variant="body1">Insert the new email</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField InputProps={{className:classes.textFieldStyles}} InputLabelProps={{className:classes.textFieldStylesLabel}} label="Email" name="email" value={email} onChange={onChangeItems}/>
                                </Grid>
                                {error &&
                                    <Grid item xs={12}>
                                        <ErrorMessage error={error}/>
                                    </Grid>
                                }
                                <Grid item xs={12}>
                                    <Button style={{color:'#DCDCDC'}}onClick={onClickUpdateEmail} startIcon={<AutorenewIcon style={{color:'#DCDCDC'}}/>}>Update</Button>
                                </Grid>
                            </Grid>
                        }
                        {secction==='delete' &&
                            <Grid container direction="column" alignItems="center" spacing={1}>
                                <Grid item xs={12}>
                                    <Typography style={{color:'#ffff'}}variant="h6">Are you sure that you want to delete this user?</Typography>            
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={4}>
                                        <Grid item xs={6}>
                                            <Button style={{color: '#A20000'}}onClick={onClickYesLogout} startIcon={<DeleteIcon/>}>Yes</Button>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button style={{color:'#039AF1'}} startIcon={<BlockIcon/>} onClick={e => changeSecction('', 'Settings')}>No</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        }
                        {secction==='password' &&
                            <>
                                {phasePass? 
                                    <Grid container direction="column" alignContent="center" alignItems="center" spacing={2}>
                                        <Grid item xs ={12}>
                                            <Typography InputProps={{className:classes.textFieldStyles}} InputLabelProps={{className:classes.textFieldStylesLabel}} style={{color:'#ffff'}}variant="body1">Put your new password</Typography>
                                        </Grid>
                                        <Grid item xs={5}>
                                           <PasswordInput onChangePass={onChangeItems} value={newPass} name="newPass" label="Password"/> 
                                            {error!== '' &&
                                                <ErrorMessage error={error}/>
                                            }
                                        </Grid>
                                        <Grid item xs={5}>
                                           <PasswordInput onChangePass={onChangeItems} value={confirmPass} name="confirmNewPass" label="Confirm password"/> 
                                            {errorConfirm !== '' &&
                                                <ErrorMessage error={errorConfirm}/>
                                            }
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button style={{color:'#DCDCDC'}}onClick={onClickUpdatePass} startIcon={<AutorenewIcon style={{color:'#DCDCDC'}}/>}>Update</Button>
                                        </Grid>
                                    </Grid>
                                : 
                                    <Grid container direction="column" alignContent="center" alignItems="center" spacing={2}>
                                        <Grid item xs ={12}>
                                            <Typography style={{color:'#ffff'}}variant="body1">Put your current password</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                           <PasswordInput onChangePass={onChangeItems} value={originalPass} name="originalPass" label="Password"/> 
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button style={{color:'#00A359'}} onClick={onClickVerify} startIcon={<CheckIcon/>}>Verify</Button>
                                        </Grid>
                                    </Grid>
                                }
                            </>
                        }
                        {secction==='image' &&
                            <Grid container direction="column" alignItems="center" spacing={1}>
                                <Grid item xs={12}>
                                    <Typography style={{color:'#ffff'}}variant="h6">Change your image profile</Typography>            
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container justifyContent="center" alignItems="center">
                                        <Grid item xs={6}>
                                            <input accept="image/*" style={{display:'none'}} id="icon-button-file" type="file" onChange={onChangeImage}/>
                                            <label htmlFor="icon-button-file">
                                                <Tooltip title="Select an image">
                                                   <IconButton aria-label="upload picture" component="span">
                                                    {image? 
                                                        <Avatar src={image} alt="Image profile" style={{width:60, height:60}}/>: <AccountCircleIcon style={{width:60, height:60}} className={classes.colorIconUsers}/>
                                                    }
                                                    </IconButton> 
                                                </Tooltip>
                                                
                                            </label>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button style={{color: '#A20000'}}startIcon={<DeleteIcon/>} onClick={() => setImage(null)}>Delete</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button style={{color:'#DCDCDC'}}onClick={onClickUpdateImage} startIcon={<AutorenewIcon style={{color:'#DCDCDC'}}/>}>Update</Button>
                                </Grid>
                            </Grid>
                        }
                    </Grid>
                </Grid>
            </ModalLayout>
        </>
    )
}

export default AccountOptions;