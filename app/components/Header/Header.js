import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// Imagini
import Logo from '../../images/logo.svg';
import Cart from '../../images/cart.svg';
import Burger from '../../images/burger.svg';
import cart from '../../cart'
import emitter from 'tiny-emitter/instance';
import { showMessage } from 'react-native-flash-message';
// Style
import styles from '../../css/commons';

export default class Header extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        emitter.on('cart-update', () => {
            this.forceUpdate()
        })
    }
    render() {
        return (
            <View style={styles.headerContainerContent}>
                <TouchableOpacity activeOpacity={1}
                    onPress={() => { this.props.navigation.toggleDrawer() }}>
                    <Burger width={40} />
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('ListarePizza')}>
                    <Logo width={80} height={55}></Logo>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{flexDirection: 'row',alignItems: 'center', position: 'absolute', left: -60, paddingVertical: 3, paddingHorizontal: 10, backgroundColor: '#232323', borderRadius: 17, textAlign: 'center' }}>
                        <Text style={{color: '#ffd101', fontSize: 22, fontFamily: 'Mongoose-Regular'}}>
                        {cart.data.total}
                        </Text>
                        
                        
                            <Text style={{ fontSize: 15, fontFamily: 'Mongoose-Regular', color: '#ffd101' }}>   lei</Text>
                        
                    </View>
                    <TouchableOpacity activeOpacity={1}
                        onPress={() => this.props.navigation.navigate('Cos')}
                        style={styles.cartButton}>
                        <Cart width={39} height={33}></Cart>
                        <View style={styles.cartBula}>
                            <Text style={styles.bulaNumar}>{cart.data.totalProduse}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}