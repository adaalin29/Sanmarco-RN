import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import emitter from 'tiny-emitter/instance';

// Imagini
import Oferte from '../../images/footerOferte.svg';
import Categorii from '../../images/footerCategorii.svg';
import Profil from '../../images/footerProfil.svg';
// Style
import styles from '../../css/commons';
import api from '../../api'
import Menu from '../../screens/Menu';

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
        }
    }
    toggleMenu = () => {
        this.setState({ showMenu: !this.state.showMenu })
    }
    render() {
        return (
            <>
                <View style={styles.footerContainer}>
                    <TouchableOpacity activeOpacity={1}
                        onPress={() => this.props.navigation.navigate('Oferte')}
                        style={styles.footerButton}>

                        <Oferte width={20} height={28}></Oferte>
                        <Text style={styles.footerText}>Oferte</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1}
                        onPress={() => this.toggleMenu()}
                        style={styles.footerButton}>
                        <Categorii width={28} height={28}></Categorii>
                        <Text style={styles.footerText}>Categorii</Text>
                    </TouchableOpacity>
                    {this.state.showMenu &&
                        <Menu
                            toggleMenu={this.toggleMenu}
                            navigation={this.props.navigation}
                            selectedCategory={this.state.selectedCategory}
                            changeCategory={(category) => this.setState({ selectedCategory: category }, () => alert('cat: ' + category))}>
                        </Menu>
                    }

                    <TouchableOpacity activeOpacity={1}
                        onPress={() => { api.oauth.getAuth().user ? this.props.navigation.navigate('TabNavigator') : this.props.navigation.navigate('Login') }}
                        style={styles.footerButton}>
                        <Profil width={28} height={28}></Profil>
                        <Text style={styles.footerText}>Profil</Text>
                    </TouchableOpacity>
                </View>
            </>
        )
    }
}
