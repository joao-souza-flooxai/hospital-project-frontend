const initialState = {
  loading: false,
  error: null,
  success: false,
  applications: [],
}

const adminApplicationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_APPLICATIONS_ADMIN_REQUEST':
      return { ...state, loading: true, error: null }
    case 'FETCH_APPLICATIONS_ADMIN_SUCCESS':
      return { ...state, loading: false, applications: action.payload }
    case 'FETCH_APPLICATIONS_ADMIN_FAILURE':
    case 'UPDATE_APPLICATIONS_ADMIN_FAILURE':
      return { ...state, loading: false, error: action.payload }
    case 'CLEAR_APPLICATIONS_ADMIN_ERRORS':
      return { ...state, error: null }
    case 'CLEAR_APPLICATIONS_ADMIN_SUCCESS':
      return { ...state, success: false }
    default:
      return state
  }
}

export default adminApplicationsReducer
