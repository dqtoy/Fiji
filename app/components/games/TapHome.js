import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import Confirm from './Confirm';
import { isPortrait, isLandscape, isTablet } from './Platform';
import ScoreScreen from '../../screens/ScoreScreen';
import Tile from './Tile';
import { isAbsolute } from 'path';


let timerId;
export default class TapHome extends Component {
  constructor(props) {
    super(props);
    this.state = this._initBoard(props);
  }

  _initBoard = (props) => {
    let iterate = 0;
    let iterateShake = 0;
    let count = 0;
    let width = this.fontSizer(this.props.style.height * 0.225) + 20;
    let status = 'neutral';
    
    return ({
      count,
      status,
      iterate,
      iterateShake,
      timerId,
      width
    })
  }

  componentWillReceiveProps(nextProps) {
    clearInterval(timerId);
    timerId = setInterval(this.timer, 1400);
    this.props.runIndex != nextProps.runIndex && this.setState(this._initBoard(nextProps))
  }

  componentWillUnmount() {
    clearInterval(timerId);
  }
  
  componentDidMount(){
    clearInterval(timerId);
    timerId = setInterval(this.timer, 1400);

  }

  timer = () => {
   
    if( this.state.count  == this.props.data.serial.length ){
      this.setState({...this.state, count: 0, iterate: this.state.iterate + 1})
      if( this.state.iterate == 2 )
      {
        this.setState({...this.state, status: 'selected'});
      }
    }else {
      this.setState({...this.state, count: this.state.count + 1})
      
      // //condition for increasing speed
      // if ( score > 1 && score <= 3) {
      //   clearInterval(this.state.timerId);
      //   timerId = setInterval(this.timer, 1400);
      // }
      // else if (score > 3 && score <= 5) {
      //   clearInterval(timerId);
      //   timerId = setInterval(this.timer, 1200);
      // }
      // else if (score > 5 && score <= 7) {
      //   clearInterval(timerId)
      //   timerId = setInterval(this.timer, 1000);
      // }
      // else if (score > 7 && score <= 10) {
      //   clearInterval(timerId);
      //   timerId = setInterval(this.timer, 700);
      // }
    }
  }

  //This will generate random number and will check on tap condition
  GenerateRandomNumber = () => {
    
    if (this.props.data.answer == this.props.data.serial[this.state.count]) {

     // this.props.onScore()
      this.props.setProgress(1)
      this.setState({...this.state, status: 'selected'});
     
    }
    else {
      this.refs.view.shake(250).then((endState)=> {
        if(this.state.iterateShake == 2)
        {
          this.setState({...this.state, status: 'selected'});
        } else {
          this.setState({...this.state, iterateShake: this.state.iterateShake + 1, count: 0});
        }
      })
      
    }

    
  }//end of generateRandomNumber function

  render() {
    const { container, subText } = styles;

    const cellSize = Math.min(
      Math.floor(this.props.style.width / 3),
      Math.floor(this.props.style.height / 3)
    )


    const padding = Math.floor(cellSize * .05)
    const tileSize = cellSize - padding * 2

    return (
      <View style={container}>
        <Animatable.View ref="view">
        <Tile
          id={1}
          text={this.props.data.answer}
          edgeColor='white'
          status={this.state.status}
          onStatusChange={this._onStatusChange}
          style={{
            width: tileSize,
            height: tileSize,
          }}
          statusStyles = {{
            neutral: {
              View: {
                backgroundColor: '#24B2EA'
              },
              Text: {
                color: '#FFFFFF'
              }
            },
            selected: {
             
              Text: {
                color: '#FFFFFF'
              }
            }
          }}
          onPress={this.GenerateRandomNumber}
          onRender={this._renderTile}
        />
        </Animatable.View>
        <TouchableOpacity onPress={this.GenerateRandomNumber}>
            <Text style={[subText, {  fontSize: Math.max(20, tileSize - 40), marginTop: 30 }]}>
              {this.props.data.serial[this.state.count]}
            </Text>
        </TouchableOpacity>
      </View>
    );
  }

  _onStatusChange = (id, view, prevStatus, currentStatus) => {
    console.log('onstatuschange:', prevStatus, currentStatus)
    currentStatus == 'selected' && view.zoomIn(250).then((endState) => {
      this.props.onEnd();
    })
    
  }

}//End of class 

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
   
  },
  subText: {
    fontFamily: 'Cochin',
    color: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
  },
};//End of styles
