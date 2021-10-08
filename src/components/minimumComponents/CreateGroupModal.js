import { Grid, Typography, IconButton, Divider, Paper, List, ListItem, ListItemAvatar, ListItemText, Avatar, InputBase, ListItemSecondaryAction, TextField, Button, Tooltip } from "@material-ui/core";
import { alpha, makeStyles } from '@material-ui/core/styles';
import ModalLayout from "../common/ModalLayout";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import CloseIcon from '@material-ui/icons/Close'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { useContext, useEffect, useState } from "react";
import ChatContext from "../../context/Chat/ChatContext";
import { cretateGroup, getAllUers } from "../API/Request.API";
import Cookies from "js-cookie";
import StyleHook from "../hooks/style.hook";

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    color:'#ffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: '#ffff',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    color:'#ffff',
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const CreateGroupView = (props) => {
    const [classes] = StyleHook();
    const classesCreate = useStyles();
    const chatContext = useContext(ChatContext);
    const [selectedChats, setSelectedChats] = useState([]);
    const [searchedChats, setSearchedChats] = useState([]);
    const [textSearch, setTextSearch] = useState('');
    const [groupName, setGroupName] = useState('');
    const [icon, setIcon] = useState();

    const onClose = () => {
        setSelectedChats([]);
        setGroupName('');
        setTextSearch('');
        setIcon(null);
        props.onClose()
    }

    const obtainUsers = async () => {
        const data = await getAllUers(Cookies.get('id'));
        if (data.status){
            chatContext.setUsers(data.users);
        }
    }

    const onChangeItems = (e) => {
        if (e.target.name === 'textSearch'){
            setTextSearch(e.target.value);
        }

        if (e.target.name === 'groupName'){
            setGroupName(e.target.value);
        }
    }

    useEffect(() => {
        obtainUsers();
    }, [])

    useEffect(() => {
        console.log(selectedChats);
        setSelectedChats(selectedChats);
    }, [selectedChats])

    const addItem = async (item) => {
        if (selectedChats.indexOf(item) !== -1){
            return;
        }
        setSelectedChats([...selectedChats, item]);
        console.log(selectedChats);
    }

    const removeItem = (item) => {
        let items = selectedChats.filter(data => data.username !== item.username);
        setSelectedChats(items);
    }

    useEffect(() => {
        if (textSearch.trim() !== ''){
            let data = chatContext.users.filter((item) => {
                if (item.username.toLowerCase().includes(textSearch.toLowerCase())){
                    return item;
                }
                return textSearch.toLowerCase().split(' ').forEach((word) => {
                    if(item.username.toLowerCase().includes(word)) return item
                })
            })
        setSearchedChats(data);
        }else{
            setSearchedChats([])
        }
    }, [textSearch])

    const onChangeImage = (e) => {
        const file = e.target.files[0];
        console.log(file);
        setIcon(null);
        if (file && file.type.includes('image')){
            const reader = new FileReader();
            reader.onloadend = () => {
                //console.log(reader.result);
                setIcon(reader.result);
            }
            reader.readAsDataURL(file);
        }else{
            console.log('error');
        }
    }

    const onClickCreate = async () => {
        let members = [];
        for (let i = 0; i < selectedChats.length; i++){
            members.push(selectedChats[i].username);
        }
        //console.log(members);
        const data = await cretateGroup(Cookies.get('id'), groupName.trim(), members, icon);
        if (data.status){
            chatContext.setGroups();
            onClose();
        }else {
            console.log(data.msg);
        }
    }

    return(
        <>
            <ModalLayout open={props.open} onClose={onClose}>
                <Grid container justifyContent="flex-end"
                alignItems="center">
                    <Grid item xs = {8}>
                        <Grid container spacing={0} alignItems="center" justifyContent="flex-start">
                            <Grid item xs={2}>
                                <GroupAddIcon className={classes.styleIconsBar}/>
                            </Grid>
                            <Grid item xs={10}>
                                <Typography style={{color:'#ffff'}} variant="h4">
                                    Create a new group
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
                <Divider/>
                <Grid style={{marginTop:5}} container justifyContent="flex-start" alignItems="center" spacing={1}>
                    <Grid item xs ={8}>
                        <TextField InputProps={{className:classes.textFieldStyles}} InputLabelProps={{className:classes.textFieldStylesLabel}} style={{width:'80%'}} onChange={onChangeItems} name="groupName" label="Group name" value={groupName}/>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography style={{color:'#ffff'}} variant="body1">Group icon</Typography>
                        <input accept="image/*" style={{display:'none'}} id="icon-button-file" type="file" onChange={onChangeImage}/>
                        <label htmlFor="icon-button-file">
                            <Tooltip title="Select an image">
                               <IconButton component="span">
                                    {icon? 
                                        <Avatar style={{width:40, height:40}} src={icon}/>
                                    : <GroupAddIcon className={classes.colorIconUsers} style={{width:40, height:40}}/>}
                                </IconButton> 
                            </Tooltip>
                            
                        </label>
                    </Grid>
                </Grid>
                <Grid container alignContent="center" justifyContent="center" alignItems="center" spacing={2}>
                    <Grid item xs = {4}>
                        <Paper className={classes.paperUsers}>
                            <Typography style={{color:'#ffff'}} variant="h6">Your chats</Typography>
                            {chatContext.chats.length > 0 ? 
                                <List style={{overflowY:'auto', height:'85%'}} component="nav">
                                    {chatContext.chats.map((chat, index) => 
                                        <>
                                            <ListItem classes={{root:classes.hoverListItems}} onClick={e => addItem(chat)} button key={index+'local'} alignItems="flex-start">
                                                <ListItemAvatar>
                                                    {chat.image ?
                                                        <Avatar alt="Remy Sharp" src={chat.image} /> :
                                                        <AccountCircleIcon style={{ width: 40, height: 40 }} className={classes.colorIconUsers}/>}
                                                </ListItemAvatar>
                                                <ListItemText className={classes.colorTextContacts} primary={chat.username} />
                                            </ListItem>
                                            <Divider className={classes.dividerColor} variant="middle"/>
                                        </>
                                    )}
                                </List>
                            :
                                <Typography variant="body2">You not have chats</Typography>
                            }
                        </Paper>
                    </Grid>
                    <Grid item xs = {4}>
                        <Paper className={classes.paperUsers}>
                            <Typography style={{color:'#ffff'}} variant="h6">Search chats</Typography>
                            <div className={classesCreate.search}>
                                <div className={classesCreate.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                placeholder="Search…"
                                name="textSearch"
                                onChange={onChangeItems}
                                classes={{
                                    root: classesCreate.inputRoot,
                                    input: classesCreate.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>
                            <List style={{overflowY:'auto', height:'70%', marginTop:5}} component="nav">
                                {searchedChats.map((chat, index) => 
                                    <>
                                        <ListItem classes={{root:classes.hoverListItems}} onClick={e => addItem(chat)} button key={index+'search'} alignItems="flex-start">
                                            <ListItemAvatar>
                                                {chat.image ?
                                                    <Avatar alt="Remy Sharp" src={chat.image} /> :
                                                    <AccountCircleIcon style={{ width: 40, height: 40 }} className={classes.colorIconUsers}/>}
                                            </ListItemAvatar>
                                            <ListItemText className={classes.colorTextContacts} primary={chat.username} />
                                        </ListItem>
                                        <Divider className={classes.dividerColor} variant="middle"/>
                                    </>
                                )}
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs = {4}>
                        <Paper className={classes.paperUsers}>
                            <Typography style={{color:'#ffff'}} variant="h6">Selected chats</Typography>
                            {selectedChats.length > 0 ? 
                                <List style={{overflowY:'auto', height:'85%', marginTop:5}} component="nav">
                                    {selectedChats.map((chat, index) => 
                                        <>
                                            <ListItem classes={{root:classes.hoverListItems}} button key={index+chat.username} alignItems="flex-start">
                                                <ListItemAvatar>
                                                    {chat.image ?
                                                        <Avatar alt="Remy Sharp" src={chat.image} /> :
                                                        <AccountCircleIcon style={{ width: 40, height: 40 }} className={classes.colorIconUsers}/>}
                                                </ListItemAvatar>
                                                <ListItemText className={classes.colorTextContacts} primary={chat.username} />
                                                <ListItemSecondaryAction>
                                                    <IconButton onClick={e => removeItem(chat)} edge="end" aria-label="delete">
                                                     <DeleteIcon className={classes.exitBTN}/>
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                            <Divider className={classes.dividerColor} variant="middle"/>
                                        </>
                                    )}
                                </List>
                            : 
                                <Typography style={{color:'#ffff'}} variant="body2">Not user selected</Typography>
                            }
                        </Paper>
                    </Grid>
                </Grid>
                <Grid style={{marginTop:10}} container alignItems="center" justifyContent="center" direction="column">
                    <Grid item xs={12}>
                        {selectedChats.length > 0 && groupName.trim() !== ''?
                            <Button className={classes.btnConfirm} onClick={onClickCreate} startIcon={<GroupAddIcon/>} variant="contained">Create</Button>    
                        :
                            <Button startIcon={<GroupAddIcon/>} variant="contained" style={{color:'#AFAFAF'}} disabled>Create</Button>
                        }
                    </Grid>
                </Grid>
            </ModalLayout>
        </>
    )
}

export default CreateGroupView;