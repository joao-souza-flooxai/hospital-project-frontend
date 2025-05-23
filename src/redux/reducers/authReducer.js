const userFromStorage = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: userFromStorage || null,
  loading: false,
  error: null
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
   
    case 'LOGIN_REQUEST':
    case 'REGISTER_REQUEST':
      return { ...state, loading: true, error: null }

    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('user', JSON.stringify(action.payload))
      return { ...state, loading: false, user: action.payload }

    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
      return { ...state, loading: false, error: action.payload }

    case 'LOGOUT':
      localStorage.removeItem('user')
      return { ...state, user: null }

    default:
      return state
  }
}
