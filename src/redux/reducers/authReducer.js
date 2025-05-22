const initialState = {
  user: null // id, name, role: user ou admin 
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload }
    case 'LOGOUT':
      return { ...state, user: null }
    default:
      return state
  }
}

export const login = (userData) => ({
  type: 'LOGIN_SUCCESS',
  payload: userData
})

export const logout = () => ({
  type: 'LOGOUT'
})
