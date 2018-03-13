import { Navigation } from 'react-native-navigation'

import SearchPage from './components/SearchPage'
import SearchResult from './components/SearchResult'


export const registerScreens = (store, Provider) => {
  Navigation.registerComponent('flickrFinder.SearchPage', () => SearchPage, store, Provider)
  Navigation.registerComponent('flickrFinder.SearchResult', () => SearchResult, store, Provider)
}
