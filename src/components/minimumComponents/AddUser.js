import { alpha, Typography, Grid, Divider, List, ListItem, Avatar, ListItemAvatar, ListItemText, Paper, InputBase, IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close'
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import { useContext, useEffect, useState } from "react";
import ChatContext from "../../context/Chat/ChatContext";
import ModalLayout from "../common/ModalLayout"
import { getAllUers } from "../API/Request.API";
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
    color:'#ffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: '#ffff',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    color:'#ffff',
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const AddUser = (props) => {
    const [classes] = StyleHook();
    const chatContext = useContext(ChatContext);
    const classesCreate = useStyles();
    const [searchedChats, setSearchedChats] = useState([]);
    const [textSearch, setTextSearch] = useState('');

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
    }

    useEffect(() => {
        obtainUsers();
    }, [])

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

    return (
        <>
            <ModalLayout open={props.open} onClose={props.onClose}>
                <Grid container justifyContent="flex-end"
                alignItems="center">
                    <Grid item xs = {8}>
                        <Grid container spacing={0} alignItems="center" justifyContent="flex-start">
                            <Grid item xs={2}>
                                <ControlPointIcon className={classes.styleIconsBar}/>
                            </Grid>
                            <Grid item xs={10}>
                                <Typography style={{color:'#ffff'}} variant="h4">
                                    Add member
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton onClick={props.onClose}>
                            <CloseIcon className={classes.exitBTN}/>
                        </IconButton>
                    </Grid>
                </Grid>
                <Divider/>
                <Typography style={{color:'#ffff'}} variant="h5">Select an user</Typography>
                <Grid container alignContent="center" justifyContent="center" alignItems="center" spacing={2}>
                    <Grid item xs = {6}>
                        <Paper className={classes.paperUsers} style={{width:300, height:300, padding:5}}>
                            <Typography style={{color:'#ffff'}} variant="h6">Your chats</Typography>
                            {chatContext.chats.length > 0 ? 
                                <List style={{overflowY:'auto', height:'85%'}} component="nav">
                                    {chatContext.chats.map((chat, index) => 
                                        <>
                                            <ListItem classes={{root:classes.hoverListItems}} onClick={() => props.onClickItem(chat)} button key={index+'local'} alignItems="flex-start">
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
                                <Typography style={{color:'#ffff'}} variant="body2">You not have chats</Typography>
                            }
                        </Paper>
                    </Grid>
                    <Grid item xs = {6}>
                        <Paper className={classes.paperUsers} style={{width:300, height:300, padding:5}}>
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
                                        <ListItem classes={{root:classes.hoverListItems}} onClick={() => props.onClickItem(chat)} button key={index+'search'} alignItems="flex-start">
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
                </Grid>
            </ModalLayout>
        </>
    )
}

export default AddUser;