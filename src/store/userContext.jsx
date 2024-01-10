import React, { useState } from 'react';

const UserContext = React.createContext({
  id: '',
  name: '',
  permission: '',
  history: '',
});
export const UserContextProvider = (props) => {
  const [user, setUser] = useState({
    id: '',
    name: '',
    permission: '',
    history: '',
  });
  return (
    <UserContext.Provider
      // 記得提供 context 給 Provider
      value={{ user, setUser }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
