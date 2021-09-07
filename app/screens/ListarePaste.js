import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';

import styles from '../css/commons';
import _ from 'lodash'
import api from '../api';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Loading from './Loading'
import cart from '../cart'
import ModalMagazinInchis from '../screens/Modals/ModalMagazinInchis';
import ModalSuperOFerta from './Modals/ModalSuperOferta';

import Oferta from '../components/Oferta3+1';

export default class ListarePizza extends Component {

    constructor(props) {
        super(props)
        this.state = {
            numarProduse: 4,
            paste: [],
            loading: true,
        };
    }
    componentDidMount(){
        api.get('/getPaste')
        .then(res => {
            if(!res.data.success)
                console.log("eroare")
            else{
                this.setState({paste: res.data.paste, loading: false})
                console.log(res.data)
            }
            
        })
    }
    addPaste(paste, tipPaste){
        var options = paste
        options['categoryId']= this.state.paste.categoryId
        if (tipPaste) options['tipPaste']=tipPaste
        var produs = {
            id: paste.productId.toString(),
            name: paste.name,
            qty: 1,
            price: paste.price,
            options: options,
        }
        cart.addItem(_.cloneDeep(produs))
    }
    render() {
        // console.log(this.props)
        if(this.state.loading)
        return(
            <Loading></Loading>
        )
        else
        return (
            <View style={{ width: '100%', height: '100%', backgroundColor: '#232323' }}>
                <Header navigation={this.props.navigation}></Header>

                {/* <Oferta title={'NU UITA DE OFERTA PIZZA 3 + 1 GRATIS'} message={'Valabil doar pentru pizza L (30 cm)'} /> */}

                <ModalMagazinInchis />

                <ModalSuperOFerta />

                <View style={[styles.container, { paddingBottom: 70 }]}>
                    <ScrollView style={styles.contentScrollView}>
                        {this.state.loading ? null : this.state.paste.products.map((paste)=>{
                            return(
                            <View key={paste.productId} style={styles.produsContainer}>
                                <View style={styles.produsImagine}><Image style={styles.imageProdus} source={{uri: api.img("width:200",paste.image)}} /></View>
                                <View style={styles.produsTextContainer}>
                                    <Text style={styles.produsTitle}>{paste.name}</Text>
                                    <Text style={styles.produsDescriere}>
                                        {paste.description} 
                                    </Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        {paste.taguri?.map((tag)=>{
                                            return(
                                            <Text key={tag.id} style={[styles.tagNou, {marginRight: 10, color: tag.culoare_text}]}>
                                                {tag.text}
                                            </Text>
                                            )
                                        })}
                                    </View>
                                    {/* <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <View style={styles.produsTag}><Text style={[styles.tagText, { color: '#FFD100' }]}>Artigianale</Text></View>
                                        <View style={styles.produsTag}><Text style={[styles.tagText, { color: '#E3051B' }]}>Piccante</Text></View>
                                    </View> */}
                                </View>
                                {paste.optionals && paste.optionals.length > 0 ? (
                                    <View style={styles.produsDimensiuni}>
                                        <TouchableOpacity activeOpacity = {1} onPress={()=>this.addPaste(paste, paste.optionals[0].optionalsContent[0])} style={styles.produsDimensiune}>
                                            <View style={styles.produsDimensiuneStanga}>
                                                {/* <Text style={styles.produsDimensiuneMarime}>Pene</Text> */}
                                                <Text style={[styles.produsDimensiuneMarime, { fontSize: 10 }]}>Pene</Text>
                                                <Text style={styles.produsDimensiuneCm}>{paste.gramaj}g</Text>
                                            </View>
                                            <View style={styles.produsDimensiuneDreapta}>
                                                <Text style={styles.produsPret}>{paste.price}</Text>
                                                <Text style={styles.produsLei}>lei</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity activeOpacity = {1} onPress={()=>this.addPaste(paste, paste.optionals[0].optionalsContent[1])} style={styles.produsDimensiune}>
                                            <View style={styles.produsDimensiuneStanga}>
                                                {/* <Text style={styles.produsDimensiuneMarime}>Spaghete</Text> */}
                                                <Text style={[styles.produsDimensiuneMarime, { fontSize: 10 }]}>Spaghete</Text>
                                                <Text style={styles.produsDimensiuneCm}>{paste.gramaj}g</Text>
                                            </View>
                                            <View style={styles.produsDimensiuneDreapta}>
                                                <Text style={styles.produsPret}>{paste.price}</Text>
                                                <Text style={styles.produsLei}>lei</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity activeOpacity = {1}  
                                        style={styles.produsDimensiuneCustom}
                                        onPress={() => this.props.navigation.navigate('DetaliuPaste', {paste: paste})}
                                        >
                                            <Text style={styles.produsDimensiuneCustomText}>Cum vrei tu</Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    // paste ravioli - doar cantitate
                                    <View style={styles.produsDimensiuni}>
                                        <TouchableOpacity activeOpacity = {1} onPress={()=>this.addPaste(paste, null)} style={styles.produsDimensiune}>
                                            <View style={styles.produsDimensiuneStanga}>
                                                <Text style={styles.produsDimensiuneCm}>{paste.gramaj}g</Text>
                                            </View>
                                            <View style={styles.produsDimensiuneDreapta}>
                                                <Text style={styles.produsPret}>{paste.price}</Text>
                                                <Text style={styles.produsLei}>lei</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity activeOpacity = {1}  
                                        style={styles.produsDimensiuneCustom}
                                        onPress={() => this.props.navigation.navigate('DetaliuPaste', {paste: paste})}
                                        >
                                            <Text style={styles.produsDimensiuneCustomText}>Cum vrei tu</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                            )
                        })}
                    </ScrollView>
                </View>

                <Footer navigation={this.props.navigation} />
            </View>
        )
    }
}