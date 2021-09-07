import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

import styles from '../css/commons';
import api from '../api';
import moment from 'moment';
export default class IstoricComenzi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comenzi: [],
        }
    }
    componentDidMount() {
        api.oauth.getAuth().user &&
        api.get('/getContComenzi', { id: api.oauth.getAuth().user.id })
            .then(res => {
                if (!res.data.success)
                    console.log("eroare", res.data)
                else {
                    console.log("comenzi", res.data)
                    this.setState({ comenzi: res.data.comenzi })
                }
            })
    }
    render() {
        return (
            <View style={[styles.container, { paddingBottom: 70 }]}>
                <ScrollView contentContainerStyle={{ backgroundColor: '#232323' }}>

                    <Text style={[styles.reguli, { opacity: 1, marginTop: 20, marginBottom: 20 }]}>Poti vedea comenzile si detaliile lor.</Text>
                    {this.state.loading ? null :
                        this.state.comenzi.map((comanda) => {
                            console.log('COMANDA: ', comanda)
                            if (!(comanda.api_id == 0 || comanda.status_plata == "procesare" || comanda.status_plata == "respins" || comanda.status_plata == "nevalid"))
                                return (
                                    <View style={{ backgroundColor: '#000', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, padding: 12, borderRadius: 5 }}>
                                        <View style={{ flexDirection: 'column' }}>
                                            {comanda.status_comanda == 0 ?
                                                <Inregistrata />
                                                :
                                                comanda.status_comanda == 1 ?
                                                    <Preluata />
                                                    :
                                                    comanda.status_comanda == 3 ?
                                                        <Finalizata />
                                                        :
                                                        comanda.status_comanda == 2 ?
                                                            <InCursLivrare />
                                                            :
                                                            comanda.status_comanda == 4 ?
                                                                <Anulata />
                                                                :
                                                                <Text style={{ color: '#fff', overflow: 'hidden' }}>{comanda.status_comanda}</Text>
                                            }
                                            <Text style={[styles.idComanda, { marginTop: 5 }]}>{comanda.total} lei</Text>
                                        </View>

                                        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center',  }}>
                                            <TouchableOpacity
                                                style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: "column" }}
                                                activeOpacity={1}
                                                onPress={() => this.props.navigation.navigate('ComenziActive', { comanda: comanda })}>
                                                <Text style={[styles.btnEdit]}>vezi comanda</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                        })
                    }
                </ScrollView>
            </View>
        )
    }
}

const Inregistrata = () => {
    return (
        <Text style={{ fontSize: 15, fontFamily: 'Mongoose-Regular', color: '#fff', borderRadius: 16, textAlign: 'center', backgroundColor: '#3BA73B', paddingVertical: 8, paddingHorizontal: 15, overflow: 'hidden' }}>Inregistrata</Text>
    )
}

const Anulata = () => {
    return (
        <Text style={{ fontSize: 15, fontFamily: 'Mongoose-Regular', color: '#fff', borderRadius: 16, textAlign: 'center', backgroundColor: '#E3051B', paddingVertical: 8, paddingHorizontal: 15, overflow: 'hidden' }}>Anulata</Text>
    )
}

const Preluata = () => {
    return (
        <Text style={{ fontSize: 15, fontFamily: 'Mongoose-Regular', color: '#fff', borderRadius: 16, textAlign: 'center', backgroundColor: '#2C508B', paddingVertical: 8, paddingHorizontal: 15, overflow: 'hidden' }}>Preluata</Text>
    )
}

const InCursLivrare = () => {
    return (
        <Text style={{ fontSize: 15, fontFamily: 'Mongoose-Regular', color: '#fff', borderRadius: 16, textAlign: 'center', backgroundColor: '#232323', paddingVertical: 8, paddingHorizontal: 15, overflow: 'hidden' }}>In curs de livrare</Text>
    )
}

const Finalizata = () => {
    return (
        <Text style={{ fontSize: 15, fontFamily: 'Mongoose-Regular', color: '#fff', borderRadius: 16, textAlign: 'center', backgroundColor: '#FFD101', paddingVertical: 8, paddingHorizontal: 15, overflow: 'hidden' }}>Finalizata</Text>
    )
}