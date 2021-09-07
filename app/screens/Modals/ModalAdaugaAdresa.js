import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView, ScrollView, Keyboard, Platform } from 'react-native';

import { MainButton } from '../../components/MainButton';
import DropDownPicker from 'react-native-dropdown-picker';
import { showMessage } from 'react-native-flash-message';
import emitter from 'tiny-emitter/instance'
import api from '../../api';
import styles from '../../css/commons';
import Xsvg from '../../images/x.svg';
import ArrowPicker from '../../images/arrowPicker.svg';

export default class AdaugaAdresa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            inputAdresa: '',
            judetSelectat: '0',
            orasSelectat: '0',
            termsAccepted: true,
            reper: '',
            detalii: '',
            numar_strada: '',
            strada: '',
            strazi: this.props.strazi,
        }
    }
    adauga_adresa() {
        api.post('/adaugaAdresa', { strada: this.state.strada, numar_strada: this.state.numar_strada, detalii: this.state.detalii, reper: this.state.reper, userid: api.oauth.getAuth().user.id })
            .then(res => {
                if (!res.data.success) {
                    console.log("eroare", res.data)
                    showMessage({ type: 'danger', message: res.data.msg })
                }
                else {
                    console.log(res.data)
                    this.toggleModal()
                    emitter.emit('editare-serge-adresa');
                }

            })
    }
    toggleModal() {
        const show = this.state.showModal;
        this.setState({ showModal: !show });
    }

    getAdresaAdaugata() {
        const { inputAdresa, judetSelectat, orasSelectat } = this.state;
        this.adresaAdaugata = {
            adresa: inputAdresa,
            judet: this.judete.filter(judet => judet.value == judetSelectat)[0].label,
            oras: this.orase.filter(oras => oras.value == orasSelectat)[0].label,
        };
        return this.adresaAdaugata;
    }

    render() {
        return (
            <Modal
                animationType="slide"
                visible={this.state.showModal}
                transparent={true}
                onRequestClose={() => this.toggleModal()}>

                <KeyboardAvoidingView
                    behavior={'height'}>
                    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ marginTop: '25%' }} centerContent={true}>
                        <View style={[styles.center]}>
                            <View style={[styles.containerModal, {height: 550} ]}>
                                <TouchableOpacity activeOpacity={1}
                                    onPress={() => this.toggleModal()}>
                                    <Xsvg style={styles.xModal}></Xsvg>
                                </TouchableOpacity>

                                <Text style={[styles.termsTitle, { paddingTop: 30, paddingBottom: 30 }]}>
                                    ADRESA NOUA
                            </Text>

                                <View style={{ flex: 1, alignItems: 'center',
                                 }}>
                                    {/* <TextInput
                                    style={[styles.textInput, { color: '#fff', paddingLeft: 17 }]}
                                    placeholderTextColor={'#fff'}
                                    placeholder={'Strada'}
                                    onChangeText={(text) => this.setState({ strada: text })}>
                                </TextInput> */}

                                        {/* <RNPickerSelect
                                            placeholder={{ label: "Cauta strada...", value: null }}
                                            value={this.state.strada}
                                            style={{ color: "white"}}
                                            textInputProps={{ color: "white", paddingVertical: 15 }}
                                            useNativeAndroidPickerStyle={false}
                                            onValueChange={value => this.setState({ strada: value })}
                                            items={this.state.strazi}
                                        /> */}
                                    <View style={{marginBottom: 10, ...(Platform.OS !== 'android' && {
                                        zIndex: 10
                                    })}}>
                                        <DropDownPicker
                                            placeholder={"Alege strada..."}
                                            searchableStyle={{color: "white", height: 50}}
                                            items={this.state.strazi}
                                            style={{color: "white", backgroundColor:"black", borderColor:"black", width: '87%'}}
                                            arrowColor={{color: "white"}}
                                            containerStyle={{ width: '100%', height: 50 }}
                                            globalTextStyle={{color: "white"}}
                                            dropDownMaxHeight={200}
                                            dropDownStyle={{backgroundColor: "black", borderColor: "grey", width: '87%'}}
                                            onChangeItem={item => {Keyboard.dismiss; console.log(item); this.setState({ strada: item.value })}}
                                            searchable
                                            searchablePlaceholder="Cauta strada..."
                                            searchablePlaceholderTextColor="white"
                                            searchableError={() => <Text>Not Found</Text>}
                                        />
                                    </View>

                                    <TextInput
                                        style={[styles.textInput, { color: '#fff', paddingLeft: 17 }]}
                                        placeholderTextColor={'#fff'}
                                        placeholder={'Numarul strazii'}
                                        onChangeText={(text) => this.setState({ numar_strada: text })}>
                                    </TextInput>

                                    <TextInput
                                        style={[styles.textInput, { color: '#fff', paddingLeft: 17 }]}
                                        placeholderTextColor={'#fff'}
                                        placeholder={'Detalii (Bloc, Scara, Etaj, Apatament)'}
                                        onChangeText={(text) => this.setState({ detalii: text })}>
                                    </TextInput>

                                    <TextInput
                                        style={[styles.textInput, { color: '#fff', paddingLeft: 17 }]}
                                        placeholderTextColor={'#fff'}
                                        placeholder={'Repere'}
                                        onChangeText={(text) => this.setState({ reper: text })}>
                                    </TextInput>


                                    {/* <View style={{ flexDirection: 'row', width: '90%', alignItems: 'center', marginTop: '3%', marginBottom: '3%' }}>
                                    <Switch
                                        trackColor={{ false: "black", true: "#FFD101" }}
                                        thumbColor={this.state.terms ? "#FFFFFF" : "#FFFFFF"}
                                        ios_backgroundColor="#DB6B5A"
                                        onValueChange={value => this.setState({ termsAccepted: value })}
                                        value={this.state.termsAccepted}
                                    />
                                    <View style={[styles.termsTextContainer, { flex: 1 }]}>
                                        <Text style={{ fontSize: 16, fontFamily: 'Heebo-Regular', color: '#fff' }}>Da, sunt de acord cu</Text>
                                        <TouchableOpacity activeOpacity = {1}  style={{ flexWrap: 'wrap' }}>
                                            <Text style={{ fontSize: 16, fontFamily: 'Heebo-Regular', color: '#fff' }}>Politica de confidentialitate.</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View> */}

                                    <View style={{ flex: 1, marginLeft: '5%', marginRight: '5%' }}>
                                        <MainButton style={{ alignSelf: 'center' }} width={'87%'} onPress={() => this.adauga_adresa()} text={'salveaza adresa'}></MainButton>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </Modal >
        )
    }
}