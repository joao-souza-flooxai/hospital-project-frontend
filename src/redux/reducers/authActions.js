import axios from 'axios'

const API_URL = 'http://localhost:5554' 


export const login = (credentials, isAdmin) => {
  return async (dispatch) => {
    dispatch({ type: 'LOGIN_REQUEST' })

    try {
      const route = isAdmin ? '/login/admin' : '/login'

      const response = await axios.post(`${API_URL}${route}`, credentials)

      const user = response.data.user

      dispatch({ type: 'LOGIN_SUCCESS', payload: user })
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


export const logout = () => ({
  type: 'LOGOUT'
})
