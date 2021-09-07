import React, { Component } from 'react';
import { Text, TouchableOpacity, Modal, View, ScrollView, TextInput } from 'react-native';

import styles from '../../css/commons';

import LoginButton from '../../components/LoginButton';
import {showMessage} from 'react-native-flash-message';
import api from '../../api';
import Xsvg from '../../images/x.svg';

export default class ModalRecuperareParola extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            email: '',
        }
    }

    toggleModal() {
        const show = this.state.showModal;
        this.setState({ showModal: !show });
    }
    trimite_parola(){
        const show = this.state.showModal;
        api.post('/reseteazaParola', {email: this.state.email})
        .then(res => {
            if(!res.data.success){
                console.log("eroare", res.data)
                if(res.data.error_all){
                    showMessage({type: 'danger', message: "Campurile parola noua si parola veche sunt obligatorii"})
                }
                else
                    showMessage({type: 'danger', message: res.data.msg})
            }
            else{
                console.log(res.data)
                this.setState({email: '', showModal: !show})
                showMessage({type: 'success', message: res.data.msg})
            }
            
        })
    }
    render() {
        return (
            <Modal
                animationType={"slide"}
                visible={this.state.showModal}
                onRequestClose={() => this.toggleModal()}>

                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', backgroundColor: '#000', paddingHorizontal: 10 }}>
                    <TouchableOpacity activeOpacity = {1} 
                        style={{marginTop: 30}}
                        onPress={() => this.toggleModal()}>
                        <Xsvg style={styles.xModal} width={22} height={22}></Xsvg>
                    </TouchableOpacity>

                    <View style={styles.center}>
                        <Text style={[styles.loginTitle, { marginTop: 0 }]}>RECUPERARE PAROLA</Text>

                        <Text style={[styles.cosItemTitle, { marginBottom: 30, textAlign: 'center', width: '70%' }]}>Nici o problema, o sa-ti trimitem un link pe email pentru a modifica parola.</Text>

                        <View style={{ alignSelf: 'flex-start', width: '100%', backgroundColor: '#232323', borderRadius: 10, marginBottom: 35 }}>
                            <TextInput
                                style={{ paddingLeft: 15, color: '#fff', height: 50 }}
                                placeholder={'Email'} placeholderTextColor={'#fff'}
                                onChangeText={text => this.setState({ email: text })}
                                Value={this.state.email}>
                            </TextInput>
                        </View>


                        <LoginButton
                            onPress={() => this.trimite_parola()}
                            style={{ marginTop: 20, marginBottom: 15 }}
                            sageata={80} width="100%" text={'trimite parola'}
                            styleText={styles.centerTrimiteParola}>
                        </LoginButton>
                    </View>
                </ScrollView>
            </Modal >
        )
    }
}