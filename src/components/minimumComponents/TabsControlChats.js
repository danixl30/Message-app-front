import { Box, Typography, List, ListItem, Divider, ListItemAvatar, ListItemIcon, ListItemText, Avatar, Grid, Paper } from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PeopleIcon from '@material-ui/icons/People';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useContext, useState } from "react";
import ChatContext from "../../context/Chat/ChatContext";
import StyleHook from "../hooks/style.hook";

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return(
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
            >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    )
}

const TabsControlChats = (props) => {
    const theme = useTheme();
    const chatContext = useContext(ChatContext);
    const [classes] = StyleHook()
    const onClickChatItem = (item, type) => {
        if (type === 'individual'){
            chatContext.setSelected({
                name: item.username,
                image: item.image,
                type: 'individual'
            });
        }

        if (type === 'group'){
            chatContext.setSelected({
                name: item.name,
                image: item.image,
                type: 'group'
            });
        }
    }
    const setSecondaryText = (chat) => {
        if (chatContext.individualMsg.has(chat.username)){
            let msgs = chatContext.individualMsg.get(chat.username);
            console.log(chat);
            console.log(msgs)
            return msgs[msgs.length-1].msg
        }
    }

    const setSecondaryTextGroup = (group) => {
        if (chatContext.groupMsg.has(group.name)){
            let msgs = chatContext.groupMsg.get(group.name);
            console.log(msgs)
            return msgs[msgs.length-1].msg
        }
    }

    return(
        <>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={props.value}
                onChangeIndex={props.handleChangeIndex}
            >
                <TabPanel value={props.value} index={0} dir={theme.direction} style={{overflowY:'auto'}}>
                   {chatContext.chats.length > 0 ?
                        <> 
                            {chatContext.typeView? 
                                <List style={{overflowY: 'auto', height:370}} component="nav">
                                {chatContext.chats.map((chat, index) => 
                                    <>
                                        <ListItem classes={{root:classes.hoverListItems}} onClick={e => onClickChatItem(chat, 'individual')} button key={index} alignItems="flex-start">
                                            <ListItemAvatar>
                                                {chat.image ?
                                                    <Avatar alt="Remy Sharp" src={chat.image} /> :
                                                    <AccountCircleIcon className={classes.colorIconUsers} style={{ width: 40, height: 40 }} />}
                                            </ListItemAvatar>
                                            <ListItemText className={classes.colorTextContacts} primary={chat.username} secondary={setSecondaryText(chat)}/>
                                        </ListItem>
                                        <Divider className={classes.dividerColor} variant="middle"/>
                                    </>
                                )}
                                </List>
                            :
                            <div style={{flexGrow:1, padding:20, overflowY:'auto', height:343, marginTop:5}}>
                                <Grid container direction="row" justifyContent="flex-start" alignItems="baseline" spacing={4} style={{overflowY:'auto'}}>
                                    {chatContext.chats.map((chat, index) => 
                                        <Grid onClick={e => onClickChatItem(chat, 'individual')} item xs ={6}>
                                            <Paper className={classes.paperChatItem} style={{padding:15}}>
                                                <Grid container alignItems="center" justifyContent="center" direction="column">
                                                    <Typography className={classes.colorTextContactsPaper} variant="h6">{chat.username}</Typography>
                                                    {chat.image ?
                                                        <Avatar alt="Remy Sharp" src={chat.image} style={{ width: 100, height: 100 }} /> :
                                                        <AccountCircleIcon style={{ width: 100, height: 100 }} className={classes.colorIconUsers}/>}
                                                    <Typography variant="body1">{setSecondaryText(chat)}</Typography>
                                                </Grid>
                                            </Paper>
                                        </Grid>
                                    )}
                                </Grid>
                            </div>
                            }
                        </>
                   :
                    <Typography style={{color:'#ffff'}} variant="h6">You not have chats, search someone!!!</Typography>
                   } 
                </TabPanel>
                <TabPanel value={props.value} index={1} dir={theme.direction}>
                   {chatContext.groups.length > 0 ?
                        <> 
                            {chatContext.typeView? 
                                <List style={{overflowY: 'auto', height:370}} component="nav">
                                {chatContext.groups.map((group, index) => 
                                    <>
                                        <ListItem classes={{root:classes.hoverListItems}} onClick={e => onClickChatItem(group, 'group')} button key={index} alignItems="flex-start">
                                            <ListItemAvatar>
                                                {group.image ?
                                                    <Avatar alt="Remy Sharp" src={group.image} /> :
                                                    <PeopleIcon style={{ width: 40, height: 40 }} className={classes.colorIconUsers}/>}
                                            </ListItemAvatar>
                                            <ListItemText className={classes.colorTextContacts} primary={group.name} secondary={setSecondaryTextGroup(group)}/>
                                        </ListItem>
                                        <Divider className={classes.dividerColor} variant="middle"/>
                                    </>
                                )}
                                </List>
                            :
                            <div style={{flexGrow:1, padding:20, overflowY:'auto', height:343, marginTop:5}}>
                                <Grid container direction="row" justifyContent="flex-start" alignItems="baseline" spacing={4} style={{overflowY:'auto'}}>
                                    {chatContext.groups.map((group, index) => 
                                        <Grid onClick={e => onClickChatItem(group, 'group')} item xs ={6}>
                                            <Paper className={classes.paperChatItem}style={{padding:15}}>
                                                <Grid container alignItems="center" justifyContent="center" direction="column">
                                                    <Typography className={classes.colorTextContactsPaper}variant="h6">{group.name}</Typography>
                                                    {group.image ?
                                                        <Avatar style={{ width: 100, height: 100 }}alt="Remy Sharp" src={group.image} /> :
                                                        <PeopleIcon className={classes.colorIconUsers}style={{ width: 100, height: 100 }} />}
                                                    <Typography variant="body1">{setSecondaryTextGroup(group)}</Typography>
                                                </Grid>
                                            </Paper>
                                        </Grid>
                                    )}
                                </Grid>
                            </div>
                            }
                        </>
                   :
                    <Grid justifyContent="center" alignItems="center" direction="column">
                        <Typography style={{color:'#ffff'}} variant="h6">You not have groups</Typography>
                    </Grid>
                   } 
                </TabPanel>
            </SwipeableViews>
        </>
    )
}

export default TabsControlChats;