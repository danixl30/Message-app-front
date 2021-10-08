import { AppBar, IconButton, Tab, Tabs, Toolbar, Tooltip, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PersonIcon from '@material-ui/icons/Person';
import { useContext, useState } from "react";
import ChatContext from "../../context/Chat/ChatContext";
import CreateGroupView from "./CreateGroupModal";
import StyleHook from "../hooks/style.hook";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  root: {
    flexGrow: 1,
  },
  title:{
      flexGrow:1,
      textDecoration:'bold',
      color:'#ffff',
      fontWeight:'bold'
  }, 
  iconsView: {
    color: '#DF4E00'
  }
}))

const ControlTabs = withStyles({
  root: {
    //borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#9700C0',
  },
})(Tabs);

const ControlTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    display:'flex',
    minWidth: 72,
    color: '#9700C0',
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(5),
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
    '&:hover': {
      color: '#BC03EF',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const ControlBar = (props) => {
    const classesControl = useStyles();
    const [classes] = StyleHook();
    const chatContext = useContext(ChatContext);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const onClickTypeView = () => {
      chatContext.setTypeView(!chatContext.typeView)
    }
    const CloseModalCreate = () => {
        setOpenModalCreate(false);
    }
    const onOpenModalCreate = () => {
      setOpenModalCreate(true);
    }
    return (
        <>
            <CreateGroupView open={openModalCreate} onClose={CloseModalCreate}/>
            <AppBar position = "static" color="default" className={classes.barStyles}>
                <div className={classesControl.root}>
                    <Toolbar position="static">
                        <Typography className={classesControl.title} variant="h5">
                           Message App 
                        </Typography>
                        {props.value === 1 &&
                          <Tooltip title="Create group">
                            <IconButton onClick={onOpenModalCreate}>
                                <AddIcon style={{color: '#03A54A'}}/>
                            </IconButton>
                          </Tooltip>                          
                        }
                        <IconButton onClick={onClickTypeView}>
                            {chatContext.typeView? 
                            <Tooltip title="Mosaic view">
                              <ViewModuleIcon className={classesControl.iconsView}/>
                            </Tooltip>                            
                            : 
                            <Tooltip title="list view">
                              <FormatListBulletedIcon className={classesControl.iconsView}/>
                            </Tooltip>
                            }
                        </IconButton>
                    </Toolbar>
                </div>
                <ControlTabs
                    value={props.value}
                    onChange={props.onChange}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="scrollable force tabs example">
                        <ControlTab icon={<PersonIcon/>} label="Individual" />
                        <ControlTab icon={<PeopleAltIcon/>} label= "Groups"/>
                </ControlTabs>
            </AppBar>
        </>
    )
}

export default ControlBar;