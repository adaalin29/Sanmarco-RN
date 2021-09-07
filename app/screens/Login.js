import React, { Component, createRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Alert, ToastAndroid } from 'react-native';
import LoginButton from '../components/LoginButton';
import LoginApple from '../components/LoginApple';
import LoginFacebook from '../components/LoginFacebook';

import emitter from 'tiny-emitter/instance'
import { showMessage } from 'react-native-flash-message';
import api from '../api';
import ModalRecuperareParola from '../screens/Modals/ModalRecuperareParola';

import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from '../css/commons';

import Password from '../images/password.svg';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            secureTextEntry: true,
        }
        this.refModalParola = createRef();
    }
    login() {
        api.post('/user/login', {
            email: this.state.email,
            password: this.state.password,
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
                    routes: [{ name: 'ListarePizza' }],
                });
            } else {
                showMessage({type: 'danger', message: respone.data.msg});
            }
        }).catch(response => {
            showMessage({ type: 'danger', message: 'Unknown error. Please try again later.' });
        });
    }

    render() {
        return (
            <ScrollView keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', backgroundColor: '#000', paddingHorizontal: 10 }}>

                <ModalRecuperareParola ref={this.refModalParola} />

                <TouchableOpacity
                    onPress={() => { this.props.navigation.goBack() }}
                    style={{ position: 'absolute', top: 30, left: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name={'chevron-back'} size={25} color={'#ffd101'} />
                    <Text style={{ fontSize: 16, fontFamily: 'Heebo-Regular', color: '#ffd101', left: 3 }}>Inapoi</Text>
                </TouchableOpacity>

                <Text style={styles.loginTitle}>LOGIN</Text>

                <Text style={[styles.cosItemTitle, { alignSelf: 'center', marginBottom: 20 }]}>Conecteaza-te la contul creat deja.</Text>

                <View style={{ backgroundColor: '#232323', borderRadius: 10, marginBottom: 10 }}>
                    <TextInput
                        style={{ paddingLeft: 15, color: '#fff', height: 50 }}
                        placeholder={'Email'}
                        placeholderTextColor={'#fff'}
                        value={this.state.email}
                        onChangeText={text => this.setState({ email: text })}>
                    </TextInput>
                </View>

                <View style={{ backgroundColor: '#232323', borderRadius: 10, marginBottom: 10 }}>
                    <TextInput
                        style={{ paddingLeft: 15, color: '#fff', height: 50 }}
                        placeholder={'Parola'} placeholderTextColor={'#fff'}
                        onChangeText={text => this.setState({ password: text })}
                        value={this.state.password}
                        secureTextEntry={this.state.secureTextEntry}>
                    </TextInput>
                    <TouchableOpacity
                        hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
                        onPress={() => this.setState({ secureTextEntry: !this.state.secureTextEntry })}
                        style={styles.password}>
                        <Password width={27} height={17} />
                    </TouchableOpacity>
                </View>

                <LoginButton onPress={() => this.login()} text={'Login'}></LoginButton>

                {/* <LoginApple />

                <LoginFacebook /> */}

                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 50 }}>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.refModalParola.current.toggleModal()}>
                        <Text style={{ fontSize: 16, fontFamily: 'Heebo-Bold', color: '#ffd101' }}>Ai uitat parola? Click aici</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView >
        )
    }
}