const initialState = {
  loading: false,
  data: null,
  error: null,
  success: false,
};

export const preferencesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PREFERENCES_REQUEST':
    case 'UPDATE_PREFERENCES_REQUEST':
      return { ...state, loading: true, error: null };

    case 'FETCH_PREFERENCES_SUCCESS':
    case 'UPDATE_PREFERENCES_SUCCESS':
      return { ...state, loading: false, data: action.payload, success: true};

    case 'FETCH_PREFERENCES_FAILURE':
    case 'UPDATE_PREFERENCES_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'CLEAR_PREFERENCES_UPDATE_SUCCESS':
      return { ...state, success: false }
    case 'CLEAR_PREFERENCES_UPDATE_ERRORS':
      return { ...state, error: null }
    default:
      return state;
  }
};
