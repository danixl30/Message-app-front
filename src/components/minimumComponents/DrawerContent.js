import { Divider, Grid, IconButton, Paper, Typography, Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, TextField, Tooltip } from "@material-ui/core"
import CloseIcon from '@material-ui/icons/Close'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import AutorenewIcon from '@material-ui/icons/Autorenew'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from "react"
import ChatContext from "../../context/Chat/ChatContext"
import { addMember, deleteChat, deleteMember, listChats, listMembers, setAdmin, unsetAdmin, updateGroupImage, updateGroupName } from "../API/Request.API";
import ItemMember from "../common/ItemMember";
import King from "../assets/img/king.svg";
import AddUser from "./AddUser";
import Socket from "../API/Socket";
import StyleHook from "../hooks/style.hook";

const DrawerContent = (props) => {

    const [classes] = StyleHook();

    const chatContext = useContext(ChatContext);

    const [normal, setNormal] = useState([]);
    const [admin, setAdmins] = useState([]);
    const [youAdmin, setYouAdmin] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [textName, setTextName] = useState(chatContext.selected.name);
    const [image, setImage] = useState(chatContext.selected.image);

    const onClickDelete = async (e) => {
        if (chatContext.selected.type === 'individual'){
            const data = await deleteChat(Cookies.get('id'), chatContext.selected.name);
            if (data.status){
                Socket.emit('deleteChat', {to: chatContext.selected.name, from: chatContext.username})
                props.onClose();
                chatContext.setSelected(null);
                obtainChats();
            }
        }else {
            if (youAdmin && normal.length > 0 && admin.length <= 0 ){
                return
            }
            const data = await deleteMember(null, chatContext.selected.name);
            if (data.status){
                Socket.emit('deleteGroup', {name: chatContext.selected.name});
                chatContext.setSelected(null);
                chatContext.setGroups();
                props.onClose();
            }
        }
    }

    const deleteUser = async (item) => {
        onClose();
        const data = await deleteMember(item.username, chatContext.selected.name);
        if (data.status){
            Socket.emit('deleteGroup', {name: chatContext.selected.name, username: item.username});
            obtainMembers();
        }
    }

    const putAdmin = async (item) => {
        const data = await setAdmin(item.username, chatContext.selected.name);
        if (data.status){
            obtainMembers();
        }
    }

    const deleteAdmin = async (item) => {
        const data = await unsetAdmin(item.username, chatContext.selected.name);
        if (data.status){
            obtainMembers();
        }
    }

    const obtainChats = async () => {
        const data = await listChats(Cookies.get('id'));
        if (data.status){
            chatContext.setChats(data.chats);
        } 
    }

    const obtainMembers = async () => {
        const data = await listMembers(Cookies.get('id'), chatContext.selected.name);
        if (data.status){
            setNormal(data.normal);
            setAdmins(data.admins);
            setYouAdmin(data.userAdmin);
        }
    }

    useEffect(() => {
        if (chatContext.selected.type === 'group'){
            obtainMembers();
        }
    }, []);

    const onClose = () => {
        setOpenAdd(false);
    }

    const onAddUser = async (item) => {
        if (!admin.find(data => data.username === item.username) && !normal.find(data => data.username === item.username)){
            const data = await addMember(chatContext.selected.name, item.username);
            if (data.status){
                obtainMembers();
                onClose();
            }
        }
    }

    const onChangeName = (e) => {
        setTextName(e.target.value);
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
            //toast.warning('This file is nor an image');
        }
    }

    const onClickUpdate = async () => {
        const data = await updateGroupName(chatContext.selected.name, textName.trim());
        if (data.status){
            chatContext.setGroups();
            chatContext.setSelected({name: textName.trim(), image: chatContext.selected.image, type: chatContext.selected.type});
        }
    }

    const onClickUpdateImage = async () => {
        const data = await updateGroupImage(chatContext.selected.name, image);
        if (data.status){
            chatContext.setGroups();
            const image = chatContext.groups.find(group => group.name === chatContext.selected.name);
            chatContext.setSelected({name: chatContext.selected.name, image: image.image, type: chatContext.selected.type});
        }
    }

    return(
        <div className={classes.drawerStyles}>
            <AddUser open={openAdd} onClose={onClose} onClickItem = {onAddUser}/>
            <Grid style={{padding:5}} container alignContent="flex-start" alignItems="center" spacing={2}>
                <Grid item xs = {3}>
                    <IconButton onClick={props.onClose}>
                        <CloseIcon className={classes.exitBTN}/>
                    </IconButton>
                </Grid>
                <Grid item xs={9}>
                    {chatContext.selected.type === 'individual'? 
                        <Typography style={{color:'#ffff'}} variant="h4">Account info</Typography>
                    :
                        <Typography style={{color:'#ffff'}} variant="h4">Group info</Typography>
                    }
                </Grid>
            </Grid>
            <Divider style={{backgroundColor:'#018FF7'}}/>
            <Paper className={classes.paperDrawer} style={{marginTop:10, padding:20, border:'solid 1px'}}>
                <Grid container spacing={3} alignContent="center" alignItems="center" direction="column">
                    <Grid item xs={12}>
                        {chatContext.selected.image? <Avatar src={chatContext.selected.image} style={{width:150, height:150}}/>: <PeopleAltIcon className={classes.colorIconUsers} style={{width:150, height:150}}/>}
                    </Grid>
                    <Grid item xs={12}>
                        <Typography style={{color:'#ffff'}} variant="h6">{chatContext.selected.name}</Typography>
                    </Grid>
                </Grid>
            </Paper>
            {chatContext.selected.type === 'group' &&
                <Paper className={classes.paperDrawer} style={{padding:5, marginTop:10}}>
                    <Grid container alignContent="center" alignItems="center">
                        <Grid item xs={6}>
                            <TextField InputProps={{className:classes.textFieldStyles}} InputLabelProps={{className:classes.textFieldStylesLabel}} label="Group name" value={textName} onChange={onChangeName}/>
                            {textName.trim() !== '' ? 
                                <Button className={classes.updateBTN} style={{marginTop:5}} startIcon={<AutorenewIcon/>} variant="contained" onClick={onClickUpdate}>Update</Button>
                            : 
                                <Button style={{marginTop:5}} startIcon={<AutorenewIcon/>} variant="contained" disabled>Update</Button>
                            }
                        </Grid>
                        <Grid item xs={6}>
                            <Typography style={{color:'#ffff'}} variant="body1">Group icon</Typography>
                            <Grid container justifyContent="center" alignItems="center">
                                <Grid item xs = {6}>
                                    <input accept="image/*" style={{display:'none'}} id="icon-button-file" type="file" onChange={onChangeImage}/>
                                    <label htmlFor="icon-button-file">
                                        <Tooltip title="Select an image">
                                            <IconButton aria-label="upload picture" component="span">
                                            {image? 
                                                <Avatar src={image} alt="Image profile" style={{width:60, height:60}}/>: <PeopleAltIcon className={classes.colorIconUsers} style={{width:60, height:60}}/>
                                            }
                                            </IconButton>   
                                        </Tooltip>
                                        
                                    </label>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button className={classes.exitBTN} onClick={() => setImage(null)}>Delete</Button>
                                </Grid>
                            </Grid>
                            <Button className={classes.updateBTN} style={{marginTop:5}} startIcon={<AutorenewIcon/>} onClick={onClickUpdateImage} variant="contained">Update</Button>
                        </Grid>
                    </Grid>
                </Paper>
            }
            {chatContext.selected.type === 'group' &&
                <Paper className={classes.paperDrawer} style={{marginTop:10}}>
                    <Typography style={{color:'#ffff', marginLeft:5}} variant="h6">Group members</Typography>
                    <List component="nav">
                        <ListItem button>
                            {youAdmin &&
                                <ListItemAvatar>
                                    <Avatar src={King}/>
                                </ListItemAvatar>
                            }
                            <ListItemAvatar>
                                {chatContext.image ?
                                    <Avatar alt="Remy Sharp" src={chatContext.image} /> :
                                    <AccountCircleIcon className={classes.colorIconUsers} style={{ width: 40, height: 40 }} />}
                            </ListItemAvatar>
                            <ListItemText className={classes.colorTextContacts} primary={`You`} />
                        </ListItem>
                        {admin.map((item, index) => 
                            <ItemMember deleteUser = {deleteUser} unsetAdmin={deleteAdmin} admin={true} youAdmin={youAdmin} image={item.image} username={item.username}/>
                        )}
                        {normal && normal.map((item, index) => 
                            <ItemMember deleteUser = {deleteUser} setAdmin={putAdmin} admin={false} youAdmin={youAdmin} image={item.image} username={item.username}/>
                        )}
                    </List>
                    {youAdmin && 
                        <>
                            <Button className={classes.addMemberBTN} startIcon={<PersonAddIcon/>} style={{width:'100%'}} onClick={() => setOpenAdd(true)} variant="contained">Add Member</Button>
                        </>
                    }
                </Paper>
            }
            <div style={{padding:10}}>
                <Button onClick={onClickDelete} className={classes.deleteDrawerBTN} style={{width:'100%'}} variant="contained" startIcon={<DeleteIcon/>}>{chatContext.selected.type === 'individual'? 'Delete Chat': 'Delete Group'}</Button>
            </div>
        </div>
    )
}

export default DrawerContent;