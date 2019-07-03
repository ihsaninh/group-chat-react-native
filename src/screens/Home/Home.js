import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, StatusBar, TouchableOpacity, ScrollView} from 'react-native';
import { Icon, ListItem, Avatar } from 'react-native-elements';

class Home extends Component {
  render() {
  	const list = [
  		{
		    name: 'Prilly Latuconsina',
		    avatar_url: 'https://asset.kompas.com/crop/0x7:1000x673/750x500/data/photo/2019/01/14/1255725980.jpg',
		    subtitle: 'Hello dear, Good Evening all!'
		  },
		  {
		    name: 'Mark Zuckerberg',
		    avatar_url: 'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTQyMDA0NDgwMzUzNzcyNjA2/mark-zuckerberg_gettyimages-512304736jpg.jpg',
		    subtitle: 'Hello dear, Good Evening all!'
		  },
		  {
		    name: 'Natasha Wilona',
		    avatar_url: 'https://media.matamata.com/thumbs/2018/06/19/29810-natasha-wilona/745x489-img-29810-natasha-wilona.jpg',
		    subtitle: 'Lorem ipsum dolor sit amet'
		  },
		  {
		    name: 'Linus Torvalds',
		    avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg/220px-LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg',
		    subtitle: 'Lorem ipsum dolor sit amet'
		  },
		  {
		    name: 'Jessica Milla',
		    avatar_url: 'https://media.tabloidbintang.com/files/thumb/jessica-mila_2.jpg/745',
		    subtitle: 'Lorem ipsum dolor sit amet'
		  },
		  {
		    name: 'Nabila Ratna Ayu',
		    avatar_url: 'https://cdn2.tstatic.net/jakarta/foto/bank/images/nabilah-ayu_20180505_131901.jpg',
		    subtitle: 'Lorem ipsum dolor sit amet'
		  },
		]
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
				    list.map((l, i) => (
				      <ListItem
				        key={i}
				        leftAvatar={{ source: { uri: l.avatar_url }, size: 55 }}
				        title={l.name}
				        titleStyle={{ fontWeight: '500', fontSize: 18, color: '#454545' }}
				        subtitle={l.subtitle}
				        subtitleStyle={{paddingTop: 5}}
				        rightTitle="20.00"
				        rightTitleStyle={{fontSize: 12}}
				      />
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