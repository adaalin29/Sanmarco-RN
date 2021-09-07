import React from 'react';
import { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import styles from '../../css/commons';
import Xsvg from '../../images/x.svg';


export default class ModalConfirmare extends Component {
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
                animationType="slide"
                visible={this.state.showModal}
                transparent={true}
                onRequestClose={() => this.toggleModal()}>

                <View style={[styles.center]}>
                    <View style={[styles.containerModal, { borderRadius: 5 }]}>
                        <TouchableOpacity activeOpacity={1}
                            onPress={() => this.toggleModal()}>
                            <Xsvg style={styles.xModal}></Xsvg>
                        </TouchableOpacity>

                        <Text style={[styles.termsTitle, { marginTop: '5%', marginBottom: '10%' }]}>
                            Confirma actiunea
                        </Text>

                        <Text style={styles.mesajModal}>
                            {this.props.message}
                        </Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <TouchableOpacity activeOpacity={1} style={styles.btnModal}
                                onPress={() => { this.toggleModal(); this.props.onClickYes() }}>
                                <Text style={styles.adaugaCosText}>Da</Text>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={1} style={styles.btnModal}
                                onPress={() => this.toggleModal()}>
                                <Text style={styles.adaugaCosText}>Nu</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}