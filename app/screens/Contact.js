import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Switch, Image } from 'react-native';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import styles from '../css/commons';
import { ScrollView } from 'react-native-gesture-handler';
import settings from '../settings'
// Imagini
import Contact from "../images/cartImage.svg";
import TrimiteImage from "../images/trimiteImage.svg";
import Clock from "../images/clock.svg";
import Phone from "../images/phone.svg";
import Address from "../images/address.svg";
import BuyFinger from "../images/buyFinger.svg";
import api from '../api'
import { showMessage } from 'react-native-flash-message';

export default class Oferte extends Component {

    constructor(props) {
        super(props)
        this.state = {
            numarProduse: 4,
            name: null,
            email: null,
            message: null,
            terms: false,
        };
    }
    trimiteEmail(){
        if(this.state.terms){
            api.post('/trimiteEmail', {name: this.state.name, email: this.state.email,  message: this.state.message})
            .then(res => {
                if (!res.data.success){
                    showMessage({ type: 'danger', message: res.data.msg })
                    console.log(res.data)
                }
                else {
                    showMessage({ type: 'success', message: res.data.msg })
                    console.log(res.data)
                    this.setState({ name: null, email: null,  message: null, terms: false})
                }
            })
        }else{
            showMessage({ type: 'danger', message: "Trebuie sa accepti politica de confidentialitate" });
        }
    }
    render() {
        return (
            <View style={{ width: '100%', height: '100%', backgroundColor: 'black' }}>
                <Header navigation={this.props.navigation}></Header>

                <View style={[styles.container, { paddingBottom: 70 }]}>
                    <ScrollView style={styles.contentScrollView}>
                        <Text style={styles.contactTitle}>Contacteaza-ne!</Text>
                        <Text style={styles.contactText}>Ai intrebari? Lasa-ne un mesaj in acest formular!</Text>
                        <TextInput
                            placeholder="Nume"
                            placeholderTextColor={'white'}
                            style={styles.input}
                            onChangeText={(e) => this.setState({name: e})}
                            value={this.state.name}
                        />
                        <TextInput
                            placeholder="E-mail"
                            placeholderTextColor={'white'}
                            style={styles.input}
                            onChangeText={(e) => this.setState({email: e})}
                            value={this.state.email}
                        />
                        <TextInput
                            placeholder="Mesaj"
                            multiline={true}
                            placeholderTextColor={'white'}
                            style={[styles.input, { height: 170, textAlignVertical: 'top' }]}
                            onChangeText={(e) => this.setState({message: e})}
                            value={this.state.message}
                        />
                        <View style={styles.termsContainer}>
                            <Switch
                                trackColor={{ false: "black", true: "#FFD101" }}
                                thumbColor={this.state.terms ? "#FFFFFF" : "#FFFFFF"}
                                ios_backgroundColor="#DB6B5A"
                                onValueChange={value => this.setState({ terms: value })}
                                value={this.state.terms}
                            />
                            <View style={styles.termsTextContainer}>
                                <Text style={styles.termsText}>Da, sunt de acord cu</Text>
                                <TouchableOpacity activeOpacity = {1} ><Text style={styles.termeniButton}>Politica de confidentialitate.</Text></TouchableOpacity>
                            </View>
                        </View>
                        
                        <TouchableOpacity
                                    onPress={() => {this.trimiteEmail()} }
                                    activeOpacity={1} style={[styles.adaugaCos, { width: '100%' }]}>
                                    <View style={[styles.adaugaCosLeft, { width: '80%' }]}>
                                        <Text style={styles.adaugaCosText}>{'trimite'}</Text>
                                    </View>

                                    <BuyFinger width={75} height={75} fill={'black'}></BuyFinger>
                                </TouchableOpacity>
                        <View style={styles.contactInformatii}>
                            <View style={styles.contactInformatiiElement}>
                                <Clock style={{ marginLeft: 'auto', marginRight: 'auto' }} width={45} height={45}></Clock>
                                <Text style={styles.contactInformatiiText}>{settings.get('site.program')}</Text>
                            </View>
                            <View style={styles.contactInformatiiElement}>
                                <Phone style={{ marginLeft: 'auto', marginRight: 'auto' }} width={45} height={45}></Phone>
                                {/* <Text style={styles.contactInformatiiText}>0733 968 615</Text> */}
                                <Text style={styles.contactInformatiiText}>{settings.get('site.phone')}</Text>
                            </View>
                        </View>
                        <View style={[styles.contactInformatiiElement, { marginLeft: 'auto', marginRight: 'auto', width: '80%', marginTop: 20, marginBottom: 10, }]}>
                            <Address style={{ marginLeft: 'auto', marginRight: 'auto' }} width={45} height={45}></Address>
                            <Text style={styles.contactInformatiiText}>I. C. Bratianu 48, Constanta A. Lapusneanu 116 C, City Mall, et. 1</Text>
                        </View>
                    </ScrollView>
                </View>
                <Footer navigation={this.props.navigation} />
            </View>
        )
    }
}