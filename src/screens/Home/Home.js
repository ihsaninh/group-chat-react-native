import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, StatusBar, TouchableOpacity, ScrollView, AsyncStorage} from 'react-native';
import { Icon, ListItem, Avatar } from 'react-native-elements';
import axios from 'axios';

class Home extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	chatlists: [],
	  };
	  setInterval(this.getListChat, 1000);
	}

	componentDidMount() {
		 this.getListChat();
	}

	getListChat = async () => {
        const token = await AsyncStorage.getItem("token");
        const headers = {
            Authorization: "Bearer " + token
        };
        axios
            .get("http://192.168.0.26:3333/api/v1/rooms/", { headers })
            .then(res => {
                const chatlists = res.data.data;
                this.setState({
                    chatlists: chatlists,
                });
            })
            .catch(err => {
                alert("gagal fetch data");
            });
    };

  render() {
    return (
      <View style={{flex: 1}}>
      <StatusBar backgroundColor="#1d87db" barStyle="light-content" />
      	<View style={{flex: 2, backgroundColor: '#2196f3'}}>
	      	<View style={{flex: 1, flexDirection: 'row'}}>
	      		<View style={{ flex: 1}}>
	      			<Icon
	      			  containerStyle={{marginTop: 14}}
					  name='md-menu'
					  type='ionicon'
					  color='#ffffff'
					  size={30}
					/>
	      		</View>
	      		<View style={{ flex: 5}}>
	      			<Text style={{marginTop: 16, color: '#ffffff', fontSize: 26, fontWeight: '500', marginLeft: 10}}>ChatsApp</Text>
	      		</View>
	      		<View style={{ flex: 1}}>
	      			<Icon
	      			  containerStyle={{marginTop: 14}}
					  name='md-search'
					  type='ionicon'
					  color='#ffffff'
					  size={28}
					/>
	      		</View>
	      	</View>
      	</View>
      	<View style={{flex: 14}}>
	      	<ScrollView>
	      		 {
				   this.state.chatlists.map((chatlist, i) => (
				   	<TouchableOpacity key={i} onPress={() => { this.props.navigation.navigate('Chat', { room_id: chatlist.id }) }}>
				      <ListItem
				        title={chatlist.name}
				        titleStyle={{ fontWeight: '500', fontSize: 18, color: '#454545' }}
				        rightTitle="20.00"
				        rightTitleStyle={{fontSize: 12}}
				      />
				     </TouchableOpacity>
				    ))
				  }
			</ScrollView>
      	</View>
      	<View style={styles.MainContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.TouchableOpacityStyle}>
          <Avatar
			  size={55}
			  rounded
			  overlayContainerStyle={{backgroundColor: '#2196f3', shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22, elevation: 3}}
			  icon={{name: 'message-text', type: 'material-community'}}
			  onPress={() => alert("nothing!")}
			  activeOpacity={0.7}
			/>
        </TouchableOpacity>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	MainContainer: {
	    flex: 1,
	    justifyContent: 'center',
	    alignItems: 'center',
	},
 
	TouchableOpacityStyle: {
	    position: 'absolute',
	    width: 50,
	    height: 50,
	    alignItems: 'center',
	    justifyContent: 'center',
	    right: 25,
	    bottom: 25,
	},
 
	FloatingButtonStyle: {
	    resizeMode: 'contain',
	    width: 50,
	    height: 50,
	}
});

export default Home;