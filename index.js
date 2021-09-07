/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import {name as appName} from './app.json';
import React from 'react'
import Navigation from './app/config/Navigation';
import AppNav from './app/config/routes';
import FlashMessage from 'react-native-flash-message';
import cart from './app/cart'
import ModalMagazinInchis from './app/screens/Modals/ModalMagazinInchis';
import emitter from 'tiny-emitter/instance';
LogBox.ignoreAllLogs();
class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
    }
    render(){
        return(
            <>
            <Navigation />
            <FlashMessage position="top" />
            </>
        )
    }
}
AppRegistry.registerComponent(appName, () => App);
