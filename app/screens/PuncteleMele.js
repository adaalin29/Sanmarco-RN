import React, { Component, createRef } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Switch } from 'react-native';

import styles from '../css/commons';
import api from '../api';
import Puncte from '../images/punctleMele.svg';

export default class PuncteleMele extends Component {
    constructor(props) {
        super(props);
        this.state = {
            puncte: 0,
        }
    }
    componentDidMount(){
        api.get('/getContPuncte', {id: api.oauth.getAuth().user.id})
        .then(res => {
            if(!res.data.success)
                console.log("eroare", res.data)
            else{
                console.log("response", res.data.puncte)
                this.setState({puncte: res.data.puncte})
            }
        })
    }
    render() {
        return (
            <View style={[styles.container, { paddingBottom: 70 }]}>
                <ScrollView contentContainerStyle={{}}>

                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <Puncte />
                        <Text style={{ position: 'absolute', fontSize: 33, fontFamily: 'Heebo-Regular', top: 50, color: '#ffd101' }}>{this.state.puncte} lei</Text>
                    </View>

                    <Text style={[styles.contactInformatiiText, { marginTop: 20 }]}>Foloseste punctele acumulate pentru a comanda la un pret redus.</Text>

                    <Text style={styles.textPuncteleMele}>Reguli de utilizare:</Text>

                    <Text style={[styles.reguli, { marginBottom: 10 }]}>
                        Pentru fiecare 30 de lei consumati prin contul tau, in urma comenzilor date din aplicatia mobila sau de pe site-ul Speed Pizza, primesti cate 1 punct de fidelitate.
                        </Text>

                    <Text style={[styles.reguli, { marginBottom: 10 }]}>
                        1 punct de fidelitate = 1 leu reducere la comenzile date prin aplicatia sau site-ul Pizza San Marco, comenzi exclusive cu livrare la domiciliu sau birou.
                        Poti folosi cate puncte doresti din cele pe care le-ai acumulat in urma comenzilor date, cu conditia ca in cos sa ramana tot timpul, valoarea comenzii minime de 30 lei.
                    </Text>

                    <Text style={[styles.reguli, {paddingBottom: 50}]}>
                        Valabilitatea punctelor de fidelitate, este de 12 luni de la dobandire.
                    </Text>
                </ScrollView>
            </View>
        )
    }
}