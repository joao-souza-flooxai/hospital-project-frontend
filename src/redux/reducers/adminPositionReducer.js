const initialState = {
  positions: [],
  loading: false,
  error: null,
  filter: '',
  page: 1,
  success: false,
  totalPages: 1
}

export default function adminPositionsReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADMIN_POSITIONS_REQUEST':
      return { ...state, loading: true, error: null }

    case 'ADMIN_POSITIONS_SUCCESS':
      return {
        ...state,
        loading: false,
        positions: action.payload.positions,
        totalPages: action.payload.totalPages
      }

    case 'ADMIN_POSITIONS_FAIL':
      return { ...state, loading: false, error: action.payload }

    case 'ADMIN_POSITIONS_SET_FILTER':
      return { ...state, filter: action.payload, page: 1 }

    case 'ADMIN_POSITIONS_SET_PAGE':
      return { ...state, page: action.payload }

    case 'ADMIN_POSITION_DELETE_REQUEST':
      return { ...state, loading: true, error: null }

    case 'ADMIN_POSITION_DELETE_SUCCESS':
      return {
        ...state,
        loading: false,
        positions: state.positions.filter((pos) => pos.id !== action.payload)
      }

    case 'ADMIN_POSITION_DELETE_FAIL':
      return { ...state, loading: false, error: action.payload }

      case 'ADMIN_POSITION_UPDATE_REQUEST':
  return { ...state, loading: true, error: null }

    case 'ADMIN_POSITION_UPDATE_SUCCESS':
      return {
        ...state,
        loading: false,
        positions: state.positions.map((pos) =>
          pos.id === action.payload.id ? action.payload : pos
        ),
      }

    case 'ADMIN_POSITION_UPDATE_FAIL':
      return { ...state, loading: false, error: action.payload }

      case 'ADMIN_POSITION_CREATE_REQUEST':
  return { ...state, loading: true, error: null }

  case 'ADMIN_POSITION_CREATE_SUCCESS':
    return {
      ...state,
      loading: false,
      positions: [...state.positions, action.payload]
    }

  case 'ADMIN_POSITION_CREATE_FAIL':
    return { ...state, loading: false, error: action.payload }
    
  case 'CLEAR_ADMIN_POSITIONS_ERRORS':
    return { ...state, error: null }
  case 'CLEAR_ADMIN_POSITIONS_SUCCESS':
    return { ...state, success: false }

    default:
      return state
  }
}
