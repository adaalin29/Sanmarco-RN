import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import RightArrow from "../images/rightArrow.svg";

import styles from '../css/commons';

import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

export const MainButton = (props) => {
    return (
        <TouchableOpacity activeOpacity = {1}  style={[styles.adaugaCos, { width: props.width, marginBottom: 25 }, props.style]} onPress={() => props.onPress()}>
            <View style={[styles.adaugaCosLeft, { flex: 1 }]}>
                <Text style={styles.adaugaCosText}>{props.text}</Text>
            </View>

            <RightArrow width={75} height={75} fill={'black'}></RightArrow>
        </TouchableOpacity>
    )
}