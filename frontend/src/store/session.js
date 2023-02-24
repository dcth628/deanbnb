import { csrfFetch } from './csrf';

const SET_SESSION_USER = 'session/SET_SESSION_USER';
const REMOVE_SESSION_USER = 'session/REMOVE_SESSION_USER';

export const setSessionUser = (user) => ({
  type: SET_SESSION_USER,
  payload: user
});

export const removeSessionUser = () => ({
  type: REMOVE_SESSION_USER
});

export const login = (user) => async (dispatch) => {
    const {credential, password } = user;
  const res = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({ credential, password })
  });
  const data  = await res.json();
  dispatch(setSessionUser(data.user));
};

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setSessionUser(data.user));
    return response;
};

export const signup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password} = user;
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            username,
            firstName,
            lastName,
            email,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setSessionUser(data.user));
    return response;
};

export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
      method: 'DELETE',
    });
    dispatch(removeSessionUser());
    return response;
  };

const initialState = {
  user: null
};

const sessionReducer = (state = initialState, action) => {
    let newState;
  switch (action.type) {
    case SET_SESSION_USER:
        newState = Object.assign({}, state);
        newState.user = action.payload;
      return newState;
    case REMOVE_SESSION_USER:
        newState = Object.assign({}, state);
        newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
