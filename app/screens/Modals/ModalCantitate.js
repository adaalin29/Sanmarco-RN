import React, { createRef } from 'react';
import { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import styles from '../../css/commons';

import Xsvg from '../../images/x.svg';

export default class ModalCantitate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            cantitate: 1,
            sosSelectat: {},
        }
        this.refSos = createRef()
    }


    showModal(sos) {
        const show = this.state.showModal;
        this.setState({ showModal: !show, sosSelectat: sos });
    }
    closeModal() {
        const show = this.state.showModal;
        this.setState({ showModal: !show, cantitate: 1 });
    }

    cresteCantitate() {
        this.setState({ cantitate: (this.state.cantitate + 1) })
    }
    confirma() {
        const show = this.state.showModal;
        this.state.sosSelectat.cantitate = this.state.cantitate
        console.log("sos confirmat", this.state.sosSelectat);
        this.setState({ showModal: !show, cantitate: 1 });
    }
    scadeCantitate() {

        if (this.state.cantitate > 1)
            this.setState({ cantitate: (this.state.cantitate - 1) })
    }

    render() {
        return (
            <Modal
                animationType="slide"
                visible={this.state.showModal}
                transparent={true}
                onRequestClose={() => { this.closeModal() }}>

                <View style={[styles.center]}>
                    <View style={[styles.containerModal, { paddingHorizontal: 20, borderRadius: 5 }]}>
                        <TouchableOpacity
                            style={{ position: 'absolute', top: 15, right: 15 }}
                            activeOpacity={1}
                            onPress={() => this.closeModal()}>
                            <Xsvg style={styles.xModal}></Xsvg>
                        </TouchableOpacity>

                        <Text style={[styles.termsTitle, { marginTop: '22%', marginBottom: '10%' }]}>
                            Alege cantitatea
                            </Text>

                        <View style={ { width: '100%', alignSelf: 'center', marginBottom: '10%', backgroundColor: 'black',
   
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,}}>
                            <TouchableOpacity activeOpacity={1} onPress={() => this.scadeCantitate()} style={styles.countButton}>
                                <Text style={styles.countText}>-</Text>
                            </TouchableOpacity>

                            <Text style={styles.countText}>{this.state.cantitate}</Text>

                            <TouchableOpacity activeOpacity={1} onPress={() => this.cresteCantitate()} style={styles.countButton}>
                                <Text style={styles.countText}>+</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity activeOpacity={1} style={styles.btnModal}
                                onPress={() => { [this.closeModal(), this.props.onClickCancel()] }}>
                                <Text style={styles.adaugaCosText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={1} style={[styles.btnModal, { backgroundColor: '#ffd101' }]}
                                onPress={() => { this.confirma(); this.props.onClickYes(this.state.sosSelectat) }}>
                                <Text style={[styles.adaugaCosText]}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}