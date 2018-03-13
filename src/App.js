import React from 'react'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'

import { registerScreens } from './screens'
import configureStore from './store/configureStore';


const store = configureStore()

registerScreens(store, Provider)

const navigatorStyle = {
  statusBarColor: 'black',
  statusBarTextColorScheme: 'light',
  navigationBarColor: 'black',
  navBarBackgroundColor: '#0a0a0a',
  navBarTextColor: 'white',
  navBarButtonColor: 'white',
  tabBarButtonColor: 'red',
  tabBarSelectedButtonColor: 'red',
  tabBarBackgroundColor: 'white',
  topBarElevationShadowEnabled: false,
  navBarHideOnScroll: true,
  tabBarHidden: true,
  drawUnderTabBar: true
}


Navigation.startSingleScreenApp({
  screen: {
    screen: 'flickrFinder.SearchPage',
    title: 'Search',
    navigatorStyle,
    navigatorButtons: {}
  }
})

