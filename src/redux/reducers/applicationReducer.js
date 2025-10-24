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
        return {
        ...state,
        loading: false,
        success: true,
        applications: [...state.applications, action.payload.application],
    };
    case 'APPLY_TO_POSITION_FAILURE':
      return { ...state, loading: false, error: action.payload }
    case 'FETCH_APPLICATIONS_REQUEST':
      return { ...state, loading: true, error: null }
    case 'FETCH_APPLICATIONS_SUCCESS':
      return { ...state, loading: false, applications: action.payload}
    case 'FETCH_APPLICATIONS_FAILURE':
      return { ...state, loading: false, error: action.payload }
    case 'CLEAR_APPLICATION_ERRORS':
      return { ...state, error: null }
    case 'CLEAR_APPLICATION_SUCCESS':
      return { ...state, success: false }
    default:
      return state
  }
}

export default applicationReducer
