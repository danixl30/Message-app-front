import { Fab, List, ListItem, Menu, Paper, Avatar, ListItemAvatar, ListItemText, Divider } from "@material-ui/core"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import StyleHook from "../hooks/style.hook"

const PaperSearch = (props) => {
    const [classes] = StyleHook();

    const onClickItem = (item) => {
        //console.log(item)
        props.onClickSearchItem(item);
    }
    return (
        <>
            <Paper className={classes.paperSearch}>
                {props.items.length > 0 && 
                    <div onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave} style={{overflowY:'auto'}}>
                        <List style={{overflowY:'auto'}} component="nav">
                            {props.items.map((item, index) => 
                                <>
                                    <ListItem classes={{root:classes.hoverListItems}} onClick={e => onClickItem(item)} button key={index} alignItems="flex-start">
                                        <ListItemAvatar>
                                            {item.image? 
                                                <Avatar alt="Remy Sharp" src={item.image}/>:
                                                <AccountCircleIcon className={classes.colorIconUsers} style={{width:30, height:30}}/>
                                            }
                                        </ListItemAvatar>
                                        <ListItemText className={classes.colorTextContacts} primary={item.username}/>
                                    </ListItem>
                                    <Divider className={classes.dividerColor} variant="middle"/>
                                </>
                            )}
                        </List>
                    </div>
                }
            </Paper>
        </>
    )
}

export default PaperSearch;