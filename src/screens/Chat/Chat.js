import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView, AsyncStorage, TouchableOpacity, TextInput, Modal } from "react-native";
import { Button, ListItem, Icon } from "react-native-elements";
import axios from "axios";
import moment from 'moment';

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputContent: "",
            chats: [],
            modalVisible: false,
            user_id: null,
            chatid: null,
            edited: false
        };
        setInterval(this.getDataChat, 500);
    }

    componentDidMount() {
        this.getDataChat();
        this.getUserData();
    }

    setModalVisible(visible, chatid) {
        this.setState({ modalVisible: visible, chatid: chatid });
    }

    static navigationOptions = ({ navigation }) => {
	    return {
		    title: navigation.getParam('room_name', navigation.state.params.room_name),
		    headerTitleStyle: {
		      fontWeight: 'bold',
		      fontSize: 16,
		      color: '#fff',
		      marginLeft: 0
		    },
            headerRight: (
                <Icon
                    name='more-vert'
                    type='material'
                    color='#ffffff'
                    containerStyle={{marginRight: 10}}
                />
            ),
		    headerTintColor: '#fff',
		    headerStyle: {
		      backgroundColor: '#2196f3',
		    },
		};
	};

    getUserData = async () => {
        const token = await AsyncStorage.getItem("token");
        const headers = {
            Authorization: "Bearer " + token
        };
        axios
            .get("http://192.168.0.26:3333/api/auth/getuser", { headers })
            .then(res => {
                const user_id = res.data.id;
                this.setState({
                    user_id: user_id,
                });
            })
            .catch(err => {
                alert('Ada error terjadi')
            });
    };

    getDataChat = async () => {
        const token = await AsyncStorage.getItem("token");
        const { navigation } = this.props;
        const room_id = navigation.getParam('room_id', this.props.navigation.state.params.room_id);
        const headers = {
            Authorization: "Bearer " + token
        };
        axios
            .get(`http://192.168.0.26:3333/api/v1/rooms/${room_id}`, { headers })
            .then(res => {
                const chats = res.data.chat;
                this.setState({
                    chats: chats,
                });
            })
            .catch(err => {
                alert('Ada error terjadi')
            });
    };

    handleSingleChat = async chatid => {
        this.setState({
            edited:true
        })
        const token = await AsyncStorage.getItem("token");
        const headers = {
            Authorization: "Bearer " + token
        };
        var chatid = chatid;
        this.setState({
            chatid: chatid
        })
         axios
            .get(`http://192.168.0.26:3333/api/v1/chats/${chatid}`, { headers })
            .then(res => {
                const chatContent = res.data.data.content;
                this.setState({
                    inputContent: chatContent,
                    modalVisible: !this.state.modalVisible
                });
            })
            .catch(err => {
                alert('Ada error terjadi')
            });
    }

    handleUpdate = async chatid => {
        const token = await AsyncStorage.getItem("token");
        const { navigation } = this.props;
        const room_id = navigation.getParam('room_id', this.props.navigation.state.params.room_id);
        const headers = {
            Authorization: "Bearer " + token
        };
        var chatid = this.state.chatid;

        axios
            .patch(`http://192.168.0.26:3333/api/v1/chats/${chatid}`, { content: this.state.inputContent, room_id: room_id }, { headers: headers })
            .then(res => {
                this.setState({
                    inputContent: "",
                    edited: false
                });
            })
            .catch(err => {
                alert('Ada error terjadi')
                alert("ada error saat mengupdate data");
            });
    };

    handleDelete = async chatid => {
        const token = await AsyncStorage.getItem("token");
        const headers = {
            Authorization: "Bearer " + token
        };
        var chatid = chatid;
        axios
            .delete(`http://192.168.0.26:3333/api/v1/chats/${chatid}`, {
                headers: headers
            })
            .then(res => {
                this.setState({ modalVisible: !this.state.modalVisible });
                alert("chat berhasil dihapus");
            })
            .catch(error => {
                alert(error);
            });
    };

    handleCreate = async () => {
        const token = await AsyncStorage.getItem("token");
        const { navigation } = this.props;
        const room_id = navigation.getParam('room_id', this.props.navigation.state.params.room_id);
        const headers = {
            Authorization: "Bearer " + token
        };

        axios
            .post("http://192.168.0.26:3333/api/v1/chats/", { content: this.state.inputContent, room_id: room_id }, { headers: headers })
            .then(res => {
                this.setState({
                    inputContent: ""
                });
            })
            .catch(err => {
                alert("Field tidak boleh kosong");
            });
    };

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
                <ScrollView
                    ref={ref => (this.scrollView = ref)}
                    onContentSizeChange={(contentWidth, contentHeight) => {
                        this.scrollView.scrollToEnd({ animated: true });
                    }}>
                    <View style={{ marginTop: 10, marginHorizontal: 5 }}>
                        {this.state.chats.map((chat, i) => (
                            <View
                                style={{
                                    marginBottom: 10,
                                    borderRadius: 20,
                                    marginLeft: 5
                                }}
                                key={i}>
                                <TouchableOpacity
                                activeOpacity={0.8}
                                    onLongPress={chat.user.id === this.state.user_id ? () => {this.setModalVisible(true, chat.id) } : ''}>
                                    <ListItem
                                        containerStyle={
                                            chat.user.id === this.state.user_id
                                                ? styles.contentuser
                                                : styles.contentuserlain
                                        }
                                        title={chat.user.username}
                                        titleStyle={{ color: "#f0f0f0" }}
                                        subtitle={
                                            <View>
                                                <Text
                                                    style={{
                                                        fontSize: 18,
                                                        color: "#f0f0f0",
                                                        fontWeight: "bold"
                                                    }}>
                                                    {chat.content}
                                                </Text>
                                                <Text style={{ color: "#f0f0f0", textAlign: 'right' }}>{ moment(chat.created_at, 'YYYY-MM-DD HH:mm:ss').format('HH:mm')}</Text>
                                            </View>
                                        }
                                    />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </ScrollView>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 7 }}>
                        <TextInput
                            style={{
                                height: 40,
                                borderColor: "gray",
                                borderWidth: 1,
                                marginTop: 10,
                                marginBottom: 10,
                                marginLeft: 10,
                                paddingLeft: 20,
                                fontWeight: "500",
                                borderRadius: 20
                            }}
                            onChangeText={inputContent =>
                                this.setState({ inputContent })
                            }
                            value={this.state.inputContent}
                            placeholder="Ketik balasan Anda"
                        />
                    </View>
                    <View style={{ flex: 2 }}>
                        <TouchableOpacity
                            style={{ height: 60, width: 60, borderRadius: 50 }}>
                            <Button
                                buttonStyle={{
                                    width: 60,
                                    marginTop: 10,
                                    marginBottom: 10,
                                    marginRight: 5,
                                    borderRadius: 10,
                                    marginLeft: 5
                                }}
                                title="Kirim"
                                onPress={(this.state.edited===true) ? this.handleUpdate : this.handleCreate}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            this.setModalVisible(!this.state.modalVisible);
                        }}>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "rgba(0,0,0,0.5)"
                            }}>
                            <View
                                style={{
                                    width: 300,
                                    height: 300,
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Button
                                        containerStyle={{ marginRight: 10 }}
                                        title="Edit Chat"
                                        onPress={() =>
                                            this.handleSingleChat(this.state.chatid)
                                        }
                                    />
                                    <Button
                                        title="Delete Chat"
                                        onPress={() =>
                                            this.handleDelete(this.state.chatid)
                                        }
                                    />
                                </View>
                            </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contentuser: {
        backgroundColor: "#2196f3",
        marginLeft: 50,
        borderRadius: 10,
        width: "80%",
        height: 75
    },
    contentuserlain: {
        backgroundColor: "#ff9800",
        marginLeft: 5,
        borderRadius: 10,
        width: "80%",
        height: 75
    }
});

export default Chat;
