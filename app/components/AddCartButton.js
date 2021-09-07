import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../css/commons';

import AddCart from '../images/addCart.svg';

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

export default class AddCartButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity activeOpacity = {1}  style={[styles.adaugaCos, { width: this.props.width, margin: 0, padding: 0 }, this.props.style]} onPress={() => props.onPress()}>
                <View style={[styles.adaugaCosLeft, { width: '80%' }]}>
                    <Text style={styles.adaugaCosText}>{this.props.text}</Text>
                </View>

                <AddCart width={65} height={75} fill={'black'}></AddCart>
            </TouchableOpacity>
        )
    }
}