const initialState = {
  loading: false,
  error: null,
  applications: [],
}

const adminApplicationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_APPLICATIONS_ADMIN_REQUEST':
      return { ...state, loading: true, error: null }
    case 'FETCH_APPLICATIONS_ADMIN_SUCCESS':
      return { ...state, loading: false, applications: action.payload }
    case 'FETCH_APPLICATIONS_ADMIN_FAILURE':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export default adminApplicationsReducer
