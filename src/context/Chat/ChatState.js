import Cookies from "js-cookie";
import { useReducer } from "react";
import { listGroups } from "../../components/API/Request.API";
import { SET_CHATS, SET_GROUPS, SET_GROUP_MSG, SET_IMAGE, SET_INDIVIDUAL_MSG, SET_SELECCTION, SET_TYPEVIEW, SET_USERNAME, SET_USERS } from "../acctions";
import ChatContext from "./ChatContext";
import ChatReducer from "./ChatReducer";

const ChatState = (props) => {
    const initialState = {
        username: '',
        image: null,
        typeView:true,
        selected: null,
        users: null,
        chats: [],
        groups: [],
        individualMsg: new Map(),
        groupMsg: new Map()
    }

    const [state, dispatch] = useReducer(ChatReducer, initialState);

    const setUsername = (username) => {
        dispatch({
            type: SET_USERNAME,
            payload: {
                username
            }
        })
    }

    const setImage = (image) => {
        dispatch({
            type: SET_IMAGE,
            payload: {
                image
            }
        })
    }

    const setUsers = (data) => {
        dispatch({
            type:SET_USERS,
            payload:{
                data
            }
        })
    }

    const setChats = (chats) => {
        dispatch({
            type:SET_CHATS,
            payload:{
                chats
            }
        })
    }

    const setSelected = (item) => {
        dispatch({
            type: SET_SELECCTION,
            payload: {
                item
            }
        })
    }

    const setTypeView = (type) => {
        dispatch({
            type: SET_TYPEVIEW,
            payload: {
                type
            }
        })
    }

    const setGroups = async () => {
        const data = await listGroups(Cookies.get('id'));
        if (data.status){
            console.log(data)
            dispatch({
                type: SET_GROUPS,
                payload:{
                    groups: data.groups || []
                }
            })
        }
    }

    const setIndividualMsg = (name, msgs) => {
        dispatch({
            type: SET_INDIVIDUAL_MSG,
            payload: {
                name, msgs
            }
        })
    }

    const setGroupMsg = (name, msgs) => {
        dispatch({
            type: SET_GROUP_MSG,
            payload: {
                name, msgs
            }
        })
    }

    return(
        <ChatContext.Provider value={{
            username: state.username,
            image:state.image,
            users:state.users,
            chats: state.chats,
            groups: state.groups,
            selected: state.selected,
            typeView: state.typeView,
            individualMsg: state.individualMsg,
            groupMsg: state.groupMsg,
            setUsername,
            setImage,
            setUsers,
            setChats,
            setSelected,
            setTypeView,
            setGroups, 
            setIndividualMsg,
            setGroupMsg
        }}>
            {props.children}
        </ChatContext.Provider>
    )
}

export default ChatState;