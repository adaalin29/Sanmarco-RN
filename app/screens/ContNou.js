import React, { Component, createRef } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, ToastAndroid } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../css/commons';

import emitter from 'tiny-emitter/instance'
import { showMessage } from 'react-native-flash-message';
import api from '../api';
import { SendButton } from '../components/SendButton';
import LoginButton from '../components/LoginButton';
import LoginApple from '../components/LoginApple';
import LoginFacebook from '../components/LoginFacebook';
import ModalRecupareParola from '../screens/Modals/ModalRecuperareParola';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Password from '../images/password.svg';

export default class ContNou extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputTelefon: null,
            inputNume: null,
            inputPrenume: null,
            inputEmail: null,
            inputParola: null,
            terms: false,
            secureTextEntry: true,
        }
        this.refModalParola = createRef();
    }
    register() {
        api.post('/user/register', {
            email: this.state.inputEmail,
            nume: this.state.inputNume,
            prenume: this.state.inputPrenume,
            telefon: this.state.inputTelefon,
            parola: this.state.inputParola,
        }).then(response => {
            if (response.data.success) {
                api.oauth.updateAuth({
                    logged: true,
                    user: response.data.user,
                    token: api.oauth.processNewToken(response.data.token),
                });
                emitter.emit('auth');
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            } else {
                showMessage({ type: 'danger', message: response.data.error });
            }
        }).catch(response => {
            showMessage({ type: 'danger', message: 'Unknown error. Please try again later.' });
        });
    }
    render() {
        return (
            <ScrollView keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', backgroundColor: '#000', paddingHorizontal: 10 }}>

                <ModalRecupareParola ref={this.refModalParola} />

                <TouchableOpacity
                    onPress={() => { this.props.navigation.goBack() }}
                    style={{ position: 'absolute', top: 30, left: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name={'chevron-back'} size={25} color={'#ffd101'} />
                    <Text style={{ fontSize: 16, fontFamily: 'Heebo-Regular', color: '#ffd101', left: 3 }}>Inapoi</Text>
                </TouchableOpacity>

                <Text style={[styles.loginTitle, { marginBottom: 20 }]}>Cont nou</Text>

                <Text style={[styles.cosItemTitle, { textAlign: 'center', marginBottom: 20 }]}>Creeaza un cont nou pentru a face mai rapid o comanda.</Text>

                <View style={{ backgroundColor: '#232323', borderRadius: 10, marginBottom: 10 }}>
                    <TextInput
                        style={{ paddingLeft: 15, color: '#fff', height: 50 }}
                        placeholder={'Nume'}
                        placeholderTextColor={'#fff'}
                        onChangeText={text => this.setState({ inputNume: text })}>
                    </TextInput>
                </View>

                <View style={{ backgroundColor: '#232323', borderRadius: 10, marginBottom: 10 }}>
                    <TextInput
                        style={{ paddingLeft: 15, color: '#fff', height: 50  }}
                        placeholder={'Prenume'}
                        placeholderTextColor={'#fff'}
                        onChangeText={text => this.setState({ inputPrenume: text })}>
                    </TextInput>
                </View>

                <View style={{ backgroundColor: '#232323', borderRadius: 10, marginBottom: 10 }}>
                    <TextInput
                        style={{ paddingLeft: 15, color: '#fff', height: 50 }}
                        placeholder={'Telefon'}
                        placeholderTextColor={'#fff'}
                        onChangeText={text => this.setState({ inputTelefon: text })}>
                    </TextInput>
                </View>

                <View style={{ backgroundColor: '#232323', borderRadius: 10, marginBottom: 10 }}>
                    <TextInput
                        style={{ paddingLeft: 15, color: '#fff', height: 50 }}
                        placeholder={'E-mail'} placeholderTextColor={'#fff'}
                        onChangeText={text => this.setState({ inputEmail: text })}>
                    </TextInput>
                </View>

                <View style={{ backgroundColor: '#232323', borderRadius: 10, marginBottom: 10 }}>
                    <TextInput
                        style={{ paddingLeft: 15, color: '#fff', height: 50 }}
                        placeholder={'Parola'}
                        placeholderTextColor={'#fff'}
                        onChangeText={text => this.setState({ inputParola: text })}
                        secureTextEntry={this.state.secureTextEntry}>
                    </TextInput>
                    <TouchableOpacity
                        onPress={() => { this.setState({ secureTextEntry: !this.state.secureTextEntry }) }}
                        hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
                        style={{ position: 'absolute', right: '3%', top: '35%' }}>
                        <Password width={27} height={17} />
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                    <Switch
                        trackColor={{ false: "#232323", true: "#232323" }}
                        thumbColor={this.state.terms ? "#ffd101" : "#fff"}
                        ios_backgroundColor="#DB6B5A"
                        onValueChange={value => this.setState({ terms: value })}
                        value={this.state.terms}
                    />
                    <View style={[styles.termsTextContainer]}>
                        <Text style={{ fontSize: 16, fontFamily: 'Heebo-Regular', color: '#fff' }}>Da, sunt de acord cu </Text>
                        <TouchableOpacity activeOpacity={1}
                            style={{ width: '90%' }}>
                            <Text style={{ fontSize: 16, fontFamily: 'Heebo-Regular', color: '#fff' }}>Politica de confidentialitate.</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <LoginButton
                    onPress={() => this.register()}
                    style={{ marginTop: 20, marginBottom: 15 }}
                    sageata={80} width="100%" text={'creaza cont'}
                    styleText={styles.centerCreazaCont}>
                </LoginButton>

                {/* <LoginApple /> */}

                {/* <LoginFacebook /> */}

                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 50 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={{ fontSize: 16, fontFamily: 'Heebo-Bold', color: '#ffd101' }}>Ai deja cont? Click aici</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}