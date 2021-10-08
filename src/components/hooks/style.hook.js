import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
    paperForm:{
        padding: theme.spacing(6),
        background:'linear-gradient(90deg, rgba(0,56,237,1) 0%, rgba(8,105,238,1) 100%)',
        borderRadius:10
    },
    errorMsg:{
        color: '#D82506'
    },
    paperContainer:{
        position:'relative',
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between',
        backgroundColor: '#000247'
        // minHeight:400,
        // maxHeight:800
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(8px)'
      },
    paperModal: {
        backgroundColor: '#002C75',
        border: '2px solid #000',
        borderRadius:10,
        boxShadow: theme.shadows[5],
        padding: 20,
    },
    paperSearch:{
        width:300,
        height:350,
        //display:'flex',
        justifyContent:'center',
        position: 'absolute',
        top: 80,
        zIndex:100,
        left: '39%',
        overflowY:'auto',
        boxShadow: theme.shadows[5],
        backgroundColor: '#14004D'
    },
  barStyles: {
    background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(2,67,128,1) 100%)'
  },
  paperContainers: {
      backgroundColor: '#000247'
  },
  colorTextContacts: {
      color: '#D46A00',
      fontSize: 10
  },
  colorIconUsers: {
      color: '#6E01EA'
  },
  dividerColor: {
      backgroundColor: '#027DF1'
  },
  styleMainBar: {
      background: 'linear-gradient(90deg, rgba(49,0,129,1) 0%, rgba(53,0,64,1) 100%)'
  },
  textCommonColor: {
      color: '#ffff'
  },
  paperChatItem: {
      background: 'linear-gradient(90deg, rgba(0,36,92,1) 0%, rgba(0,49,96,1) 100%)',
      cursor:'pointer',
      borderRadius:10,
      '&:hover': {
          //backgroundColor:'#fffff',
          background: 'linear-gradient(90deg, rgba(0,67,172,1) 0%, rgba(0,103,203,1) 100%)'
      }
  },
  colorTextContactsPaper: {
      color: '#D46A00',
      //fontSize: 10
  },
  paperAccount:{
      marginTop:5,
      background: 'linear-gradient(90deg, rgba(75,0,172,1) 0%, rgba(68,1,168,1) 100%)'
  },
  exitBTN: {
      color: '#EC1200'
  },
  colorUsername: {
      color: '#ffff'
  }, 
  styleIconsBar: {
      width:30,
      height:30,
      color:'#ffff'
  },
  btnConfirm: {
      background: 'linear-gradient(90deg, rgba(75,0,172,1) 0%, rgba(99,0,247,1) 100%)',
      color:'#ffff'
  },
  paperUsers: {
      background: 'linear-gradient(90deg, rgba(47,1,185,1) 1%, rgba(62,0,143,1) 100%)',
      borderRadius:10,
      width:200, 
      height:300, 
      padding:5
  },
  paperSelectUsers:{
      background: 'linear-gradient(90deg, rgba(47,1,185,1) 1%, rgba(0,46,159,1) 100%)'      
  },
  msgOwn:{
      background:'linear-gradient(90deg, rgba(120,0,153,1) 1%, rgba(93,0,159,1) 100%)'
  },
  msgOther:{
      background:'linear-gradient(90deg, rgba(0,42,153,1) 1%, rgba(0,107,159,1) 100%)'
  },
  kingIconColor:{
      //background:'linear-gradient(90deg, rgba(245,189,0,1) 1%, rgba(241,122,2,1) 100%)',
      '&:path':{
        fill:'#f5bd00',
        color:'#f5bd00'
      },
      fill:'#f5bd00',
      color:'#f5bd00',
      '& .MuiAvatar-colorDefault':{
        color:'#f5bd00',
        '&:path':{
            fill:'#f5bd00'
          },
        fill:'#f5bd00'
      }
      //WebkitBackgroundClip:'text',
      //WebkitTextFillColor:'transparent'
  },
  drawerStyles:{
    width:350,
    height:'100%', 
    overflowX:'hidden', 
    padding:5,
    background:'linear-gradient(90deg, rgba(75,0,172,1) 0%, rgba(99,0,247,1) 100%)'
  },
  paperDrawer:{
      background:'linear-gradient(90deg, rgba(0,88,186,1) 0%, rgba(1,1,142,1) 100%)'
  },
  deleteDrawerBTN:{
      background:'linear-gradient(90deg, rgba(238,4,0,1) 0%, rgba(232,68,4,1) 100%)',
      color:'#ffff',
      textTransform:'none'
  },
  addMemberBTN:{
      background:'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      color:'#ffff',
      textTransform:'none'
  },
  updateBTN:{
    background:'linear-gradient(90deg, rgba(127,0,237,1) 0%, rgba(189,8,238,1) 100%)',
    color:'#ffff',
    textTransform:'none'
  },
  paperMenu:{
      '& .MuiMenu-paper	':{
          backgroundColor:'#9B00FF'
      }
  },
  mainBTN:{
    background:'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    color:'#ffff',
    textTransform:'none'
  },
  confirmFormBTN:{
      color:'#9B00FF',
      border:'2px solid #9B00FF'
  },
  backHomeBTN:{
      color:'#ffff',
      border:'2px solid #ffff'
  },
  textFieldStyles:{
      color:'#ffff',
      //border:'1px solid #EC6802',
        '&:hover': {
        color: '#F2AA10 !important',
        },
        '&:before': {
        borderBottomColor: '#F2AA10 !important',
        },
        '&:hover:before': {
            borderBottomColor: '#F2AA10',
        },
        '&:after': {
            borderBottomColor: '#F2AA10',
        },
      '& .MuiTextField-root':{
          color:'#ffff',
          
      }
  },
  textFieldStylesLabel:{
    color: '#F2AA10',
    '&.Mui-focused': {
        color: '#F2AA10 !important',
    }
  },
  hoverListItems:{
      '&:hover':{
          backgroundColor:'rgba(255, 255, 255, 0.1)'
      }
    
     
  }
}));

const StyleHook = () => {
    const classes = useStyles();
    return [classes];
}

export default StyleHook;