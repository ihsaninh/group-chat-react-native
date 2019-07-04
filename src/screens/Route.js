import Login from "./Login/Login"
import AuthLoading from './AuthLoading';
import Home from "./Home/Home"
import Chat from "./Chat/Chat"

import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation'

const AppStack = createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: { gesturesEnabled: true }
        },
        Chat: {
            screen: Chat,
            navigationOptions: { gesturesEnabled: true }
        }
    },
    {
        defaultNavigationOptions: {
            initialRouteName: Chat,
            resetOnBlur: true,
        }
    }
);

const AuthStack = createStackNavigator(
    {
        Login: {
            screen: Login,
            navigationOptions: { gesturesEnabled: false}
        }
    },
    {
        defaultNavigationOptions: {
            resetOnBlur: true,
            header: null
        }
    }
)

const AppContainer = createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoading,
        Auth: AuthStack,
        App: AppStack,
    },
    {
        initialRouteName: 'AuthLoading',
        resetOnBlur: true,
    }
));

export default createAppContainer(AppContainer);