import HomeBar from "../common/HomeBar";
import Cookies from 'js-cookie';
import { useState, useEffect, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import { addChat, getAllUers, getUsername, listChats } from "../API/Request.API";
import { Grid, Paper, SwipeableDrawer, Typography } from "@material-ui/core";

import ControlBar from "../minimumComponents/ControlBar";
import NotSelectedChat from "../minimumComponents/NotChatSelected";
import ChatBox from "../minimumComponents/ChatBox";
import StyleHook from "../hooks/style.hook";
import AccountOptions from "../minimumComponents/AccountOptions";
import ChatContext from "../../context/Chat/ChatContext";
import PaperSearch from "../minimumComponents/PaperSearch";
import TabsControlChats from "../minimumComponents/TabsControlChats";
import Socket from "../API/Socket";

const testData = {
    name: "test",
    type: "individual",
    image: null
}

const HomeDisplay = () => {

    const [typeChat, setTypeChat] = useState(0);
    const [openModalUser, setOpenModalUser] = useState(false);
    const [openPaperSearch, setOpenSearchPaper] = useState(false);
    const [textSearch, setTextSearch] = useState('');
    const [resultArray, setResultArray] = useState([]);
    const [searchItemFocus, setItemSearchFocus] = useState(false);

    const history = useHistory();

    const [classes] = StyleHook();

    const chatContext = useContext(ChatContext);

    const onChangeControlTabs = (e, newValue) => {
        console.log(newValue);
        setTypeChat(newValue);
    }

    const onChangeIndex = (index) => {
        setTypeChat(index);
    }

    const obtainUsername = async () => {
        const data = await getUsername(Cookies.get('id'));
        if (data.status){
            chatContext.setUsername(data.username);
            chatContext.setImage(data.image);
        }else{
            onClickLogout();
        }
    }

    useEffect(() => {
        Socket.on('privateMsg', (data) => {
            if (data.from !== chatContext.username){
                if (chatContext.individualMsg.has(data.from)){
                    let msgs = chatContext.individualMsg.get(data.from);
                    msgs = [...msgs, data];
                    chatContext.setIndividualMsg(data.from, msgs)
                }else {
                    let msgs = [data];
                    chatContext.setIndividualMsg(data.from, msgs)
                }
            }else {
                if (chatContext.individualMsg.has(data.to)){
                    let msgs = chatContext.individualMsg.get(data.to);
                    msgs = [...msgs, data];
                    chatContext.setIndividualMsg(data.to, msgs)
                }else {
                    let msgs = [data];
                    chatContext.setIndividualMsg(data.to, msgs)
                }
            }
        })
        return () => { Socket.off() }
    }, [chatContext, chatContext.individualMsg])

    useEffect(() => {
        Socket.on('groupMsg', (data) => {
            if (chatContext.groupMsg.has(data.name)){
                let msgs = chatContext.groupMsg.get(data.name);
                msgs = [...msgs, data];
                chatContext.setGroupMsg(data.name, msgs)
            }else {
                let msgs = [data];
                chatContext.setGroupMsg(data.name, msgs)
            }
        })
        return () => { Socket.off() }
    }, [chatContext, chatContext.groupMsg])

    const onClickLogout = () => {
        chatContext.setSelected(null);
        Cookies.remove('id');
        history.replace('/');
    }

    const obtainChats = async () => {
        const data = await listChats(Cookies.get('id'));
        if (data.status){
            chatContext.setChats(data.chats);
        } 
    }

    useEffect(() => {
        Socket.on('deleteChat', (data) => {
            obtainChats();
            if (chatContext.selected.type === 'individual' && data.from === chatContext.selected.name){
                chatContext.setSelected(null);
            }
            if (chatContext.individualMsg.has(data.from)){
                chatContext.setIndividualMsg(data.from, []);
            }

        })
    }, [chatContext, chatContext.chats]);

    useEffect(() => {
        Socket.on('deleteGroup', (data) => {
            chatContext.setGroups();
            if (chatContext.selected.type === 'group' && data.name === chatContext.selected.name){
                chatContext.setSelected(null);
            }
            if (chatContext.individualMsg.has(data.name)){
                chatContext.setGroupMsg(data.name, []);
            }
        })
    }, [chatContext, chatContext.groups])

    useEffect(() => {
        obtainUsername();
        obtainChats();
        chatContext.setGroups();
    }, []);

    useEffect(() => {
        if (chatContext.username !== ''){
            Socket.emit('connection', {username: chatContext.username});
        }
    }, [chatContext.username])

    useEffect(() => {
        if (chatContext.groups.length > 0){
            let nameGroups = [];
            for (let i = 0; i < chatContext.groups.length; i++)
                nameGroups.push(chatContext.groups[i].name);
            Socket.emit('setGroup', {groups: nameGroups})
        }
    }, [chatContext.groups])

    const obtainUsers = async () => {
        const data = await getAllUers(Cookies.get('id'));
        return data;
    }

    const onChangeSearch = (e) => {
        setTextSearch(e.target.value);
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
        setResultArray(data);
        }else{
            setResultArray([])
        }
    }, [textSearch])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        if (openPaperSearch){
            const data = await obtainUsers();
            if (data.status){
                chatContext.setUsers(data.users)
            }
        }else {
            chatContext.setUsers(null);
        }
    }, [openPaperSearch])

    const setOpenPaperSearch = (e) => {
        setOpenSearchPaper(true)
    }

    const setClosePaperSearch = (e) => {
        if (!searchItemFocus)
            setOpenSearchPaper(false)
    }

    const onClickSearchItem = async (item) => {
        setOpenSearchPaper(false);
        setTextSearch('');
        if (!chatContext.chats.find(chat => chat.username === item.username)){
            const data = await addChat(Cookies.get('id'), item.username);
            if (data.status){
                obtainChats();
                chatContext.setSelected({
                    name: item.username,
                    image: item.image,
                    type: 'individual'
                });
            }
        }else {
            chatContext.setSelected({
                name: item.username,
                image: item.image,
                type: 'individual'
            });
        }
    }

    return(
        <>
            <AccountOptions logout={onClickLogout} open={openModalUser} onClose={e => setOpenModalUser(false)}/>
            <HomeBar textSearch={textSearch} textSearchFocus={openPaperSearch} onChangeSearch={onChangeSearch} onChange={onChangeSearch} openPaperSearch={setOpenPaperSearch} closePaperSearch={setClosePaperSearch} logout = {e => onClickLogout()} options={e => setOpenModalUser(true)}/>
            {openPaperSearch &&
                <PaperSearch onClickSearchItem={onClickSearchItem} onMouseEnter={e => setItemSearchFocus(true)} onMouseLeave={e => setItemSearchFocus(false)} items={resultArray}/>
            }
            <Grid style={{marginTop:10, position:'sticky'}} container spacing={1}>
                <Grid item xs={4}>
                    <Paper variant="outlined" style={{height:525}} className={classes.paperContainers}>
                        <ControlBar value={typeChat} onChange={onChangeControlTabs} />
                        <TabsControlChats value={typeChat} handleChangeIndex={onChangeIndex}/>
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper variant="outlined" style={{height:525}} className={classes.paperContainer}>
                        {chatContext.selected? <ChatBox /> : <NotSelectedChat/>}
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default HomeDisplay;