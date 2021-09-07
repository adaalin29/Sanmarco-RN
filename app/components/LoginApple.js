import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../css/commons';

import AppleLogo from '../images/apple.svg';

export default class LoginApple extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity activeOpacity = {1}  style={[{ flexDirection: 'row', width: '100%', height: 55, backgroundColor: '#fff', borderRadius: 10, justifyContent: 'center', marginBottom: 15 }]} onPress={() => this.props.onPress()}>
                <AppleLogo style={{alignSelf: 'center', marginRight: '3%'}} width={21} height={25} fill={'black'} />

                <Text style={{ color: '#000', fontSize: 20, fontFamily: 'Heebo-Medium', alignSelf: 'center' }}>Apple login</Text>
            </TouchableOpacity>
        )
    }
}