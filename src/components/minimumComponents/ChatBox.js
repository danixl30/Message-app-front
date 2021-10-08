import { AppBar, Button, Toolbar, Typography, InputBase, IconButton, Drawer, Avatar, Tooltip } from "@material-ui/core";
import {
  alpha,
  withStyles,
  makeStyles,
} from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SendIcon from '@material-ui/icons/Send';
import { ListAlt } from "@material-ui/icons";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { useContext, useEffect, useRef, useState } from "react";
import ChatContext from "../../context/Chat/ChatContext";
import Socket from "../API/Socket";
import OtherMessage from "../common/OtherMessage";
import OwnMessage from "../common/OwnMessage";
import DrawerContent from "./DrawerContent";
import SelectModalUser from "./ModalSelecctUsers";
import StyleHook from "../hooks/style.hook";

const useStyles = makeStyles(theme => ({
  inputContainer:{
    // bottom:5,
    // position:'absolute',
    width:'100%',
    background: 'linear-gradient(90deg, rgba(51,0,92,1) 0%, rgba(79,0,96,1) 100%)'
  }
}))

const MessageInput = withStyles((theme) => ({
  root: {    
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 25,
    position: 'relative',
    backgroundColor: '#013A70',
    border: '1px solid #934500',
    fontSize: 16,
    color: '#ffff',
    width: '100%',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    /*fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),*/
    '&:focus': {
      boxShadow: `${alpha('#8E09EA', 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);

const ChatBox = (props) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState('');
  const [openModalUser, setOpenModalUser] = useState(false);

  const classesBox = useStyles();
  const [classes] = StyleHook();
  const chatContext = useContext(ChatContext);

  const onCloseDrawer = () => {
    setOpenDrawer(false);
  }

  const onOpenDrawer = () => {
    setOpenDrawer(true);
  }

  const onChangeMessageInput = (e) => {
    setMessage(e.target.value);
    Socket.emit('typing', {
      to: chatContext.selected.name,
      msg: `${chatContext.username} is typing`,
      type: chatContext.selected.type,
      from: chatContext.username
    })
  }

  const onSendMessage = () => {
    if (chatContext.selected.type === 'individual'){
      Socket.emit('privateMsg', {
        to: chatContext.selected.name, 
        from: chatContext.username,
        msg: message
      })
    }
    if (chatContext.selected.type === 'group'){
      Socket.emit('groupMsg', {         
        from: chatContext.username,
        msg: message, 
        groupName: chatContext.selected.name
      })
    }
    Socket.emit('typing', {
      to: chatContext.selected.name,
      msg: ``,
      type: chatContext.selected.type,
      from: chatContext.username
    })
    setMessage('');
  }

  const onSendPrivateGroup = (members) => {
    Socket.emit('groupMsg', {         
      to: members,
      from: chatContext.username,
      msg: message, 
      groupName: chatContext.selected.name
    })
    Socket.emit('typing', {
      to: chatContext.selected.name,
      msg: ``,
      type: chatContext.selected.type,
      from: chatContext.username
    })
    setMessage('');
  }

  useEffect(() => {
    setTyping('');
    Socket.on('typing', (data) => {
      console.log('here');
      if (chatContext.selected.type === 'individual' && data.type === 'individual' && data.from === chatContext.selected.name){
        setTyping(data.msg);
      }else if (chatContext.selected.type === 'group' && data.type === 'group' && data.name === chatContext.selected.name){
        setTyping(data.msg);
      }
    })
    return () => {
      Socket.off();
    }
  }, [chatContext.selected.name, chatContext.selected.type, typing])

    const divRef = useRef(null);
    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: "smooth" });
    });

    const onClickSelectUser = () => {
      setOpenModalUser(true);
    }

    const onCloseSelectUser = () => {
      setOpenModalUser(false);
    }

    return (
        <>
          <SelectModalUser open={openModalUser} onClose={onCloseSelectUser} onSend={onSendPrivateGroup}/>
          <Drawer anchor="right" open={openDrawer} onClose={onCloseDrawer}>
            <DrawerContent onClose={onCloseDrawer}/>
          </Drawer>
            <AppBar position="static" color="default" className={classes.barStyles}>
                <Toolbar>
                    <Tooltip title={chatContext.selected.type === 'individual'? 'Chat info': 'Group info'}>
                      <Button onClick={onOpenDrawer} style={{textTransform:'none'}}>
                          {chatContext.selected.image? <Avatar src={chatContext.selected.image} style={{width:30, height:30}}/>: 
                          <>
                            {chatContext.selected.type === 'individual'?
                              <AccountCircleIcon className={classes.colorIconUsers} style={{width:30, height:30}}/>
                            : 
                              <PeopleAltIcon className={classes.colorIconUsers} style={{width:30, height:30}}/>
                            }
                          </>
                          }
                          <Typography style={{marginLeft:10}} className={classes.textCommonColor} variant="h6">{chatContext.selected.name}</Typography>
                      </Button>
                    </Tooltip>                    
                    {typing !== '' &&
                      <Typography style={{marginLeft:50, color:'#ffff'}} variant="h6">{typing}</Typography>
                    }
                </Toolbar>
            </AppBar>
            <div style={{overflowY:'auto', height:'100%', padding:10}}>
              {chatContext.selected.type === 'individual' && chatContext.individualMsg.has(chatContext.selected.name) && 
                <>
                  {chatContext.individualMsg.get(chatContext.selected.name).map((message, index) => 
                    <div style={{marginTop:5}}>
                      {message.from === chatContext.username? 
                        <OwnMessage msg={message.msg}/>
                      : 
                        <OtherMessage msg={message.msg}/>
                      }
                    </div>
                  )}
                </>
              }
              {chatContext.selected.type === 'group' && chatContext.groupMsg.has(chatContext.selected.name) &&  
                <>
                  {chatContext.groupMsg.get(chatContext.selected.name).map((message, index) => 
                    <div style={{marginTop:5}}>
                      {message.from === chatContext.username? 
                        <OwnMessage msg={message.msg}/>
                      : 
                        <OtherMessage username={message.from} msg={message.msg}/>
                      }
                    </div>
                  )}
                </>
              }
              <div ref={divRef}></div>
            </div>
            <AppBar className={classesBox.inputContainer} position="static" color="default">
                <Toolbar>
                    <MessageInput value={message} onChange={onChangeMessageInput} placeholder="Message..." label="Message..." fullWidth/>
                    {chatContext.selected.type === 'group' &&
                      <>
                        {message.trim() !== ''? 
                          <IconButton onClick={onClickSelectUser} ><ListAlt style={{color:'#B3B3B3'}}/></IconButton>
                        : 
                          <IconButton disabled><ListAlt style={{color:'#5A5A5A'}}/></IconButton>
                        }
                      </>
                    }
                    <div style={{marginLeft:5}}/>
                    {message.trim() !== ''? 
                      <IconButton onClick={onSendMessage}><SendIcon style={{color:'#EF5903'}}/></IconButton>
                    : 
                      <IconButton disabled><SendIcon style={{color:'#7E2F03'}}/></IconButton>
                    }
                </Toolbar>
            </AppBar>
        </>
    )
}

export default ChatBox;