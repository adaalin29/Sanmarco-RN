import React, { Component, createRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from '../css/commons';

import BuyFinger from "../images/buyFinger.svg";

export default class LoginButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <TouchableOpacity activeOpacity = {1}  style={[styles.adaugaCos, { width: this.props.width, marginBottom: 15 }, this.props.style]} onPress={() => this.props.onPress()}>
                    <View style={[styles.adaugaCosLeft, { flex: 1 }]}>
                        <Text style={[styles.adaugaCosText, {marginLeft: '25%'}]}>{this.props.text}</Text>
                    </View>

                    <BuyFinger width={75} height={75} fill={'black'}></BuyFinger>
                </TouchableOpacity>
            </>
        )
    }
}

