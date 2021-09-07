import React, { Component } from 'react';
import { Text, TouchableOpacity, Modal, View, ScrollView, Image } from 'react-native';

import styles from '../../css/commons';

import Xsvg from '../../images/x.svg';
import AddCartButton from '../../components/AddCartButton';
export default class SuperOferta extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
        }
    }

    toggleModal() {
        const show = this.state.showModal;
        this.setState({ showModal: !show });
    }

    render() {
        return (
            <Modal
                animationType={"slide"}
                visible={this.state.showModal}
                onRequestClose={() => this.toggleModal()}>

                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={[styles.container, { padding: 0, borderRadius: 5 }]}>
                        <TouchableOpacity activeOpacity={1} style={{ position: 'absolute', zIndex: 2, top: '3%', right: '3%' }}
                            onPress={() => this.toggleModal()}>
                            <Xsvg style={styles.xModal} width={22} height={22}></Xsvg>
                        </TouchableOpacity>

                        <View style={{ height: '50%', alignSelf: 'center' }}>
                            <Image source={require('../../images/superOferta.png')} style={{ flex: 1, resizeMode: 'cover' }} />
                        </View>

                        <Text style={[styles.termsTitle, { marginTop: '10%' }]}>Super oferta</Text>
                        <Text style={[styles.ofertaDescriere, { width: '85%', marginBottom: 0 }]}>Doar in perioada 1 Iulie - 15 Iulie toate produsele noastre sunt la 10% reducere.</Text>
                        <Text style={styles.ofertaDescriere}>Profita acum de oferta!</Text>

                        <AddCartButton text={'adauga in cos'} />
                    </View>
                </ScrollView>
            </Modal>
        )
    }
}