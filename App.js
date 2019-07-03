// import react from "react"
// import { createStackNavigator, createAppContainer } from 'react-navigation';
// import Login from "./src/screens/Login/Login"
// import Home from "./src/screens/Home/Home"
// import Chat from "./src/screens/Chat/Chat"

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import AppContainer from './src/screens/Route'
import { YellowBox } from 'react-native';

export default class App extends Component {
  render() {
    YellowBox.ignoreWarnings(['Warning: Async Storage has been extracted from react-native core'])
    return (
      <AppContainer />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})

// const AppNavigator = createStackNavigator({
  
//   Login: {
//     screen: Login,
//   },
//   Home: {
//     screen: Home,
//   },
//   Chat: {
//     screen: Chat,
//   },

// },{
//   headerMode: 'none',
//   navigationOptions: {
//   headerVisible: false,
// },});

// export default createAppContainer(AppNavigator);