import React, { Component } from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import Orientation from 'react-native-orientation'
import GameWrapper from './GameWrapper'
import HeadToHeadPlayScreen from '../../screens/HeadToHeadPlayScreen';
import Nimo from '../Nimo'
// import { touchDelegate } from './touchDelegate'

const TOP_HEIGHT = 40
const BOTTOM_PADDING = 5
const HEADER_TO_REMOVE = 50

export default class HeadToHeadGame extends Component {
  _tiles = []
  constructor(props) {
    super(props)
    this.state = {
      myScore: 0,
      otherScore: 0,
    }
  }

  _addToTiles = (tile) => {
    this._tiles.push(tile)
  }

  _callTile = (nativeEvent) => {
    this._tiles.forEach(({ view, callback, reverse }) => {
      view.measure((x, y, width, height, pageX, pageY) => {
        const xLow = reverse ? pageX - width : pageX
        const xHigh = reverse ? pageX : pageX + width
        const yLow = reverse ? pageY - height : pageY
        const yHigh = reverse ? pageY : pageY + height
        if (nativeEvent.pageX <= xHigh && nativeEvent.pageX >= xLow
          && nativeEvent.pageY <= yHigh && nativeEvent.pageY >= yLow) {
          callback()
        }
      })
    })
  }

  _addMyScore = (addToScore) => {
    this.setState((prevState, props)=>({
      ...this.state, myScore: prevState.myScore + addToScore
    }))
  }

  _addOtherScore = (addToScore) => {
    this.setState((prevState, props)=>({
      ...this.state, otherScore: prevState.otherScore + addToScore
    }))
  }

  componentDidMount() {
    Orientation.lockToPortrait();
  }

  componentWillUnmount() {
    Orientation.unlockAllOrientations();
  }

  render() {
    let { width, height } = Dimensions.get('window')

    if( width > height )
    {
      let temp = width
      width = height
      height = temp
    }

    return (
      <View
        onStartShouldSetResponder={(e) => true}
        onStartShouldSetResponderCapture={(e) => true}
        onTouchStart={({ nativeEvent }) => this._callTile(nativeEvent)}
        style={[styles.container, {backgroundColor: this.props.backgroundColor}]}>
        <View style={{flex:1, transform:[{scaleY:-1},{scaleX:-1}]}}>
          <View style={[styles.header, {backgroundColor: this.props.headerColor}]}>
            <Text style={[styles.info, {backgroundColor: this.props.backgroundColor}]}>
              {this.state.otherScore}
            </Text>
            <Nimo
              style={styles.nimo}    
            />
            <Text style={[styles.info, {backgroundColor: this.props.backgroundColor}]}>
              {this.state.myScore}
            </Text>
          </View>
          <GameWrapper
            gameComponent={this.props.gameComponent}
            delegateTouch={this._addToTiles}
            reverse={true}
            play={this.props.play}
            onEnd={this.props.onEnd}
            onScore={this._addOtherScore}
            gameData={this.props.gameData}
            progressBarColor={this.props.progressBarColor}
            style={{
              height: height/2 - TOP_HEIGHT - HEADER_TO_REMOVE,
              width
            }} />
        </View>
        <View style={{flex:1}}>
          <View style={[styles.header, {backgroundColor: this.props.headerColor}]}>
            <Text style={[styles.info, {backgroundColor: this.props.backgroundColor}]}>
              {this.state.myScore}
            </Text>
            <Nimo
              style={styles.nimo}    
            />
            <Text style={[styles.info, {backgroundColor: this.props.backgroundColor}]}>
              {this.state.otherScore}
            </Text>
          </View>
          <GameWrapper
            gameComponent={this.props.gameComponent}
            delegateTouch={this._addToTiles}
            reverse={false}
            play={this.props.play}
            onEnd={this.props.onEnd}
            onScore={this._addMyScore}
            gameData={this.props.gameData}
            progressBarColor={this.props.progressBarColor}            
            style={{
              height: height/2 - TOP_HEIGHT - HEADER_TO_REMOVE,
              width
            }} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E53554',
  },
  header: {
    height: TOP_HEIGHT,
    alignSelf: 'stretch',
    backgroundColor: '#34E8E8',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  game: {
    alignContent: 'stretch',
    backgroundColor: '#34E8E8'
  },
  info: {
    height: TOP_HEIGHT * 0.75,
    width: TOP_HEIGHT * 1.5,
    borderRadius: TOP_HEIGHT/4,
    backgroundColor: '#B1D63E',
    color: '#FFFFFF',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 24
  },
  nimo: {
    height: TOP_HEIGHT,
    width: TOP_HEIGHT
  }
})

HeadToHeadGame.propTypes = {
  myScore: PropTypes.number,
  play: PropTypes.string,
  onEnd: PropTypes.func,
  onScore: PropTypes.func,
  gameComponent: PropTypes.func,
  gameData: PropTypes.array,
  backgroundColor: PropTypes.string,
  headerColor: PropTypes.string,
  progressBarColor: PropTypes.string,
  delegateTouch: PropTypes.func
}

// export default touchDelegate(HeadToHeadGame)