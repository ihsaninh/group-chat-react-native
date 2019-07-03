import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, ScrollView, Dimensions } from 'react-native';
import { Input, Icon, Avatar } from 'react-native-elements';

class Login extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	inputEmail: '',
	  	inputPassword: ''
	  };
	}

	_handleLogin = () => {
		if(this.state.inputEmail.length < 1 ||this.state.inputPassword.length < 1 ) {
			alert('Field ga boleh kosong')
		}else if(this.state.inputEmail !== 'ihsan.inh@gmail.com') {
			alert('Email salah')
		}else if(this.state.inputPassword !== '123') {
			alert('Password salah')
		} else if(this.state.inputEmail === 'ihsan.inh@gmail.com' && this.state.inputPassword === '123'){
			 this.props.navigation.navigate("Home");
		}
	} 

  render() {
    return (
      <View style={{flex: 1}}>
      		<ScrollView>
			    <View style={{marginTop: 60, marginLeft: 30}}>
			    	<Text style={{fontSize: 45, color: '#ffffff', fontWeight: '400'}}>Welcome {'\n'}Back </Text>
			    </View>
			    <View style={{marginHorizontal: 20, marginTop: 70}}>
			    	<Input
					  placeholder='Email' 
					  onChangeText={inputEmail => this.setState({ inputEmail }) }
					/>
					<Input
					  placeholder='Password' containerStyle={{marginTop: 20}}
					  onChangeText={inputPassword => this.setState({ inputPassword }) }
					/>
					<View style={{marginLeft: 10, marginTop: 20}}>
				    	<Text style={{color: '#494F5A', fontSize: 30, fontWeight: '500'}}>Sign In</Text>
				    	<Text style={{color: '#494F5A', fontSize: 16, textDecorationLine: 'underline'}}>Forgot Password</Text>
				    	<Avatar
				    	  size={50}
						  rounded
						  icon={{name: 'arrow-forward', type: 'material'}}
						  onPress={this._handleLogin}
						  activeOpacity={0.7}
						  overlayContainerStyle={{backgroundColor: '#5280D7'}}
						  containerStyle={{marginLeft: 200, marginTop: -45}}
						 
						/>
				    </View>
				    <View style={{marginTop: 70}}>
				    	<Text style={{textAlign: 'center'}}>Dont have an account? <Text style={{color: '#7D93BB'}}>Please Signup</Text></Text>
				    </View>
			    </View>
			    </ScrollView>
			<ImageBackground source={require('../../../assets/img/bglogin.png')} style={{width: Dimensions.get("window").width, height: Dimensions.get("window").height, position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, zIndex: -100}}>
			</ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

export default Login;