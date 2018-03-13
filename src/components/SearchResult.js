import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Image } from 'react-native'


class SearchResult extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Image source={{uri: this.props.appData.selected}} style={styles.image} />
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
  },
  image: {
    marginRight: 8,
    height: 200,
    width: 200
  },
})


function mapStateToProps (state) {
  return {
    appData: state.appData
  }
}

function mapDispatchToProps (dispatch) {
  return {}
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResult)
