import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import Loading from '../screens/Loading';
import Terms from '../screens/Terms';
import FirstTime from '../screens/FirstTime';
import Homepage from '../screens/Homepage';
import Oferte from '../screens/Oferte';
import CategorieDetaliu from '../screens/CategorieDetaliu';
import Menu from '../screens/Menu';
import Contact from '../screens/Contact';

import api from '../api';
// Detaliu

import DetaliuPizza from '../screens/Detaliu/DetaliuPizza';
import DetaliuSalata from '../screens/Detaliu/DetaliuSalata';
import DetaliuPaste from '../screens/Detaliu/DetaliuPaste';
import Login from '../screens/Login';


const Stack = createStackNavigator();

class AppNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: null,
        }
    }

    componentDidMount(){
        api.oauth.check().then(auth => {
            this.setState({logged: auth.logged});
            if (Sentry)
            if (auth.logged) {
                Sentry.setUser({
                    id:       auth.user.id,
                    username: auth.user.remoteId,
                    email:    auth.user.email,
                });
            } else {
                Sentry.configureScope(scope => scope.setUser(null));
            }
        })
        emitter.on('auth', () => {
            let auth = api.oauth.getAuth();
            this.setState({logged: auth.logged});
        });

    }


    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}>
                    <>
                    <Stack.Screen name="Homepage" component={Homepage} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="DetaliuPaste" component={DetaliuPaste} />
                    <Stack.Screen name="DetaliuSalata" component={DetaliuSalata} />
                    <Stack.Screen name="DetaliuPizza" component={DetaliuPizza} />
                    <Stack.Screen name="Oferte" component={Oferte} />
                    <Stack.Screen name="FirstTime" component={FirstTime} />
                    <Stack.Screen name="Contact" component={Contact} />
                    <Stack.Screen name="CategorieDetaliu" component={CategorieDetaliu} />
                    <Stack.Screen name="Menu" component={Menu} />
                    <Stack.Screen name="Terms" component={Terms} />
                    <Stack.Screen name="Loading" component={Loading} />
                    </>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default AppNav;
