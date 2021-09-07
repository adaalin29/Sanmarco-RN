import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from '../css/commons';
import BuyFinger from "../images/buyFinger.svg";

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

export const SendButton = (props) => {
    return (
        <TouchableOpacity activeOpacity = {1}  style={[styles.adaugaCos, { width: props.width }, props.style]}>
            <View style={[styles.adaugaCosLeft, { width: '80%' }]}>
                <Text style={styles.adaugaCosText}>{props.text}</Text>
            </View>

            <BuyFinger width={75} height={75} fill={'black'}></BuyFinger>
        </TouchableOpacity>
    )
}