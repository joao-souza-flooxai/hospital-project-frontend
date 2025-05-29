const userFromStorage = JSON.parse(localStorage.getItem('user'))
const tokenFromStorage = localStorage.getItem('token')

const initialState = {
  user: userFromStorage || null,
  token: tokenFromStorage || null,
  loading: false,
  error: null,
  success: false,
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'LOGIN_REQUEST':
    case 'REGISTER_REQUEST':
      return { ...state, loading: true, error: null }

    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      localStorage.setItem('token', action.payload.token)
      return { 
        ...state, 
        loading: false, 
        user: action.payload.user, 
        token: action.payload.token 
      }

    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
      return { ...state, loading: false, error: action.payload }

    case 'LOGOUT':
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      return { ...state, user: null, token: null }

      case 'AUTH_UPDATE_USER':
      return {
        ...state,
        user: action.payload
      };
    case 'CLEAR_LOGIN_ERRORS':
      return { ...state, error: null }
    case 'CLEAR_LOGIN_SUCCESS':
      return { ...state, success: false }

    default:
      return state
  }
}
