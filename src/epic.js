import { FETCHING_DATA } from './constants'
import { getDataSuccess, getDataFailure } from './actions'

import 'rxjs'
import { Observable } from 'rxjs/Observable'

import { API_KEY } from './constants'


const getData = (tags, page) => {
  return fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&tags=${tags}&per_page=50&page=${page}&format=json&nojsoncallback=1`).then(resp => resp.json())
}


const fetchDataEpic = action$ =>
  action$.ofType(FETCHING_DATA)
    .mergeMap(action =>
      Observable.fromPromise(getData(action.tags, action.page))
        .map(response => getDataSuccess(response))
        .catch(error => Observable.of(getDataFailure(error)))
    )

export default fetchDataEpic
