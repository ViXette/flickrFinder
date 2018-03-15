import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE, SET_SELECTED_IMAGE, NEXT_PAGE } from '../constants'
import initialState from './initialState'


export default function dataReducer (state = initialState, action) {
  switch (action.type) {
    case FETCHING_DATA:
      return {
        ...state,
        images: action.isNewFetch ? [] : state.images,
        isFetching: true
      }

    case FETCHING_DATA_SUCCESS:
      let images = [...state.images]
      if (action.data.photos && action.data.photos.photo.length > 0) {
        action.data.photos.photo.forEach(photo => {
          images.push(`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_t.jpg`)
        })
      }
      return {
        ...state,
        isFetching: false,
        images
      }

    case FETCHING_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }

    case SET_SELECTED_IMAGE:
      return {
        ...state,
        selected: action.source
      }

    case NEXT_PAGE:
      return {
        ...state,
        page: state.page + 1
      }

    default:
      return state
  }
}
