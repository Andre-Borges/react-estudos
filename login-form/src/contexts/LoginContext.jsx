import { createContext } from 'react';
import useStorage from '../utils/useStorage';

export const LoginContext = createContext({
  token: null,
  setToken: () => {},
});

export function LoginProvider({ children }) {
  const [token, setToken] = useStorage('token');

  return (
    <LoginContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
