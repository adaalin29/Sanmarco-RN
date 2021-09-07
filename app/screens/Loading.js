import React, { Component } from 'react';
import { View } from 'react-native';
import * as Progress from 'react-native-progress';
// Imagini
import Logo from '../images/logo.svg';


export default class Loading extends Component {
    render() {
        return (
            <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
                <Logo width={'50%'} height={'50%'} />
                <Progress.Circle
                    useNativeDriver={true}
                    size={50}
                    indeterminate={true}
                    color={'#fff'}
                />
            </View>
        )
    }
}