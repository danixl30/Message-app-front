import { ListItem, ListItemIcon, Avatar, ListItemAvatar, ListItemText, ListItemSecondaryAction, IconButton, Menu, MenuItem } from "@material-ui/core"
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useState } from "react";
import King from "../assets/img/king.svg";
import StyleHook from "../hooks/style.hook";

const ItemMember = (props) => {
    const [classes] = StyleHook();

    const [openMenu, setOpenMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const onCloseMenu = () => {
        setOpenMenu(false);
        setAnchorEl(null);
    }

    const onOpenMenu = (e) => {
        setOpenMenu(true);
        setAnchorEl(e.currentTarget);
    }

    const onClickAdmin = (item) => {
        onCloseMenu();
        if (props.admin){
            props.unsetAdmin(item);
        }else {
            props.setAdmin(item)
        }
    }
    return (
        <>
            <ListItem button>
                {props.admin && 
                    <ListItemIcon>
                        <Avatar className={classes.kingIconColor} src={King}/>
                    </ListItemIcon>
                }
                <ListItemIcon>
                    <ListItemAvatar>
                        {props.image ?
                            <Avatar alt="Remy Sharp" src={props.image} /> :
                            <AccountCircleIcon className={classes.colorIconUsers} style={{ width: 40, height: 40 }} />}
                    </ListItemAvatar>
                    <ListItemText className={classes.colorTextContacts} primary={props.username} />
                </ListItemIcon>
                {props.youAdmin &&
                    <ListItemSecondaryAction>
                        <IconButton style={{color:'#9B00FF'}} onClick={onOpenMenu}>
                            <ExpandMoreIcon/>
                        </IconButton>
                    </ListItemSecondaryAction>
                }
            </ListItem>
            <Menu 
                open={openMenu}
                anchorEl={anchorEl} 
                onClose={onCloseMenu}
                className={classes.paperMenu}
                anchorOrigin={{
                   vertical: 'top',
                   horizontal: 'left',
                }}
                transformOrigin={{
                   vertical: 'top',
                   horizontal: 'left',
                }}>
                    <MenuItem style={{color:'#ffff'}} onClick={() => props.deleteUser({username:props.username})}>Delete this user</MenuItem>
                    <MenuItem style={{color:'#ffff'}} onClick={() => onClickAdmin({username: props.username})}>{props.admin?'Unset admin':'Set admin'}</MenuItem>
                </Menu>
        </>
    )
}

export default ItemMember;