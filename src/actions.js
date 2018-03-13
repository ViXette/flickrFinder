import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE, SET_SELECTED_IMAGE } from './constants'

export function fetchData (tags) {
  return {
    type: FETCHING_DATA,
    tags
  }
}

export function getDataSuccess (data) {
  return {
    type: FETCHING_DATA_SUCCESS,
    data
  }
}

export function getDataFailure (error) {
  return {
    type: FETCHING_DATA_FAILURE,
    errorMessage: error
  }
}

export function setSelectedImage (source) {
  return {
    type: SET_SELECTED_IMAGE,
    source
  }
}
