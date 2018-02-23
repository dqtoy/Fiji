import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import ProgressBar from '../ProgressBar'

export default class GameWrapper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      progress: 0,
      dataIndex: 0
    }
  }

  render() {
    const GameComponent = this.props.gameComponent

    const ProgressBarComponent = this.props.play == 'TRIES'
      ?
      <ProgressBar
        fillStyle={{}}
        backgroundStyle={{ backgroundColor: '#cccccc', borderRadius: 2 }}
        fillStyle={{ backgroundColor: this.props.progressBarColor }}
        style={{ width: this.props.style.width }}
        progress={this.state.progress}
      />
      :
      <ProgressBar
        fillStyle={{}}
        backgroundStyle={{ backgroundColor: '#cccccc', borderRadius: 2 }}
        fillStyle={{ backgroundColor: this.props.progressBarColor }}
        style={{ width: this.props.style.width }}
        progress={1}
        duration={20000}
        onEnd={this.props.onEnd}
      />

    return (
      <View style={{
        flex: 1
      }}
      >
        {ProgressBarComponent}
        <GameComponent
          data={this.props.gameData[this.state.dataIndex]}
          runIndex={this.state.dataIndex}
          onScore={this.props.onScore}
          onEnd={this._onEnd}
          setProgress={this._setProgress}
          style={{
            height: this.props.style.height,
            width: this.props.style.width
          }}
        />
      </View>
    )
  }

  _setProgress = (progress) => {
    this.setState(...this.state,
      { progress: (progress + this.state.dataIndex) / this.props.gameData.length })
  }

  _onEnd = () => {
    let dataIndex = this.state.dataIndex
    if (++dataIndex < this.props.gameData.length) {
      this.setState(...this.state, { dataIndex })
    } else {
      this.props.onEnd()
    }
  }
}

GameWrapper.propTypes = {
  play: PropTypes.string,
  onEnd: PropTypes.func,
  onScore: PropTypes.func,
  gameComponent: PropTypes.func,
  gameData: PropTypes.array,
  progressBarColor: PropTypes.string
}