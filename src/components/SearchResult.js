import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Image, Text, Dimensions, ActivityIndicator } from 'react-native'


const { width } = Dimensions.get('window')


class SearchResult extends React.Component {

  state = {
    isFetching: true
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.appData.selected.title}</Text>
        {this.state.isFetching && (
          <View style={[styles.loader]}>
            <ActivityIndicator size="large" color="#333" />
          </View>
        )}
        <Image
          source={{uri: this.props.appData.selected.large}}
          style={styles.image}
          resizeMode="cover"
          onLoadEnd={() => {this.setState({ isFetching: false })}}
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
    justifyContent: 'center',
    padding: 20,
    marginVertical: 10,
  },
  title: {
    marginBottom: 10,
    alignItems: 'center',
    fontWeight: 'bold'
  },
  image: {
    height: '100%',
    width: width * 0.95
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
})


function mapStateToProps (state) {
  return {
    appData: state.appData
  }
}


export default connect(
  mapStateToProps,
  {}
)(SearchResult)
