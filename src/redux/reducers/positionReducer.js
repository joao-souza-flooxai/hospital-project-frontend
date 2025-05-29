const initialState = {
  positions: [],
  loading: false,
  error: null,
  filter: '',
  page: 1,
  totalPages: 1,
  success: false,
}

export const positionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_POSITIONS_REQUEST':
      return { ...state, loading: true, error: null }

    case 'FETCH_POSITIONS_SUCCESS':
      return {
        ...state,
        loading: false,
        positions: action.payload.positions,
        totalPages: action.payload.totalPages,
      }

    case 'FETCH_POSITIONS_FAILURE':
      return { ...state, loading: false, error: action.payload }

    case 'SET_FILTER':
      return { ...state, filter: action.payload, page: 1 }

    case 'SET_PAGE':
      return { ...state, page: action.payload }
    default:
      return state
  }
}
