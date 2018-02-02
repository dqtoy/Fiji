import React, {PureComponent} from 'react'
import {FlatList,View, Text, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import SvgUri from 'react-native-svg-uri'
import { Buffer } from 'buffer'
import { fetchGameHighScores } from '../redux/score' 

class ScoreScreen extends PureComponent{
    componentDidMount(){
        this.props.dispatch(fetchGameHighScores(this.props.navigation.state.params.game._id))
        console.log(this.props.navigation.state.params.user.name)
    }

    _keyExtractor = (item, index) => item._id

    _renderItem = ({item}) => (
        <View style={styles.RankingStyle}><Text style={{fontWeight:'bold', fontSize:30,}}>{item.score}</Text></View>
    )
    render(){
        return(
            this.props.isFetching
                ?
                    <ActivityIndicator size="large" style={{ marginTop: 100 }}/>
                :
                    this.props.gameScore.length
                        ?
                
                        <View style={styles.ScoreCardStyle}>
                            <View style={styles.PlayerScoreViewStyle}>
                                <View style={styles.PlayerScoreStyle}><Text style={{fontWeight:'bold', fontSize:50,}}>A</Text></View>
                                <View style={styles.CharacterStyle}></View>
                                <View style={styles.PlayerScoreStyle}><Text style={{fontWeight:'bold', fontSize:50,}}>B</Text></View>
                            </View>
                            <View style={styles.RankingViewStyle}>
                                <FlatList
                                showsVerticalScrollIndicator={false}
                                data={ this.props.gameScore }
                                renderItem={this._renderItem}
                                keyExtractor={this._keyExtractor}
                                />
                            </View>
                        </View>

                        :

                        <View><Text>No body has scored !</Text></View>
        )
    }
}

ScoreScreen.propTypes = {
    gameScore:PropTypes.array,
    navigation: PropTypes.shape({
        state: PropTypes.shape({
          params: PropTypes.shape({
            game: PropTypes.object.isRequired
          })
        })
      })
}

const styles = StyleSheet.create({
    ScoreCardStyle:{
       flex:1 
    },
    PlayerScoreViewStyle:{
        flex:1,
        backgroundColor:'#edca2f',
        flexDirection:'row'
    },
    RankingViewStyle:{
        flex:1,
        backgroundColor:'#59c6c3'
    },
    PlayerScoreStyle:{
        flex:3,
        justifyContent:'center',
        alignItems:'center'
    },
    RankingStyle:{
        marginTop:'2%',
        marginBottom:'2%'
    },
    CharacterStyle:{
        flex:2,
        borderColor:'black',
        borderWidth:2,
        borderRadius:30,
        marginTop:'5%',
        marginBottom:'5%'
    }
});

export default connect( state => ({
    gameScore: state.score.gameHighScores,
    isFetching: state.game.isFetching
}))(ScoreScreen)