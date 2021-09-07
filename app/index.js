import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Navigator from './config/routes';
import Menu from './screens/Menu';
import emitter from 'tiny-emitter/instance';
import FlashMessage from 'react-native-flash-message';
import cart from './cart'

LogBox.ignoreAllLogs();

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active_menu: false,
        }
    }
    componentDidMount() {
        emitter.on('open-menu', () => {
            this.setState({active_menu: true})
        })
        emitter.on('close-menu', () => {
            this.setState({active_menu: false})
        })
        // emitter.emit('open-menu', 'categorii');
        // emitter.emit('open-menu', 'profil');
        // emitter.emit('close-menu');
    }
    showMenu() {
        if (this.state.active_menu == 'categorii') return ( <Menu /> );
        if (this.state.active_menu == 'profil') return ( <Menu /> );
    }
    render() {
        <View style={{flex:1}}>
            {this.showMenu()}
            <Navigator />
        </View>
    }
}

export default Navigator;