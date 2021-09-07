import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import styles from '../../css/commons';

import { SendButton } from '../../components/SendButton';

import Xsvg from '../../images/x.svg';
import PizzaComanda from '../../images/pizzaComanda.svg';
import SalataComanda from '../../images/salateComanda.svg';
import Cola from '../../images/cola.svg';

export default class ModalComanda extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            numarProduse: 3,
            pret: 72,
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
                    <View style={[styles.container, { borderRadius: 5 }]}>
                        <TouchableOpacity activeOpacity={1}
                            onPress={() => this.toggleModal()}>
                            <Xsvg style={styles.xModal} width={22} height={22}></Xsvg>
                        </TouchableOpacity>

                        <View style={styles.center}>
                            <Text style={[styles.oferteTitle, { marginTop: '5%' }]}>comanda: 001</Text>
                            <Text style={styles.mesajModal}>22.06.2020</Text>

                            <View style={styles.produsPreviewComanda}>
                                <PizzaComanda width={105} height={65} />

                                <View style={{ flexDirection: 'column', width: '80%', marginLeft: '10%' }}>
                                    <Text style={styles.produsComanda}>Pizza San Marco</Text>
                                    <Text style={styles.descriereProdusComanda}>L (30 cm); Sos: Dulce;</Text>
                                    <Text style={styles.descriereProdusComanda}>Topping: Mozzarella (3 lei), Ciperci (2.5 lei)</Text>
                                    <Text style={[styles.cantitateComanda]}>x1 32,00 lei</Text>
                                </View>
                            </View>

                            <View style={styles.produsPreviewComanda}>
                                <SalataComanda width={110} height={110} />

                                <View style={{ flexDirection: 'column', width: '80%', marginLeft: '10%' }}>
                                    <Text style={styles.produsComanda}>Salata San Marco</Text>
                                    <Text style={styles.descriereProdusComanda}>Dressing: Caesar</Text>
                                    <Text style={styles.cantitateComanda}>x1 23,00 lei</Text>
                                </View>
                            </View>

                            <View style={[styles.produsPreviewComanda, { borderBottomWidth: 0, marginBottom: 0 }]}>
                                <Cola width={118} height={66} />

                                <View style={{ flexDirection: 'column', width: '80%', marginLeft: '10%' }}>
                                    <Text style={styles.produsComanda}>Coca-Cola Zero</Text>
                                    <Text style={styles.descriereProdusComanda}>Dressing: Caesar</Text>
                                    <Text style={styles.cantitateComanda}>x2 12,00 lei</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.containerDetaliiComanda, { paddingBottom: 0 }]}>
                        <View style={{ width: '90%', alignSelf: 'center' }}>
                            <View style={[styles.deliveryInfo, { paddingTop: 30, opacity: 1 }]}>
                                <Text style={[styles.deliveryInfo, { opacity: 1 }]}>Transport:</Text>
                                <Text style={[styles.deliveryInfo, { opacity: 1 }]}>5.00 lei</Text>
                            </View>

                            <View style={[styles.deliveryInfo, { paddingBottom: 5, paddingTop: 5, opacity: 1 }]}>
                                <Text style={[styles.deliveryInfo, { opacity: 1 }]}>Sub-total:</Text>
                                <Text style={[styles.deliveryInfo, { opacity: 1 }]}>65.00 lei</Text>
                            </View>

                            <View style={[styles.deliveryInfo, { paddingBottom: 30, opacity: 1 }]}>
                                <Text style={[styles.deliveryInfo, , { opacity: 1 }]}>Discount puncte:</Text>
                                <Text style={[styles.deliveryInfo, { opacity: 1 }]}>0.00 lei</Text>
                            </View>

                            <View style={[styles.deliveryInfo, { paddingBottom: 5, paddingTop: 20, alignItems: "center", opacity: 1 }]}>
                                <Text style={styles.totalModalComanda}>Total: {this.state.numarProduse} produse</Text>
                                <Text style={styles.totalModalComanda}>{this.state.pret} <Text style={styles.cosTotalLei}>lei</Text></Text>
                            </View>

                            <Text style={styles.puncteModalComanda}>Puncte acumulate: 2</Text>

                            <SendButton onPress={() => this.setState({ comandaFinalizata: true })} sageata={75} culoare={'galben'} text={'repeta comanda'} />
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        )
    }
}