import { createContext, useState, useCallback } from 'react';
import axios from 'axios';

const UserContext = createContext();

function Provider({ children }) {
    const [user, setUser] = useState({});


    //user functions.
    const fetchUser = async (uid, pwd) => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users?userid=${uid}&password=${pwd}`);

        if (response.data.length != 1)
            setUser(null);
        else
            setUser(response.data[0]);
    };

    const editUserById = async (uid, userProps) => {
        const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/users?name=${userProps.name}&userid=${uid}&email=${userProps.email}&bio=${userProps.bio}&password=${userProps.password}&image=${userProps.image}`);

        //updating state
        fetchUser(uid, userProps.password);
    }

    const createUser = async (userProps) => {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users?name=${userProps.name}&userid=${userProps.userid}&email=${userProps.email}&bio=${userProps.bio}&password=${userProps.password}&image=${userProps.image}`);

        //updating state
        fetchUser(userProps.userid, userProps.password);
    }

    //does not interact with json-server, so does not include async/await keywords
    const resetUser =  () => {
        setUser(null);
    }

    const valueToShare = {
        user,
        fetchUser,
        editUserById,
        createUser,
        resetUser
    };
        
   
    return <UserContext.Provider value={valueToShare}>
        {children}
    </UserContext.Provider>
}

export { Provider };
export default UserContext;