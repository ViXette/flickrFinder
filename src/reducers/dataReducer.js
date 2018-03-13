import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE, SET_SELECTED_IMAGE } from '../constants'
import initialState from './initialState'


export default function dataReducer (state = initialState, action) {
  switch (action.type) {
    case FETCHING_DATA:
      return {
        ...state,
        images: [],
        isFetching: true
      }

    case FETCHING_DATA_SUCCESS:
      let images = []
      if (action.data.photos && action.data.photos.photo.length > 0) {
        action.data.photos.photo.forEach(photo => {
          images.push(`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_h_d.jpg`)
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

    default:
      return state
  }
}
