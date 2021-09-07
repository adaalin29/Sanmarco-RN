import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default class LoginFacebook extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity activeOpacity = {1} 
                style={[{ flexDirection: 'row', width: '100%', height: 55, backgroundColor: '#00538A', borderRadius: 10, justifyContent: 'center' }]}
                onPress={() => this.props.onPress()}>
                <Text style={{ color: '#fff', fontSize: 20, fontFamily: 'Heebo-Medium', alignSelf: 'center' }}>FACEBOOK LOGIN</Text>
            </TouchableOpacity>
        )
    }
} 