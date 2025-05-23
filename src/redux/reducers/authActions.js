import axios from 'axios'

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const login = (credentials, isAdmin) => {
  return async (dispatch) => {
    dispatch({ type: 'LOGIN_REQUEST' })

    try {
      const route = isAdmin ? '/login/admin' : '/login'

      const response = await axios.post(`${VITE_API_URL}${route}`, credentials)
      const { user, token } = response.data.user
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: { user, token } 
      })
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload:
          error.response?.data?.message ||
          'Erro ao fazer login. Tente novamente.'
      })
    }
  }
}


export const register = (userData) => {
  return async (dispatch) => {
    dispatch({ type: 'REGISTER_REQUEST' })

    try {
      const response = await axios.post(`${VITE_API_URL}/register`, userData)

      const { user, token } = response.data

      dispatch({ 
        type: 'REGISTER_SUCCESS', 
        payload: { user, token } 
      })
    } catch (error) {
      dispatch({
        type: 'REGISTER_FAILURE',
        payload:
          error.response?.data?.message ||
          'Erro ao registrar. Tente novamente.'
      })
    }
  }
}

export const logout = () => ({
  type: 'LOGOUT'
})
