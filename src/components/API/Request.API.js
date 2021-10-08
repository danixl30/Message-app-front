import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = 'http://localhost:4000/';

export const signup = async (username, email, password, confirmPassword, image) => {
    const res = await axios.post(baseUrl+'user/register', {
        username,
        email,
        password,
        confirmPassword,
        image
    });
    return res.data;
}

export const login = async (username, password) => {
    const res = await axios.post(baseUrl+'user/login', {
        username,
        password
    })

    return res.data;
}

export const getUsername = async (token) => {
    const res = await axios.get(baseUrl + 'user/username', {
        headers:{
            auth: token
        }
    });
    return res.data;
}

export const updateUsername = async (token, username) => {
    const res = await axios.put(baseUrl+'user/update', 
    {
        username
    }, {
        headers:{
            auth: token
        }
    });
    return res.data;
}

export const updateEmail = async (token, email) => {
    const res = await axios.put(baseUrl+'user/update', 
    {
        email
    }, {
        headers:{
            auth: token
        }
    })
    return res.data;
}

export const updatePass = async (token, password) => {
    const res = await axios.put(baseUrl+'user/update', 
    {
        password
    }, {
        headers:{
            auth: token
        }
    })
    return res.data;
}

export const updateImage = async (image) => {
    const res = await axios.put(baseUrl+'user/update', 
    {
       image 
    }, {
        headers:{
            auth: Cookies.get('id')
        }
    })
    return res.data;

}

export const deleteUser = async (token) => {
    const res = await axios.delete(baseUrl + 'user/delete', {
        headers:{
            auth: token
        }
    });
    return res.data;
}

export const getAllUers = async (token) => {
    const res = await axios.get(baseUrl + 'user/allUsers', {
        headers:{
            auth: token
        }
    });
    return res.data;
}

export const verifyUser = async (token, password) => {
    const res = await axios.post(baseUrl+'user/verifyPass', {
        password
    }, {
        headers: {
            auth: token
        }
    })

    return res.data;
}

export const listChats = async (token) => {
    const res = await axios.get(baseUrl + 'chat/listChats', {
        headers: {
            auth: token
        }
    })

    return res.data;
}

export const addChat = async (token, chatName) => {
    const res = await axios.post(baseUrl+'chat/insert', {
        chatName
    }, {
        headers: {
            auth: token
        }
    })

    return res.data;
}

export const deleteChat = async (token, chatName) => {
    const res = await axios.delete(baseUrl+'chat/deleteChat', {
        headers: {
            auth: token
        },
        data: {
            chatName
        }
    })

    return res.data;
}

export const listGroups = async (token) => {
    const res = await axios.get(baseUrl+'group/listGroups', {
        headers: {
            auth: token
        }
    })

    return res.data;
}

export const cretateGroup = async (token, name, members, image) => {
    const res = await axios.post(baseUrl+'group/create', {
        name,
        usersToAdd: members,
        image
    }, {
        headers: {
            auth: token
        }
    })

    return res.data;
}

export const listMembers = async (token, name) => {
    const res = await axios.post(baseUrl+'group/listMembers', {
        name
    }, {
        headers: {
            auth: token
        }
    })
    return res.data;
}

export const deleteMember = async (username, name) => {
    const res = await axios.delete(baseUrl+'group/deleteMember', {
        headers: {
            auth: Cookies.get('id')
        },
        data: {
            username,
            name
        }
    });

    return res.data;
}

export const setAdmin = async (username, name) => {
    console.log(username);
    const res = await axios.put(baseUrl+'group/setAdmin', {
        username,
        name
    }, {
        headers: {
            auth: Cookies.get('id')
        }
    })

    return res.data;
}

export const unsetAdmin = async (username, name) => {
    const res = await axios.put(baseUrl+'group/unsetAdmin', {
        username, 
        name
    }, {
        headers: {
            auth: Cookies.get('id')
        }
    })

    return res.data;
}

export const addMember = async (name, username) => {
    const res = await axios.put(baseUrl+'group/addMember', {
        name, 
        username
    }, {
        headers: {
            auth: Cookies.get('id')
        }
    })

    return res.data;
}

export const updateGroupName = async (name, newName) => {
    const res = await axios.put(baseUrl+'group/changeName', {
        name, newName
    }, {
        headers: {
            auth: Cookies.get('id')
        }
    })

    return res.data;
}

export const updateGroupImage = async (name, image) => {
    const res = await axios.put(baseUrl+'group/setImage', {
        name, image
    }, {
        headers: {
            auth: Cookies.get('id')
        }
    })

    return res.data;
}