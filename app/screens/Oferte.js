import React, { Component } from 'react';
import { View,Text,TouchableOpacity,Image, ScrollView} from 'react-native';
import styles from '../css/commons';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

// Imagini
import CartImage from "../images/cartImage.svg";

export default class Oferte extends Component {

    constructor(props){
        super(props)
        this.state = {
           numarProduse:4,
        };
    }

    render() {
        return (
            <View style = {{width:'100%',height:'100%',backgroundColor:'black'}}>
                <Header navigation = {this.props.navigation}></Header>
                <View style = {[styles.container,{paddingBottom:70}]}>
                    <ScrollView style = {styles.contentScrollView}>
                        {/* <Text style = {styles.oferteTitle}>Oferte</Text> */}
                        {/* <View style = {styles.oferta}> */}
                            
                            <View style = {styles.ofertaTextContianer}>
                            <Text style = {styles.ofertaTitle}>NE PARE RAU!</Text>
                            <Text style = {styles.ofertaDescriere}>Nu exista nici o oferta.</Text>
                            {/* </View> */}
                        </View>
                        {/* <View style = {styles.oferta}>
                            <View style = {styles.ofertImagine}>
                                <Image style = {styles.fullWidth} source={require('../images/oferta-pizza.png')} />
                            </View>
                            <View style = {styles.ofertaTextContianer}>
                                <Text style = {styles.ofertaTitle}>2 Pizza San Marco</Text>
                                <Text style = {styles.ofertaDescriere}>Doar in perioada 1 Iulie - 15 Iulie toate produsele noastre sunt la 10% reducere. Profita acum de oferta!</Text>
                                <View style = {styles.ofertaPretContainer}>
                                    <Text style = {styles.ofertaPret}>35.50</Text>
                                    <Text style = {styles.ofertaLei}>lei</Text>
                                </View>
                            </View>
                            <TouchableOpacity activeOpacity = {1}  style = {styles.adaugaCos}>
                                <View style = {styles.adaugaCosLeft}>
                                    <Text style = {styles.adaugaCosText}>Adauga in cos</Text>
                                </View>
                                <View style = {styles.adaugaCostRight}>
                                    <CartImage fill = {'black'}></CartImage>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style = {styles.oferta}>
                            <View style = {styles.ofertImagine}>
                                <Image style = {styles.fullWidth} source={require('../images/oferta-pizza.png')} />
                            </View>
                            <View style = {styles.ofertaTextContianer}>
                                <Text style = {styles.ofertaTitle}>2 Pizza San Marco</Text>
                                <Text style = {styles.ofertaDescriere}>Doar in perioada 1 Iulie - 15 Iulie toate produsele noastre sunt la 10% reducere. Profita acum de oferta!</Text>
                                <View style = {styles.ofertaPretContainer}>
                                    <Text style = {styles.ofertaPret}>35.50</Text>
                                    <Text style = {styles.ofertaLei}>lei</Text>
                                </View>
                            </View>
                            <TouchableOpacity activeOpacity = {1}  style = {styles.adaugaCos}>
                                <View style = {styles.adaugaCosLeft}>
                                    <Text style = {styles.adaugaCosText}>Adauga in cos</Text>
                                </View>
                                <View style = {styles.adaugaCostRight}>
                                    <CartImage fill = {'black'}></CartImage>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style = {styles.oferta}>
                            <View style = {styles.ofertImagine}>
                                <Image style = {styles.fullWidth} source={require('../images/oferta-pizza.png')} />
                            </View>
                            <View style = {styles.ofertaTextContianer}>
                                <Text style = {styles.ofertaTitle}>2 Pizza San Marco</Text>
                                <Text style = {styles.ofertaDescriere}>Doar in perioada 1 Iulie - 15 Iulie toate produsele noastre sunt la 10% reducere. Profita acum de oferta!</Text>
                                <View style = {styles.ofertaPretContainer}>
                                    <Text style = {styles.ofertaPret}>35.50</Text>
                                    <Text style = {styles.ofertaLei}>lei</Text>
                                </View>
                            </View>
                            <TouchableOpacity activeOpacity = {1}  style = {styles.adaugaCos}>
                                <View style = {styles.adaugaCosLeft}>
                                    <Text style = {styles.adaugaCosText}>Adauga in cos</Text>
                                </View>
                                <View style = {styles.adaugaCostRight}>
                                    <CartImage fill = {'black'}></CartImage>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style = {styles.oferta}>
                            <View style = {styles.ofertImagine}>
                                <Image style = {styles.fullWidth} source={require('../images/oferta-pizza.png')} />
                            </View>
                            <View style = {styles.ofertaTextContianer}>
                                <Text style = {styles.ofertaTitle}>2 Pizza San Marco</Text>
                                <Text style = {styles.ofertaDescriere}>Doar in perioada 1 Iulie - 15 Iulie toate produsele noastre sunt la 10% reducere. Profita acum de oferta!</Text>
                                <View style = {styles.ofertaPretContainer}>
                                    <Text style = {styles.ofertaPret}>35.50</Text>
                                    <Text style = {styles.ofertaLei}>lei</Text>
                                </View>
                            </View>
                            <TouchableOpacity activeOpacity = {1}  style = {styles.adaugaCos}>
                                <View style = {styles.adaugaCosLeft}>
                                    <Text style = {styles.adaugaCosText}>Adauga in cos</Text>
                                </View>
                                <View style = {styles.adaugaCostRight}>
                                    <CartImage fill = {'black'}></CartImage>
                                </View>
                            </TouchableOpacity>
                        </View> */}
                    </ScrollView>
                </View>
                <Footer navigation={this.props.navigation}></Footer>
            </View>
        )
    }
}