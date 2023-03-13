import jwtDecode from 'jwt-decode';
import { createContext, useReducer } from 'react';

interface State {
  user: any;
}

interface Action {
  type: 'LOGIN' | 'LOGOUT';
  payload?: any;
}

const initialState = {
  user: null
}

if (localStorage.getItem("token")) {
  const decodedToken = jwtDecode(localStorage.getItem("token") as string) as any;

  if (!decodedToken || !decodedToken.exp || decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData: any) => {},
  logout: () => {}
});

function authReducer(state: State, action: Action): State {
  switch(action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null
      }
    default:
      return state;
  }
}

function AuthProvider(props: any) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData: any) => {
    localStorage.setItem('token', userData.token);
    dispatch({
      type: 'LOGIN',
      payload: userData
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' })
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };