import { createContext, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();

function UProvider({ children }) {
    const [user, setUser] = useState(null);

    //user functions.
    const fetchUser = async (userId, password) => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users?userid=${userId}&password=${password}`);
        if (response.data.length === 1) {
            setUser(response.data[0]);
            return response.data[0];
        } else {
            return null;
        }
    };

    const editUserById = async (userId, props) => {
        const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/users/${userId}`, {
            name: props.name, 
            userid: props.userid, 
            email: props.email,
            // bio: props.bio, 
            password: props.password,
            // image: props.image
        });

        setUser(response.data);
    };

    const createUser = async (props) => {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users?`, props);

        // TODO: update user state varibale in memory
        setUser(response.data);
    };

    //does not interact with json-server, so does not include async/await keywords
    const resetUser = () => {
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

export { UProvider };
export default UserContext;