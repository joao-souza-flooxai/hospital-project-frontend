const initialState = {
  loading: false,
  success: false,
  error: null,
  applications: [],
}

const applicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'APPLY_TO_POSITION_REQUEST':
      return { ...state, loading: true, success: false, error: null }
    case 'APPLY_TO_POSITION_SUCCESS':
      return { ...state, loading: false, success: true }
    case 'APPLY_TO_POSITION_FAILURE':
      return { ...state, loading: false, error: action.payload }
    case 'FETCH_APPLICATIONS_REQUEST':
      return { ...state, loading: true, error: null }
    case 'FETCH_APPLICATIONS_SUCCESS':
      return { ...state, loading: false, applications: action.payload }
    case 'FETCH_APPLICATIONS_FAILURE':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export default applicationReducer
