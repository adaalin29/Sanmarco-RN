import React, { Component } from 'react';
import { View,Text,TouchableOpacity,Image} from 'react-native';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import styles from '../css/commons';
import { ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

export default class CategorieDetaliu extends Component {

    constructor(props){
        super(props)
        this.state = {
           numarProduse:4,
        };
    }
    render() {
        return (
            <View style = {{width:'100%',height:'100%',backgroundColor:'black'}}>
                <Header navigation = {this.props.navigation} numarProduse = {this.state.numarProduse}></Header>
                <View style = {[styles.container,{paddingBottom:70}]}>
                    <ScrollView style = {styles.contentScrollView}>
                        <Text style = {styles.oferteTitle}>Paste</Text>
                        <View style = {styles.produsContainer}>
                            <View style = {styles.produsImagine}><Image style = {styles.imageProdus} source={require('../images/paste.png')} /></View>
                            <View style = {[styles.produsTextContainer,{width:'40%'}]}>
                                <Text style = {styles.produsTitle}>Internationale</Text>
                                <Text style = {styles.produsDescriere}>sos de rosii, mozzarella, chorizo, ceapa rosie, carnaciori, ciuperci, masline</Text>
                            </View>
                            <View style = {[styles.produsDimensiuni,{width:'35%'}]}>
                                <TouchableOpacity activeOpacity = {1}  style = {styles.produsDimensiune}>
                                    <View style = {styles.produsDimensiuneStanga}>
                                        <Text style = {[styles.produsDimensiuneMarime,{fontSize:9}]}>Penne</Text>
                                        <Text style = {styles.produsDimensiuneCm}>550 gr</Text>
                                    </View>
                                    <View style = {styles.produsDimensiuneDreapta}>
                                        <Text style = {styles.produsPret}>22.50</Text>
                                        <Text style = {styles.produsLei}>lei</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity = {1}  style = {styles.produsDimensiune}>
                                    <View style = {styles.produsDimensiuneStanga}>
                                        <Text style = {[styles.produsDimensiuneMarime,{fontSize:9}]}>Spaghetti</Text>
                                        <Text style = {styles.produsDimensiuneCm}>550 gr</Text>
                                    </View>
                                    <View style = {styles.produsDimensiuneDreapta}>
                                        <Text style = {styles.produsPret}>22.50</Text>
                                        <Text style = {styles.produsLei}>lei</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style = {styles.produsContainer}>
                            <View style = {styles.produsImagine}><Image style = {styles.imageProdus} source={require('../images/paste.png')} /></View>
                            <View style = {[styles.produsTextContainer,{width:'40%'}]}>
                                <Text style = {styles.produsTitle}>Internationale</Text>
                                <Text style = {styles.produsDescriere}>sos de rosii, mozzarella, chorizo, ceapa rosie, carnaciori, ciuperci, masline</Text>
                            </View>
                            <View style = {[styles.produsDimensiuni,{width:'35%'}]}>
                                <TouchableOpacity activeOpacity = {1}  style = {styles.produsDimensiune}>
                                    <View style = {styles.produsDimensiuneStanga}>
                                        <Text style = {[styles.produsDimensiuneMarime,{fontSize:9}]}>Penne</Text>
                                        <Text style = {styles.produsDimensiuneCm}>550 gr</Text>
                                    </View>
                                    <View style = {styles.produsDimensiuneDreapta}>
                                        <Text style = {styles.produsPret}>22.50</Text>
                                        <Text style = {styles.produsLei}>lei</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity = {1}  style = {styles.produsDimensiune}>
                                    <View style = {styles.produsDimensiuneStanga}>
                                        <Text style = {[styles.produsDimensiuneMarime,{fontSize:9}]}>Spaghetti</Text>
                                        <Text style = {styles.produsDimensiuneCm}>550 gr</Text>
                                    </View>
                                    <View style = {styles.produsDimensiuneDreapta}>
                                        <Text style = {styles.produsPret}>22.50</Text>
                                        <Text style = {styles.produsLei}>lei</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style = {styles.produsContainer}>
                            <View style = {styles.produsImagine}><Image style = {styles.imageProdus} source={require('../images/paste.png')} /></View>
                            <View style = {[styles.produsTextContainer,{width:'40%'}]}>
                                <Text style = {styles.produsTitle}>Internationale</Text>
                                <Text style = {styles.produsDescriere}>sos de rosii, mozzarella, chorizo, ceapa rosie, carnaciori, ciuperci, masline</Text>
                            </View>
                            <View style = {[styles.produsDimensiuni,{width:'35%'}]}>
                                <TouchableOpacity activeOpacity = {1}  style = {styles.produsDimensiune}>
                                    <View style = {styles.produsDimensiuneStanga}>
                                        <Text style = {[styles.produsDimensiuneMarime,{fontSize:9}]}>Penne</Text>
                                        <Text style = {styles.produsDimensiuneCm}>550 gr</Text>
                                    </View>
                                    <View style = {styles.produsDimensiuneDreapta}>
                                        <Text style = {styles.produsPret}>22.50</Text>
                                        <Text style = {styles.produsLei}>lei</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity = {1}  style = {styles.produsDimensiune}>
                                    <View style = {styles.produsDimensiuneStanga}>
                                        <Text style = {[styles.produsDimensiuneMarime,{fontSize:9}]}>Spaghetti</Text>
                                        <Text style = {styles.produsDimensiuneCm}>550 gr</Text>
                                    </View>
                                    <View style = {styles.produsDimensiuneDreapta}>
                                        <Text style = {styles.produsPret}>22.50</Text>
                                        <Text style = {styles.produsLei}>lei</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style = {styles.produsContainer}>
                            <View style = {styles.produsImagine}><Image style = {styles.imageProdus} source={require('../images/paste.png')} /></View>
                            <View style = {[styles.produsTextContainer,{width:'40%'}]}>
                                <Text style = {styles.produsTitle}>Internationale</Text>
                                <Text style = {styles.produsDescriere}>sos de rosii, mozzarella, chorizo, ceapa rosie, carnaciori, ciuperci, masline</Text>
                            </View>
                            <View style = {[styles.produsDimensiuni,{width:'35%'}]}>
                                <TouchableOpacity activeOpacity = {1}  style = {styles.produsDimensiune}>
                                    <View style = {styles.produsDimensiuneStanga}>
                                        <Text style = {[styles.produsDimensiuneMarime,{fontSize:9}]}>Penne</Text>
                                        <Text style = {styles.produsDimensiuneCm}>550 gr</Text>
                                    </View>
                                    <View style = {styles.produsDimensiuneDreapta}>
                                        <Text style = {styles.produsPret}>22.50</Text>
                                        <Text style = {styles.produsLei}>lei</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity = {1}  style = {styles.produsDimensiune}>
                                    <View style = {styles.produsDimensiuneStanga}>
                                        <Text style = {[styles.produsDimensiuneMarime,{fontSize:9}]}>Spaghetti</Text>
                                        <Text style = {styles.produsDimensiuneCm}>550 gr</Text>
                                    </View>
                                    <View style = {styles.produsDimensiuneDreapta}>
                                        <Text style = {styles.produsPret}>22.50</Text>
                                        <Text style = {styles.produsLei}>lei</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <Footer></Footer>
            </View>
        )
    }
}