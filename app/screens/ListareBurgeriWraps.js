import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';

import styles from '../css/commons';
import _ from 'lodash'
import api from '../api';
import cart from '../cart';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Loading from './Loading'
import ModalMagazinInchis from '../screens/Modals/ModalMagazinInchis';
import ModalSuperOFerta from './Modals/ModalSuperOferta';

import Oferta from '../components/Oferta3+1';

export default class ListareBurgeriWraps extends Component {

    constructor(props) {
        super(props)
        this.state = {
            numarProduse: 4,
            sandwichuri: [],
            wraps: [],
            loading: true,
        };
    }
    componentDidMount(){
        api.get('/getBurgeri')
        .then(res => {
            if(!res.data.success)
                console.log("eroare")
            else{
                api.get('/getWraps')
                .then(res1 => {
                    if(!res1.data.success)
                        console.log("eroare")
                    else{
                        this.setState({wraps: res1.data.wraps, sandwichuri: res.data.burgeri, loading: false})
                    }
                    
                })
            }
            
        })
        
    }
    addSandwich(sandwich){
        var options = sandwich
        options['categoryId']= this.state.sandwichuri.categoryId
        var produs = {
            id: sandwich.productId.toString(),
            name: sandwich.name,
            qty: 1,
            price: sandwich.price,
            options: options,
        }
        cart.addItem(_.cloneDeep(produs))
    }
    addWrap(sandwich){
        var options = sandwich
        options['categoryId']= this.state.wraps.categoryId
        var produs = {
            id: sandwich.productId.toString(),
            name: sandwich.name,
            qty: 1,
            price: sandwich.price,
            options: options,
        }
        cart.addItem(_.cloneDeep(produs))
    }
    render() {
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
                        {this.state.loading ? null : this.state.sandwichuri.products.map((sandwich, key)=>{
                            return(
                            <View key={key} style={styles.produsContainer}>
                                <View style={styles.produsImagine}><Image style={styles.imageProdus} source={{uri: api.img("width:200",sandwich.image)}} /></View>
                                <View style={styles.produsTextContainer}>
                                    <Text style={styles.produsTitle}>{sandwich.name}</Text>
                                    <Text style={styles.produsDescriere}>
                                        {sandwich.description} 
                                    </Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        {sandwich.taguri?.map((tag)=>{
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
                                <View style={styles.produsDimensiuni}>
                                    <TouchableOpacity activeOpacity = {1} onPress={()=> this.addSandwich(sandwich)} style={styles.produsDimensiune}>
                                        <View style={styles.produsDimensiuneStanga}>
                                            {/* <Text style={styles.produsDimensiuneMarime}>Pene</Text> */}
                                            <Text style={styles.produsDimensiuneCm}>{sandwich.gramaj}g</Text>
                                        </View>
                                        <View style={styles.produsDimensiuneDreapta}>
                                            <Text style={styles.produsPret}>{sandwich.price}</Text>
                                            <Text style={styles.produsLei}>lei</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity = {1}  
                                    style={styles.produsDimensiuneCustom}
                                    onPress={() => this.props.navigation.navigate('DetaliuBurger', {sandwich: sandwich})}
                                    >
                                        <Text style={styles.produsDimensiuneCustomText}>Cum vrei tu</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            )
                        })}
                        {this.state.loading ? null : this.state.wraps.products.map((sandwich, key)=>{
                            return(
                            <View key={key} style={styles.produsContainer}>
                                <View style={styles.produsImagine}><Image style={styles.imageProdus} source={{uri: api.img("width:200",sandwich.image)}} /></View>
                                <View style={styles.produsTextContainer}>
                                    <Text style={styles.produsTitle}>{sandwich.name}</Text>
                                    <Text style={styles.produsDescriere}>
                                        {sandwich.description} 
                                    </Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        {sandwich.taguri?.map((tag)=>{
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
                                <View style={styles.produsDimensiuni}>
                                    <TouchableOpacity activeOpacity = {1} onPress={()=> this.addWrap(sandwich)} style={styles.produsDimensiune}>
                                        <View style={styles.produsDimensiuneStanga}>
                                            {/* <Text style={styles.produsDimensiuneMarime}>Pene</Text> */}
                                            <Text style={styles.produsDimensiuneCm}>{sandwich.gramaj}g</Text>
                                        </View>
                                        <View style={styles.produsDimensiuneDreapta}>
                                            <Text style={styles.produsPret}>{sandwich.price}</Text>
                                            <Text style={styles.produsLei}>lei</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity = {1}  
                                    style={styles.produsDimensiuneCustom}
                                    onPress={() => this.props.navigation.navigate('DetaliuWrap', {sandwich: sandwich})}
                                    >
                                        <Text style={styles.produsDimensiuneCustomText}>Cum vrei tu</Text>
                                    </TouchableOpacity>
                                </View>
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