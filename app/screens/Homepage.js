import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';

import styles from '../css/commons';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

import ModalMagazinInchis from '../screens/Modals/ModalMagazinInchis';
import ModalSuperOFerta from './Modals/ModalSuperOferta';

import Oferta from '../components/Oferta3+1';

export default class Homepage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            numarProduse: 4,
        };
    }

    render() {
        return (
            <View style={{ width: '100%', height: '100%', backgroundColor: '#232323' }}>
                <Header navigation={this.props.navigation}></Header>

                <Oferta title={'NU UITA DE OFERTA PIZZA 3 + 1 GRATIS'} message={'Valabil doar pentru pizza L (30 cm)'} />

                <ModalMagazinInchis />

                <ModalSuperOFerta />

                <View style={[styles.container, { paddingBottom: 70 }]}>
                    <ScrollView style={styles.contentScrollView}>
                        <View style={styles.produsContainer}>
                            <View style={styles.produsImagine}><Image style={styles.imageProdus} source={require('../images/pizza.png')} /></View>
                            <View style={styles.produsTextContainer}>
                                <Text style={styles.produsTitle}>Internationale</Text>
                                <Text style={styles.produsDescriere}>sos de rosii, mozzarella, chorizo, ceapa rosie, carnaciori, ciuperci, masline, alte chestii sos de rosii, mozzarella, </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <View style={styles.produsTag}><Text style={[styles.tagText, { color: '#FFD100' }]}>Artigianale</Text></View>
                                    <View style={styles.produsTag}><Text style={[styles.tagText, { color: '#E3051B' }]}>Piccante</Text></View>
                                </View>
                            </View>
                            <View style={styles.produsDimensiuni}>
                                <TouchableOpacity activeOpacity = {1}  style={styles.produsDimensiune}>
                                    <View style={styles.produsDimensiuneStanga}>
                                        <Text style={styles.produsDimensiuneMarime}>L</Text>
                                        <Text style={styles.produsDimensiuneCm}>30 cm</Text>
                                    </View>
                                    <View style={styles.produsDimensiuneDreapta}>
                                        <Text style={styles.produsPret}>22.50</Text>
                                        <Text style={styles.produsLei}>lei</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity = {1}  style={styles.produsDimensiune}>
                                    <View style={styles.produsDimensiuneStanga}>
                                        <Text style={styles.produsDimensiuneMarime}>XL</Text>
                                        <Text style={styles.produsDimensiuneCm}>40 cm</Text>
                                    </View>
                                    <View style={styles.produsDimensiuneDreapta}>
                                        <Text style={styles.produsPret}>22.50</Text>
                                        <Text style={styles.produsLei}>lei</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity = {1}  style={styles.produsDimensiuneCustom}>
                                    <Text style={styles.produsDimensiuneCustomText}>Cum vrei tu</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.produsContainer}>
                            <View style={styles.produsImagine}><Image style={styles.imageProdus} source={require('../images/pizza.png')} /></View>
                            <View style={styles.produsTextContainer}>
                                <Text style={styles.produsTitle}>Internationale</Text>
                                <Text style={styles.produsDescriere}>sos de rosii, mozzarella, chorizo, ceapa rosie, carnaciori, ciuperci, masline, alte chestii sos de rosii, mozzarella, </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <View style={styles.produsTag}><Text style={[styles.tagText, { color: '#FFD100' }]}>Artigianale</Text></View>
                                    <View style={styles.produsTag}><Text style={[styles.tagText, { color: '#E3051B' }]}>Piccante</Text></View>
                                </View>
                            </View>
                            <View style={styles.produsDimensiuni}>
                                <TouchableOpacity activeOpacity = {1}  style={styles.produsDimensiune}>
                                    <View style={styles.produsDimensiuneStanga}>
                                        <Text style={styles.produsDimensiuneMarime}>L</Text>
                                        <Text style={styles.produsDimensiuneCm}>30 cm</Text>
                                    </View>
                                    <View style={styles.produsDimensiuneDreapta}>
                                        <Text style={styles.produsPret}>22.50</Text>
                                        <Text style={styles.produsLei}>lei</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity = {1}  style={styles.produsDimensiune}>
                                    <View style={styles.produsDimensiuneStanga}>
                                        <Text style={styles.produsDimensiuneMarime}>XL</Text>
                                        <Text style={styles.produsDimensiuneCm}>40 cm</Text>
                                    </View>
                                    <View style={styles.produsDimensiuneDreapta}>
                                        <Text style={styles.produsPret}>22.50</Text>
                                        <Text style={styles.produsLei}>lei</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity = {1}  style={styles.produsDimensiuneCustom}>
                                    <Text style={styles.produsDimensiuneCustomText}>Cum vrei tu</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.produsContainer}>
                            <View style={styles.produsImagine}><Image style={styles.imageProdus} source={require('../images/pizza.png')} /></View>
                            <View style={styles.produsTextContainer}>
                                <Text style={styles.produsTitle}>Internationale</Text>
                                <Text style={styles.produsDescriere}>sos de rosii, mozzarella, chorizo, ceapa rosie, carnaciori, ciuperci, masline, alte chestii sos de rosii, mozzarella, </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <View style={styles.produsTag}><Text style={[styles.tagText, { color: '#FFD100' }]}>Artigianale</Text></View>
                                    <View style={styles.produsTag}><Text style={[styles.tagText, { color: '#E3051B' }]}>Piccante</Text></View>
                                </View>
                            </View>
                            <View style={styles.produsDimensiuni}>
                                <TouchableOpacity activeOpacity = {1}  style={styles.produsDimensiune}>
                                    <View style={styles.produsDimensiuneStanga}>
                                        <Text style={styles.produsDimensiuneMarime}>L</Text>
                                        <Text style={styles.produsDimensiuneCm}>30 cm</Text>
                                    </View>
                                    <View style={styles.produsDimensiuneDreapta}>
                                        <Text style={styles.produsPret}>22.50</Text>
                                        <Text style={styles.produsLei}>lei</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity = {1}  style={styles.produsDimensiune}>
                                    <View style={styles.produsDimensiuneStanga}>
                                        <Text style={styles.produsDimensiuneMarime}>XL</Text>
                                        <Text style={styles.produsDimensiuneCm}>40 cm</Text>
                                    </View>
                                    <View style={styles.produsDimensiuneDreapta}>
                                        <Text style={styles.produsPret}>22.50</Text>
                                        <Text style={styles.produsLei}>lei</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity = {1}  style={styles.produsDimensiuneCustom}>
                                    <Text style={styles.produsDimensiuneCustomText}>Cum vrei tu</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.produsContainer}>
                            <View style={styles.produsImagine}><Image style={styles.imageProdus} source={require('../images/pizza.png')} /></View>
                            <View style={styles.produsTextContainer}>
                                <Text style={styles.produsTitle}>Internationale</Text>
                                <Text style={styles.produsDescriere}>sos de rosii, mozzarella, chorizo, ceapa rosie, carnaciori, ciuperci, masline, alte chestii sos de rosii, mozzarella, </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <View style={styles.produsTag}><Text style={[styles.tagText, { color: '#FFD100' }]}>Artigianale</Text></View>
                                    <View style={styles.produsTag}><Text style={[styles.tagText, { color: '#E3051B' }]}>Piccante</Text></View>
                                </View>
                            </View>
                            <View style={styles.produsDimensiuni}>
                                <TouchableOpacity activeOpacity = {1}  style={styles.produsDimensiune}>
                                    <View style={styles.produsDimensiuneStanga}>
                                        <Text style={styles.produsDimensiuneMarime}>L</Text>
                                        <Text style={styles.produsDimensiuneCm}>30 cm</Text>
                                    </View>
                                    <View style={styles.produsDimensiuneDreapta}>
                                        <Text style={styles.produsPret}>22.50</Text>
                                        <Text style={styles.produsLei}>lei</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity = {1}  style={styles.produsDimensiune}>
                                    <View style={styles.produsDimensiuneStanga}>
                                        <Text style={styles.produsDimensiuneMarime}>XL</Text>
                                        <Text style={styles.produsDimensiuneCm}>40 cm</Text>
                                    </View>
                                    <View style={styles.produsDimensiuneDreapta}>
                                        <Text style={styles.produsPret}>22.50</Text>
                                        <Text style={styles.produsLei}>lei</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity = {1}  style={styles.produsDimensiuneCustom}>
                                    <Text style={styles.produsDimensiuneCustomText}>Cum vrei tu</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.produsContainer}>
                            <View style={styles.produsImagine}><Image style={styles.imageProdus} source={require('../images/pizza.png')} /></View>
                            <View style={styles.produsTextContainer}>
                                <Text style={styles.produsTitle}>Internationale</Text>
                                <Text style={styles.produsDescriere}>sos de rosii, mozzarella, chorizo, ceapa rosie, carnaciori, ciuperci, masline, alte chestii sos de rosii, mozzarella, </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <View style={styles.produsTag}><Text style={[styles.tagText, { color: '#FFD100' }]}>Artigianale</Text></View>
                                    <View style={styles.produsTag}><Text style={[styles.tagText, { color: '#E3051B' }]}>Piccante</Text></View>
                                </View>
                            </View>
                            <View style={styles.produsDimensiuni}>
                                <TouchableOpacity activeOpacity = {1}  style={styles.produsDimensiune}>
                                    <View style={styles.produsDimensiuneStanga}>
                                        <Text style={styles.produsDimensiuneMarime}>L</Text>
                                        <Text style={styles.produsDimensiuneCm}>30 cm</Text>
                                    </View>
                                    <View style={styles.produsDimensiuneDreapta}>
                                        <Text style={styles.produsPret}>22.50</Text>
                                        <Text style={styles.produsLei}>lei</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity = {1}  style={styles.produsDimensiune}>
                                    <View style={styles.produsDimensiuneStanga}>
                                        <Text style={styles.produsDimensiuneMarime}>XL</Text>
                                        <Text style={styles.produsDimensiuneCm}>40 cm</Text>
                                    </View>
                                    <View style={styles.produsDimensiuneDreapta}>
                                        <Text style={styles.produsPret}>22.50</Text>
                                        <Text style={styles.produsLei}>lei</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity = {1}  style={styles.produsDimensiuneCustom}>
                                    <Text style={styles.produsDimensiuneCustomText}>Cum vrei tu</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>

                <Footer navigation={this.props.navigation} />
            </View>
        )
    }
}