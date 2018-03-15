import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator, Image, FlatList } from 'react-native'

import debonce from 'lodash.debounce'

import { fetchData, setSelectedImage, setNextPage } from '../actions'


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
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Search images by tag"
          style={styles.textInput}
          onChangeText={this.tagChangedHandler}
        />
        {
          this.props.isFetching
          &&
          <View style={[styles.loader]}>
            <ActivityIndicator size="large" color="#333" />
          </View>
        }

        <FlatList
          data={this.props.appData.images}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{ marginBottom: 5 }}
              onPress={(i) => {
                this.props.setSelectedImage(item)

                this.props.navigator.push({
                  screen: 'flickrFinder.SearchResult',
                  title: 'Details'
                })
              }}>
              <Image source={{uri: item}} style={styles.image} />
            </TouchableOpacity>
          )}
          numColumns={3}
          keyExtractor={(item) => item}
          onEndReached={() => {
            this.props.setNextPage()

            if (this.props.appData.page >= 1) {
              this.props.fetchData(this.search, this.props.appData.page, false)
            }
          }}
          onEndReachedThreshold={0.5}
        />
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
    borderWidth: 1,
    fontSize: 18,
  },
  loader: {
    flex: 1,
    justifyContent: 'center'
  },
  image: {
    marginRight: 8,
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
    setNextPage: () => dispatch(setNextPage())
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage)
