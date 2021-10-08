import { AppBar, Toolbar, Typography, InputBase, IconButton, Button, TextField, Avatar, Tooltip } from "@material-ui/core";
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useContext, useEffect } from "react";
import ChatContext from "../../context/Chat/ChatContext";
import StyleHook from "../hooks/style.hook";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    marginRight: theme.spacing(3),
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    //width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '14ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  logoutBtn:{
     display: 'none',
     //marginLeft: theme.spacing(12),
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    }, 
  }
}));

const HomeBar = (props) => {
    const classesBar = useStyles();
    const [classes] = StyleHook();
    const chatContext = useContext(ChatContext);
    useEffect(() => {
    })
    return(
        <>            
            <div className={classesBar.root}>
                <AppBar position="static" className={classes.styleMainBar}>
                    <Toolbar>
                      <Tooltip title="Account options">
                        <IconButton
                            edge="start"
                            className={classesBar.menuButton}
                            onClick={props.options}
                            color="inherit"
                            aria-label="open drawer"
                        >                            
                            {chatContext && chatContext.image !== null ? 
                                <Avatar src={chatContext.image} style={{borderRadius:200}}/>: <AccountCircleIcon style={{width:50, height:50}}/>
                            }
                        </IconButton>
                      </Tooltip>
                        
                        <Typography className={classesBar.title} variant="h6" noWrap>
                        {chatContext && chatContext.username} 
                        </Typography>
                        <div className={classesBar.search}>
                            <div className={classesBar.searchIcon}>
                            <SearchIcon />
                            </div>
                            <InputBase
                            placeholder="Search users…"
                            value={props.textSearch}
                            onChange={props.onChangeSearch}
                            onFocus={props.openPaperSearch}
                            onBlur={props.closePaperSearch}
                            classes={{
                                root: classesBar.inputRoot,
                                input: classesBar.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                        <div className={classesBar.grow} />
                        <div className={classesBar.logoutBtn}>
                            <Button style={{color:'#DF3E01'}} onClick={props.logout} startIcon={<ExitToAppIcon/>}>Logout</Button>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        </>
    )
}

export default HomeBar;