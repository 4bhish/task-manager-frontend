import React, { createContext, useState } from 'react';

export const UserProvider = createContext();

function UserContext({ children }) {
    const [user, setUser] = useState(null);
  
    return (
        <UserProvider.Provider value={{ user, setUser }}>
            {children}
        </UserProvider.Provider>
    );
}

export default UserContext;
