import {
  FETCHING_DATA,
  FETCHING_DATA_SUCCESS,
  FETCHING_DATA_FAILURE,
  SET_SELECTED_IMAGE,
  NEXT_PAGE,
  INC_TOTAL_DOWNLOADED_IMAGES,
} from '../constants'
import initialState from './initialState'


export default function dataReducer (state = initialState, action) {
  switch (action.type) {
    case FETCHING_DATA:
      return {
        ...state,
        images: action.isNewFetch ? [] : state.images,
        totalDownloadedImages: action.isNewFetch ? 0 : state.totalDownloadedImages,
        isFetching: true,
        page: action.isNewFetch ? 0 : state.page,
        error: false,
        msgToUser: ''
      }

    case FETCHING_DATA_SUCCESS:
      let images = [...state.images]
      if (action.data.photos && action.data.photos.photo.length > 0) {
        action.data.photos.photo.forEach(photo => {
          let flickrImageUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`
          images.push({
            title: photo.title,
            thumb: flickrImageUrl + '_t.jpg',
            large: flickrImageUrl + '_b.jpg'
          })
        })
      }
      return {
        ...state,
        isFetching: false,
        images,
        msgToUser: images.length === 0 ? 'No founded images' : ''
      }

    case FETCHING_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        msgToUser: 'Sorry. Error occurred. Please try again later.'
      }

    case SET_SELECTED_IMAGE:
      return {
        ...state,
        selected: action.source,
      }

    case NEXT_PAGE:
      return {
        ...state,
        page: state.page + 1,
      }

    case INC_TOTAL_DOWNLOADED_IMAGES:
      return {
        ...state,
        totalDownloadedImages: state.totalDownloadedImages + 1,
      }

    default:
      return state
  }
}
