import { SET_CHATS, SET_GROUPS, SET_GROUP_MSG, SET_IMAGE, SET_INDIVIDUAL_MSG, SET_SELECCTION, SET_TYPEVIEW, SET_USERNAME, SET_USERS } from "../acctions";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    const { payload, type } = action;
    switch (type) {
        case SET_USERNAME:
            return {
                ...state,
                username: payload.username
            };    
        case SET_IMAGE:
            return {
                ...state,
                image:payload.image
            }
        case SET_CHATS:
            return {
                ...state,
                chats: payload.chats
            }
        case SET_GROUPS:
            return {
                ...state,
                groups: payload.groups
            }
        case SET_USERS:
            return {
                ...state,
                users: payload.data
            }
        case SET_SELECCTION: 
            return {
                ...state,
                selected: payload.item
            }
        case SET_TYPEVIEW:
            return {
                ...state,
                typeView: payload.type
            }
        case SET_INDIVIDUAL_MSG:{
            return {
                ...state,
                individualMsg: state.individualMsg.set(payload.name, payload.msgs)
            }
        }
        case SET_GROUP_MSG:{
            return {
                ...state,
                groupMsg: state.groupMsg.set(payload.name, payload.msgs)
            }
        }
        default:
            return state;
    }
}