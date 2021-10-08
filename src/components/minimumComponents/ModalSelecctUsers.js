import { Avatar, Checkbox, Divider, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from "@material-ui/core"
import CloseIcon from '@material-ui/icons/Close'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useContext, useEffect, useState } from "react"
import ModalLayout from "../common/ModalLayout"
import Send from "@material-ui/icons/Send";
import Cookies from "js-cookie";
import { listMembers } from "../API/Request.API";
import ChatContext from "../../context/Chat/ChatContext";
import StyleHook from "../hooks/style.hook";
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'

const SelectModalUser = (props) => {
    const [classes] = StyleHook();
    const [selected, setSelected] = useState([]);
    const [members, setMembers] = useState([]);

    const chatContext = useContext(ChatContext);

    const handleMember = (item) => {
        if (selected.indexOf(item.username) === -1){
            setSelected([...selected, item.username])
        }else {
            setSelected(selected.filter(member => member !== item.username));
        }
    }

    const onClose = () => {
        setSelected([]);
        setMembers([]);
        props.onClose();
    }

    const obtainMembers = async () => {
        const data = await listMembers(Cookies.get('id'), chatContext.selected.name);
        if (data.status){
            setMembers([...data.admins, ...data.normal])
        }
    }

    useEffect(() => {
        obtainMembers();
    }, [props.open]);

    const onClickSend = () => {
        props.onSend(selected);
        onClose();
    }

    return(
        <>
            <ModalLayout open={props.open} onClose = {onClose}>
                <Grid container justifyContent="flex-end"
                alignItems="center">
                    <Grid item xs = {8}>
                        <Grid container spacing={0} alignItems="center" justifyContent="flex-start">
                            <Grid item xs={10}>
                                <Typography style={{color:'#ffff'}} variant="h4">
                                    Select users to send
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
                <Paper className={classes.paperSelectUsers}>
                    <List component="nav" style={{overflowY:'auto', height:350}}>
                        {members.map((member, index) => 
                            <ListItem classes={{root:classes.hoverListItems}} button onClick={() => handleMember(member)}>
                                <ListItemIcon>
                                    {member.image? <Avatar src={props.image} style={{width:75, height:75}}/>: <AccountCircleIcon className={classes.colorIconUsers} style={{width:75, height:75}}/>}
                                </ListItemIcon>
                                <ListItemText className={classes.colorTextContacts} primary={member.username}/>
                                <ListItemIcon >
                                    <Checkbox icon={<RadioButtonUncheckedIcon style={{color:'#fff'}}/>} checkedIcon={<CheckCircleIcon/>} style={{borderRadius:100}} checked={selected.indexOf(member.username) !== -1}/>
                                </ListItemIcon>
                            </ListItem>
                        )}
                    </List>
                    {selected.length > 0? 
                        <IconButton onClick={onClickSend}>
                            <Send style={{color:'#EF5903'}}/>
                        </IconButton>
                    : 
                        <IconButton disabled>
                            <Send style={{color:'#7E2F03'}}/>
                        </IconButton>
                    }
                </Paper>
            </ModalLayout>
        </>
    )
}

export default SelectModalUser;