import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator, Image, FlatList, Platform } from 'react-native'
import * as Progress from 'react-native-progress'

import debonce from 'lodash.debounce'

import { fetchData, setSelectedImage, setNextPage, incTotalDownloadedImages } from '../actions'
import { IMAGES_REP_PAGE } from '../constants'


class SearchPage extends React.Component {

  constructor (props) {
    super(props)

    this.tagChangedHandler = debonce(this.tagChangedHandler, 1000)
  }


  tagChangedHandler = (val) => {
    this.search = val
    this.props.fetchData(val, this.props.appData.page, true)
  }


  render() {
    let { isFetching, images, totalDownloadedImages, page, error, msgToUser } = this.props.appData

    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Search images by tag"
          style={styles.textInput}
          onChangeText={this.tagChangedHandler}
        />
        {isFetching && (
          <View style={[styles.loader]}>
            <ActivityIndicator size="large" color="#333" />
          </View>
        )}
        {images.length - totalDownloadedImages > 0 && (
          <Progress.Bar
            style={styles.progress}
            animated
            width={null}
            progress={1 - ((images.length - totalDownloadedImages) / (images.length - page * IMAGES_REP_PAGE))}
            borderRadius={0}
            color="#000"
          />
        )}

        {images.length > 0 ? (
          <FlatList
            data={images}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  this.props.setSelectedImage(item)
                  this.props.navigator.push({
                    screen: 'flickrFinder.SearchResult',
                    title: 'Details'
                  })
                }}>
                <Image
                  source={{uri: item.thumb}}
                  style={styles.image}
                  onLoadEnd={() => {this.props.incTotalDownloadedImages()}}
                />
              </TouchableOpacity>
            )}
            numColumns={3}
            keyExtractor={(item, i) => i + item}
            onEndReached={() => {
              this.props.setNextPage()
              this.props.fetchData(this.search, page, false)
            }}
            onEndReachedThreshold={0.5}
          />)
          : error
            ? <Text style={{ marginTop: 50, color: 'red' }}>{msgToUser}</Text>
            : <Text style={{ marginTop: 50, color: 'gray' }}>{msgToUser}</Text>
        }
      </View>
    )
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  textInput: {
    width: '90%',
    marginVertical: 10,
    padding: 5,
    borderColor: '#CCC',
    borderWidth: Platform.OS === 'ios' ? 1 : 0,
    fontSize: 18,
  },
  loader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  progress: {
    width: '90%',
    marginBottom: 10,
  },
  image: {
    margin: 5,
    height: 100,
    width: 100
  },
})


function mapStateToProps (state) {
  return {
    appData: state.appData
  }
}


function mapDispatchToProps (dispatch) {
  return {
    fetchData: (tags, page, isNewFetch) => dispatch(fetchData(tags, page, isNewFetch)),
    setSelectedImage: (i) => dispatch(setSelectedImage(i)),
    setNextPage: () => dispatch(setNextPage()),
    incTotalDownloadedImages: () => dispatch(incTotalDownloadedImages()),
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage)
