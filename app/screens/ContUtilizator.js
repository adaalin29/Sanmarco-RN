import React, { Component, createRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Switch } from 'react-native';
import styles from '../css/commons';

import * as Animatable from 'react-native-animatable';

import { MainButton } from '../components/MainButton';
import { showMessage } from 'react-native-flash-message';
import Lacat from '../images/lacat.svg';
import Close from '../images/close.svg';
import api from '../api';

export default class ContUtilizator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numarProduse: 2,

            inputNume: '',
            inputPrenume: '',
            inputEmail: '',
            inputTelefon: '',
            inputParola: '',
            oldPwd: '',
            pwd: '',
            terms: false,
            warningTelefon: null,
        }
        this.refInputTelefon = React.createRef();
    }
    componentDidMount() {
        api.oauth.getAuth().user &&
        api.get('/getUser', { userid: api.oauth.getAuth().user.id })
            .then(res => {
                if (!res.data.success) {
                    console.log("eroare", res.data)
                    showMessage({ type: 'danger', message: res.data.msg })
                }
                else {
                    console.log(res.data)
                    this.setState({ inputEmail: res.data.user.email, inputNume: res.data.user.nume, inputPrenume: res.data.user.prenume, inputTelefon: res.data.user.telefon })
                    console.log(this.state.inputEmail)
                }

            })
    }
    modifica_datele() {
        api.post('/modificaDatele', { nume: this.state.inputNume, prenume: this.state.inputPrenume, telefon: this.state.inputTelefon, userid: api.oauth.getAuth().user.id })
            .then(res => {
                if (!res.data.success) {
                    console.log("eroare", res.data)
                    showMessage({ type: 'danger', message: res.data.msg })
                }
                else {
                    console.log(res.data)
                    showMessage({ type: 'success', message: res.data.msg })
                }

            })
    }
    modifica_parola() {
        api.post('/modificaParola', { oldPwd: this.state.oldPwd, pwd: this.state.pwd, userid: api.oauth.getAuth().user.id })
            .then(res => {
                if (!res.data.success) {
                    console.log("eroare", res.data)
                    if (res.data.error_all) {
                        showMessage({ type: 'danger', message: "Campurile parola noua si parola veche sunt obligatorii" })
                    }
                    else
                        showMessage({ type: 'danger', message: res.data.msg })
                }
                else {
                    console.log(res.data)
                    this.setState({ oldPwd: '', pwd: '' })
                    showMessage({ type: 'success', message: res.data.msg })
                }

            })
    }
    showWarningPhoneNumber(param) {
        if (param.warningTelefon == null) return null;

        return (
            <Animatable.View useNativeDriver={true} animation={param.warningTelefon ? 'bounceInLeft' : 'bounceOutRight'} style={[styles.warningMessage, { marginBottom: 10 }]}>
                <View style={[styles.warningMessage, { padding: 20 }]}>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.hideWarningPhoneNumber()}>
                        <Close fill={'white'} width={16} height={16}></Close>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 13, fontFamily: 'Heebo-Regular', marginLeft: 30, color: "white" }}>!!! Atentie, acceptam doar numere din Romania</Text>
                </View>
            </Animatable.View>
        );
    }

    hideWarningPhoneNumber() {
        this.setState({
            warningTelefon: false,
        });
        setTimeout(() => {
            this.setState({
                warningTelefon: null,
            });
        }, 500)
    }

    checkPhoneNumber() {
        if (this.state.inputTelefon.toString().substring(0, 2) != "07" || this.state.inputTelefon.toString().length < 10) {
            this.setState({ warningTelefon: true })
            this.refInputTelefon.current.focus();
        }
        else {
            this.setState({ warningTelefon: null });
        }
    }

    render() {
        return (
            <View style={[styles.container, { paddingBottom: 70 }]}>
                <ScrollView keyboardShouldPersistTaps="handled">
                    <Text style={styles.dateCont}>Mai jos ai datele contului tau.</Text>

                    <View style={styles.containerInput}>
                        <TextInput
                            style={{ paddingLeft: 25, color: '#fff', height: 50 }}
                            value={this.state.inputNume}
                            placeholder={'Nume'}
                            placeholderTextColor={'#fff'}
                            placeholder={"Nume"}
                            onChangeText={(text) => this.setState({ inputNume: text })}>
                        </TextInput>
                    </View>

                    <View style={styles.containerInput}>
                        <TextInput
                            style={{ paddingLeft: 25, color: '#fff', height: 50 }}
                            value={this.state.inputPrenume}
                            placeholder={'Prenume'}
                            placeholderTextColor={'#fff'}
                            placeholder={"Prenume"}
                            onChangeText={text => this.setState({ inputPrenume: text })}>
                        </TextInput>
                    </View>

                    <View style={styles.containerInput}>
                        <TextInput
                            style={{ paddingLeft: 25, color: '#fff', height: 50 }}
                            editable={false}
                            value={this.state.inputEmail}
                            placeholder={'Email'}
                            placeholderTextColor={'#fff'}
                            onChangeText={text => this.setState({ inputEmail: text })}>
                        </TextInput>
                    </View>

                    <View style={styles.containerInput}>
                        <TextInput
                            ref={this.refInputTelefon}
                            style={{ paddingLeft: 25, color: '#fff', height: 50 }}
                            value={this.state.inputTelefon}
                            placeholder={'Telefon'}
                            placeholderTextColor={'#fff'}
                            keyboardType={"number-pad"}
                            maxLength={10}
                            onChangeText={text => this.setState({ inputTelefon: text })}
                            onEndEditing={() => this.checkPhoneNumber()}>
                        </TextInput>
                    </View>
                    <MainButton onPress={() => this.modifica_datele()} text={'Salveaza datele'} />

                    <View style={styles.containerInput}>
                        <TextInput
                            style={{ paddingLeft: 25, color: '#fff', height: 50 }}
                            placeholder={'Parola veche'}
                            placeholderTextColor={'#fff'}
                            onChangeText={text => this.setState({ oldPwd: text })}
                            value={this.state.oldPwd}
                            secureTextEntry={true}>
                        </TextInput>
                    </View>
                    <View style={styles.containerInput}>
                        <TextInput
                            style={{ paddingLeft: 25, color: '#fff', height: 50 }}
                            placeholder={'Parola noua'}
                            placeholderTextColor={'#fff'}
                            onChangeText={text => this.setState({ pwd: text })}
                            value={this.state.pwd}
                            secureTextEntry={true}>
                        </TextInput>
                    </View>

                    <TouchableOpacity
                        onPress={() => this.modifica_parola()}
                        activeOpacity={1} style={{ marginTop: 20, marginBottom: 30, flexDirection: 'row', backgroundColor: '#999999', borderRadius: 10, width: '100%', height: 50, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Heebo-Medium', color: '#fff', marginRight: 10 }}>MODIFICA PAROLA</Text>
                        <Lacat />
                    </TouchableOpacity>

                    {/* <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <Switch
                            trackColor={{ false: "#000", true: "#000" }}
                            thumbColor={this.state.terms ? "#ffd101" : "#fff"}
                            ios_backgroundColor="#DB6B5A"
                            onValueChange={value => this.setState({ terms: value })}
                            value={this.state.terms}
                        />
                        <View style={[styles.termsTextContainer]}>
                            <Text style={{ fontSize: 16, fontFamily: 'Heebo-Regular', color: '#fff' }}>Da, sunt de acord cu </Text>
                            <TouchableOpacity activeOpacity = {1} 
                                style={{ width: '90%' }}>
                                <Text style={{ fontSize: 16, fontFamily: 'Heebo-Regular', color: '#fff' }}>Politica de confidentialitate.</Text>
                            </TouchableOpacity>
                        </View>
                    </View> */}

                    
                </ScrollView>
            </View>
        )
    }
}
