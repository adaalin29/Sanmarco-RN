import React, { Component } from 'react';
import { Text, TouchableOpacity, Modal, View, ScrollView } from 'react-native';

import styles from '../../css/commons';
import cart from '../../cart'
import Xsvg from '../../images/x.svg';
import Zzz from '../../images/zzz.svg';


export default class ModalMagazinInchis extends Component {
    constructor(props) {
        super(props);
    }
    

    render() {
        return (
            <Modal
                animationType={"slide"}
                visible={false}
                onRequestClose={() => {}}>

                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <View style={[styles.container]}>
                        <TouchableOpacity activeOpacity = {1} 
                            onPress={() => {}}>
                            <Xsvg style={styles.xModal} width={22} height={22}></Xsvg>
                        </TouchableOpacity>

                        <View style={styles.center}>
                            <Zzz width={214} height={258} />

                            <Text style={[styles.oferteTitle, { width: '80%', textAlign: 'center', marginTop: '10%', marginBottom: '5%' }]}>magazinul este inchis</Text>

                            <Text style={[styles.mesajModal, { width: '85%' }]}>Te asteptam intre 10:00 si 22:00, de Luni pana Duminica pentru comenzi online sau la telefon.</Text>
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        )
    }
}