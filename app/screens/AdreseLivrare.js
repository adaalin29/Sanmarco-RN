import React, { Component, createRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Switch } from 'react-native';
import Swipeable from 'react-native-swipeable';

import styles from '../css/commons';

import RightArrow1 from '../images/rightArrow1.svg';
import ModalConfirmare from './Modals/ModalConfirmare';
import ModalAdaugaAdresa from './Modals/ModalAdaugaAdresa';
import emitter from 'tiny-emitter/instance'
import { MainButton } from '../components/MainButton';
import api from '../api';

export default class AdreseLivrare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editableAddressId: null,
            addressToDelete: null,
            loading: true,
            addressesDelivery: api.oauth.getAuth().user?.adrese,
            strazi: [],
        }
        this.refModalStergereAdresa = createRef();
        this.refModalAdaugaAdresa = createRef();
    }
    componentDidMount() {
        this.getAdrese()
        emitter.on('editare-serge-adresa', () => {
            this.getAdrese()
        });
        api.get('/getStreets')
            .then(res => {
                if (!res.data.success)
                    console.log("eroare", res.data)
                else {
                    console.log("getStreets", res.data)
                    res.data.adrese.streets.map((strada) => {
                        var item = {
                            label: strada.street,
                            value: strada.street
                        }
                        this.state.strazi.push(item)
                    })
                }

            })
    }
    componentWillUnmount() {
        emitter.off('editare-serge-adresa')
    }
    getAdrese() {
        api.oauth.getAuth().user &&
        api.get('/getContAdrese', { id: api.oauth.getAuth().user.id })
            .then(res => {
                if (!res.data.success)
                    console.log("eroare", res.data)
                else {
                    console.log("response", res.data.adrese)
                    this.setState({ loading: false, addressesDelivery: res.data.adrese })
                }
            })
    }
    deleteAddress(id) {
        api.oauth.getAuth().user &&
        api.post('/stergeAdresa', { userid: api.oauth.getAuth().user.id, id: id })
            .then(res => {
                if (!res.data.success)
                    console.log("eroare", res.data)
                else {
                    console.log("response", res.data)
                    this.getAdrese()
                }
            })

    }

    deleteDeliveryAddress() {
        if (this.state.addressToDelete != null) {
            const copieAdrese = this.state.addressesDelivery;
            copieAdrese.splice(copieAdrese.indexOf(this.state.addressToDelete), 1);
            this.setState({ addressesDelivery: copieAdrese });
        }

        if (this.state.addressesDelivery.length) {
            const adresa = this.state.addressesDelivery[0].id;
        }
    }

    render() {
        return (
            <View style={[styles.container, { paddingBottom: 70 }]}>
                <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ backgroundColor: '#232323' }}>

                    <ModalAdaugaAdresa keyboardShouldPersistTaps="handled" strazi={this.state.strazi}
                        ref={this.refModalAdaugaAdresa}
                        onSaveAddress={() => {
                            const copie = this.state.addressesDelivery;
                            const adresa = this.refModalAdaugaAdresa.current.getAdresaAdaugata();
                            const ultimulId = this.state.addressesDelivery[copie.length - 1].id
                            copie.push({ id: ultimulId + 1, text: adresa.strada + ', ' + adresa.numar_strada + ', ' + adresa.detalii + ', ' + adresa.reper });
                            this.setState({ addressesDelivery: copie });
                        }}
                    />

                    <ModalConfirmare
                        ref={this.refModalStergereAdresa}
                        message={'Esti sigur ca vrei sa stergi adresa de livrare?'}
                        onClickYes={() => this.deleteDeliveryAddress()}
                    />

                    <Text style={[styles.reguli, { opacity: 1, marginTop: 20, marginBottom: 20 }]}>Alege sau adauga o adresa de livrare</Text>

                    {this.state.loading ? null : this.state.addressesDelivery.map(adresa =>
                        // <Swipeable
                        //     key={adresa.id}
                        //     style={{ width: "100%", height: 60 }}
                        //     rightButtons={[
                        //         <TouchableOpacity activeOpacity={1} style={[styles.leftSwipeItem, { marginLeft: 50 }]} onPress={() => this.deleteAddress(adresa.id)}>
                        //             <Text style={[styles.btnEdit]}>STERGE</Text>
                        //         </TouchableOpacity>,
                        //         <TouchableOpacity activeOpacity={1}
                        //             style={[styles.rightSwipeItem, { marginLeft: 20 }]}
                        //             onPress={() => this.deleteAddress(adresa.id)}>

                        //             {/* <Xsvg width={21} height={21}></Xsvg> */}
                        //         </TouchableOpacity>
                        //     ]}
                        //     rightButtonWidth={140}
                        //     children={(
                        <View style={{ width: '100%', height: 60, flexDirection: "row", alignItems: "center", backgroundColor: "black", justifyContent: 'center', alignContent: 'center', marginBottom: 10, borderRadius: 5 }}>
                            <TextInput
                                editable={this.state.editableAddressId == adresa.id}
                                value={adresa.strada + ', ' + adresa.numar_strada + ', ' + adresa.detalii + ', ' + adresa.reper}
                                style={{ color: "white", marginRight: 10, paddingLeft: 20, flex: 1 }}
                                multiline={true}
                                onChangeText={text => {
                                    const copie = this.state.addressesDelivery;
                                    copie[adresa.id].text = text;
                                    this.setState({ addressesDelivery: copie });
                                }}>
                            </TextInput>
                            {/* <View style={{ flex: 1, justifyContent: 'flex-end', marginRight: 15, width: 100 }}> */}
                                <TouchableOpacity
                                    activeOpacity={1}
                                    style={{ width: 100, flexShrink: 0, marginRight: 10 }}
                                    onPress={() => this.deleteAddress(adresa.id)}>
                                    <Text style={[styles.btnEdit, {overflow: 'hidden'}]}>STERGE</Text>
                                </TouchableOpacity>
                            {/* </View> */}
                        </View>
                        // )}>
                        // </Swipeable>
                    )}

                    <MainButton onPress={() => this.refModalAdaugaAdresa.current.toggleModal()} style={{ marginTop: 20 }} text={'adauga adresa'} />

                </ScrollView>
            </View >
        )
    }
}