import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, ImageBackground, ScrollView, Dimensions, AsyncStorage } from 'react-native'
import { Input, Icon, Avatar } from 'react-native-elements'
import axios from 'axios'

class Login extends Component {
	constructor(props) {
	  super(props)
	
	  this.state = {
	  	inputEmail: '',
	  	inputPassword: ''
	  };
	}
	
	handleLogin = () => {
        axios.post("http://192.168.0.26:3333/api/auth/login", {
                email: this.state.inputEmail,
                password: this.state.inputPassword
            })
            .then(res => {
                const token = res.data.token;
                const user_id = res.data.id
                AsyncStorage.setItem("token", token);
                AsyncStorage.setItem("user_id", user_id);
                this.props.navigation.navigate('Home')
            })
            .catch(error => {
            	console.log(error)
                alert("kesalahan saat login silahkan coba lagi")
            })
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
					<View style={{marginLeft: 10, marginTop: 20, flexDirection: 'row'}}>
						<View style={{alignSelf: 'flex-start', alignItems: 'flex-start'}}>
					    	<Text style={{color: '#494F5A', fontSize: 30, fontWeight: '500'}}>Sign In</Text>
					    	<Text style={{color: '#494F5A', fontSize: 16, textDecorationLine: 'underline'}}>Forgot Password</Text>
				    	</View>
				    	<View style={{alignSelf: 'flex-end', alignItems: 'flex-end'}}>
					    	<Avatar
					    	  size={50}
							  rounded
							  icon={{name: 'arrow-forward', type: 'material'}}
							  onPress={this.handleLogin}
							  activeOpacity={0.7}
							  overlayContainerStyle={{backgroundColor: '#5280D7'}}
							  containerStyle={{marginTop: -45, marginLeft: 110}}
							 
							/>
						</View>
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

})

export default Login