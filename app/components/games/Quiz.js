import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  FlatList,
  StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Animbutton from './Animbutton';

const { width, height } = Dimensions.get('window');

let arrnew = [];

const jsonData = { quiz: {
    quiz1: {
      question1: {
        correctoption: 'option1',
        options: {
          option1: 'A',
          option2: 'Z'
        },
        question: 'A'
      },
      question2: {
        correctoption: 'option2',
        options: {
            option1: 'W',
            option2: 'C'
          },
        question: 'C'
      },
      question3: {
        correctoption: 'option1',
        options: {
            option1: 'F',
            option2: 'R'
          },
        question: 'F'
      },
      question4: {
        correctoption: 'option2',
        options: {
            option1: 'P',
            option2: 'Q'
          },
        question: 'Q'
      },
      question5: {
        correctoption: 'option2',
        options: {
            option1: 'H',
            option2: 'S'
          },
        question: 'S'
      },
      question6: {
        correctoption: 'option4',
        options: {
            option1: 'B',
            option2: 'S',
            option3: 'D',
            option4: 'K'
          },
        question: 'K'
      },
      question7: {
        correctoption: 'option3',
        options: {
            option1: 'E',
            option2: 'R',
            option3: 'F',
            option4: 'N'
          },
        question: 'F'
      },
      question8: {
        correctoption: 'option4',
        options: {
            option1: 'W',
            option2: 'C',
            option3: 'G',
            option4: 'L'
          },
        question: 'L'
      }
    }
  }
  };
  
  export default class Quiz extends Component {
    constructor(props) {
      super(props);
      this.state = {
        height,
        width
      }

      Dimensions.addEventListener('change', () => {
        width = Dimensions.get('window').width;
        height = Dimensions.get('window').height;
        console.log(width);
        console.log(height);
      }); 

      this.qno = 0;
      this.score = 0;
   
      const jdata = jsonData.quiz.quiz1;
      arrnew = Object.keys(jdata).map((k) => { return jdata[k]; });
      this.state = {
        question: arrnew[this.qno].question,
        options: arrnew[this.qno].options,
        correctoption: arrnew[this.qno].correctoption,
        countCheck: 0
      };
    
    }

    state = Dimensions.get("window");
    handler = dims => this.setState(dims);

    componentDidMount() {
        Dimensions.addEventListener("change", this.handler);
    }

    componentWillUnmount() {
      // Important to stop updating state after unmount
      Dimensions.removeEventListener("change", this.handler);
    }


    next() {
      if (this.qno < arrnew.length - 1) {
        this.qno++;
   
        this.setState({ countCheck: 0, 
          question: arrnew[this.qno].question, 
          options: arrnew[this.qno].options, 
          correctoption: arrnew[this.qno].correctoption });
      } else {
        this.props.quizFinish(this.score);
       }
    }

    _answer(status, ans) {
      if (status === true) {
          const count = this.state.countCheck + 1;
          this.setState({ countCheck: count });
          if (ans === this.state.correctoption) {
            this.score += 20;
            this.next();
            this.refs.questionView.zoomIn(800);
          }
        } else {
          const count = this.state.countCheck - 1;
          this.setState({ countCheck: count });
          if (this.state.countCheck < 1 || ans === this.state.correctoption) {
          this.score -= 1;
         }
        }
    }

       
    render() {

      const _this = this;
      const currentOptions = this.state.options;
      const options = Object.keys(currentOptions).map((k) => {
        return (<View
        key={k}
        style={{ alignItems: 'center', justifyContent: 'center', margin: 10 }}
        >
   
          <Animbutton 
          countCheck={_this.state.countCheck} 
          onColor={'#483d8b'} 
          effect={k === this.state.correctoption ? 'tada' : 'shake'} 
          _onPress={(status) => _this._answer(status, k)} 
          text={currentOptions[k]} 
          />
   
        </View>);
      });
      
      return (
        <ScrollView style={{ backgroundColor: '#F5FCFF', paddingTop: 5 }}>
        <StatusBar barStyle="light-content" />
        <View style={styles.toolbar}>
          <Text style={styles.toolbarTitle}>Current Score - {this.score}</Text>
        </View>
 

        <View style={styles.container}>
         {height > width ? <View style= {{ paddingTop: height * 0.2 }} /> : <View /> }
                 
        <View 
        style={{ flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
        paddingBottom: height * 0.01 }}
        >

        <Animatable.View ref="questionView" style={styles.oval}>
          <Text style={styles.welcome}>
            {this.state.question}
          </Text>
       </Animatable.View> 

          {options.length === 2 ? <View 
          style={{ flexDirection: 'row', 
          justifyContent: 'center',
          alignItems: 'center', 
          width }}
          >
          { options }
          </View> : 
          <FlatList 
            data={options}
            numColumns={2}
            style={{ flexGrow: 1 }}
            renderItem={({ item }) => <View key={item}>{item}</View>}
          />
        
          
          }
          </View>
        </View>
        </ScrollView>
      );
    
    }
  }
   
  const styles = {    
    oval: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.35,
    borderRadius: 20,
    backgroundColor: '#483d8b',
    margin: 15
    },
    container: {
      flex: 1,
      alignContent: 'space-between'
    },
    welcome: {
      fontSize: height * 0.08,
      fontWeight: 'bold',
      margin: height * 0.002,
      color: 'white',
    },
    toolbar: {
          backgroundColor: '#483d8b',
          paddingTop: height * 0.01,
          paddingBottom: 10,
          flexDirection: 'row'
      },
      toolbarTitle: {
          color: '#fff',
          justifyContent: 'center',
          textAlign: 'center',
          fontWeight: 'bold',
          flex: 1
      }
  };

