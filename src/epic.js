import { FETCHING_DATA } from './constants'
import { getDataSuccess, getDataFailure } from './actions'

import 'rxjs'
import { Observable } from 'rxjs/Observable'

import { API_KEY } from './constants'


const getData = (tags) => {
  return fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&tags=${tags}&per_page=10&format=json&nojsoncallback=1`).then(resp => resp.json())
}


const fetchDataEpic = action$ =>
  action$.ofType(FETCHING_DATA)
    .mergeMap(action =>
      Observable.fromPromise(getData(action.tags))
        .map(response => getDataSuccess(response))
        .catch(error => Observable.of(getDataFailure(error)))
    )

export default fetchDataEpic
