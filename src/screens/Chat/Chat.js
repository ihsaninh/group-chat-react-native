import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    AsyncStorage,
    TouchableOpacity,
    TextInput,
    Modal
} from "react-native";
import { Button, ListItem } from "react-native-elements";
import axios from "axios";
import TimeAgo from "react-native-timeago";

class RoomChat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputContent: "",
            chats: [],
            modalVisible: false,
            myId: null,
            chatid: null
        };
        setInterval(this.getDataChat, 1000);
    }

    componentDidMount() {
        this.getDataChat();
    }

    setModalVisible(visible, chatid) {
        this.setState({ modalVisible: visible, chatid: chatid });
    }

    getDataChat = async () => {
        const token = await AsyncStorage.getItem("token");
        const headers = {
            Authorization: "Bearer " + token
        };
        axios
            .get("http://192.168.0.26:3000/chats", { headers })
            .then(res => {
                const chats = res.data.data;
                this.setState({
                    chats: chats,
                    myId: res.data.myId
                });
            })
            .catch(err => {
                alert("gagal fetch data");
            });
    };

    handleDelete = async chatid => {
        const token = await AsyncStorage.getItem("token");
        const headers = {
            Authorization: "Bearer " + token
        };
        var chatid = chatid;
        axios
            .delete(`http://192.168.0.26:3000/chats/${chatid}`, {
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

    handleLogout = async () => {
        console.log('ok')
        const token = await AsyncStorage.getItem("token");
        AsyncStorage.removeItem("token");
        this.props.navigation.navigate("Login");
    };

    handleCreate = async () => {
        const token = await AsyncStorage.getItem("token");
        const headers = {
            Authorization: "Bearer " + token
        };
        const data = {
            content: this.state.inputContent
        };
        axios
            .post("http://192.168.0.26:3000/chats", data, { headers: headers })
            .then(res => {
                this.setState({
                    inputContent: ""
                });
            })
            .catch(error => {
                alert("ra ono isine mas");
            });
    };

    static navigationOptions = {
        title: "Room Chat",
        headerStyle: {
            backgroundColor: "#ffffff",
            height: 50,
            textAlign: "center",
            elevation: 0
        },
        headerTintColor: "#333",
        headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 16
        },
        headerLeft: null,
        headerRight: (
            <View style={{ marginRight: 10 }}>
                <Button
                    onPress={this.handleLogout}
                    title="Logout"
                    color="#fff"
                    buttonStyle={{ borderRadius: 10 }}
                />
            </View>
        )
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
                                    onLongPress={() => {
                                        this.setModalVisible(true, chat.id);
                                    }}>
                                    <ListItem
                                        containerStyle={
                                            chat.user.id === this.state.myId
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
                                                <Text
                                                    style={{
                                                        color: "#f0f0f0"
                                                    }}>
                                                    <TimeAgo
                                                        style={{
                                                            color: "#f0f0f0"
                                                        }}
                                                        time={chat.createdAt}
                                                    />
                                                </Text>
                                            </View>
                                        }
                                        chevronColor="white"
                                        chevron
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
                                onPress={this.handleCreate}
                                value={this.state.inputContent}
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
        borderRadius: 20,
        width: "80%",
        height: 75
    },
    contentuserlain: {
        backgroundColor: "orange",
        marginLeft: 5,
        borderRadius: 20,
        width: "80%",
        height: 75
    }
});

export default RoomChat;
