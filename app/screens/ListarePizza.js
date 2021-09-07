import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, InteractionManager } from 'react-native';

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

export default class ListarePizza extends Component {

    constructor(props) {
        super(props)
        this.state = {
            numarProduse: 4,
            pizza: [],
            loading: true,
        };
    }
    componentDidMount() {
        console.log(this.props.navigation.navigate.params)
			this.getData()

        
    }
    getData(){
        this.setState({loading: true})
        api.get('/getPizza')
        .then(res => {
            if (!res.data.success)
                console.log("eroare")
            else {
                this.setState({ pizza: res.data.pizzas, loading: false })
                console.log(res.data)
            }

        })
    }
    addPizzaa(pizza) {
        console.log(pizza)
        var options = pizza
        options['categoryId'] = this.state.pizza.categoryId
        var produs = {
            id: pizza.productId,
            name: pizza.name,
            qty: 1,
            price: pizza.price,
            options: options,
        }
        cart.addItem(_.cloneDeep(produs))
    }
    render() {
        if (this.state.loading)
            return (
                <Loading></Loading>
            )
        else
            return (
                <View style={{ width: '100%', height: '100%', backgroundColor: '#232323' }}>
                    <Header navigation={this.props.navigation}></Header>

                    {/* <Oferta title={'NU UITA DE OFERTA PIZZA 3 + 1 GRATIS'} message={'Valabil doar pentru pizza L (30 cm)'} /> */}



                    <ModalSuperOFerta />

                    <View style={[styles.container, { paddingBottom: 70 }]}>
                        <ScrollView style={styles.contentScrollView}>
                            {this.state.loading ?
                                null
                                :
                                this.state.pizza.products.map((pizza, key) => {
                                    if (!pizza.name.includes("XXL")) {
                                        var nextPizza = this.state.pizza.products[key + 1]
                                        
                                        return (
                                            <View key={pizza.productId} style={styles.produsContainer}>
                                                <View style={styles.produsImagine}><Image style={[styles.imageProdus, { borderRadius: 100 }]} source={{
                                                    uri: api.img("width:200", pizza.image)
                                                }} /></View>
                                                <View style={styles.produsTextContainer}>
                                                    <Text style={styles.produsTitle}>{pizza.name}</Text>
                                                    <Text style={styles.produsDescriere}>
                                                        {pizza.description} 
                                                    </Text>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        {pizza.taguri?.map((tag)=>{
                                                            return(
                                                            <Text key={tag.id} style={[styles.tagNou, {marginRight: 10, color: tag.culoare_text, overflow:"hidden"}]}>
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
                                                <View style={[styles.produsDimensiuni, { marginBottom: 10 }]}>
                                                    <TouchableOpacity activeOpacity={1} onPress={() => this.addPizzaa(_.cloneDeep(pizza))} style={styles.produsDimensiune}>
                                                        <View style={styles.produsDimensiuneStanga}>
                                                            <Text style={[styles.produsDimensiuneMarime, { top: 3 }]}>L</Text>
                                                            <Text style={[styles.produsDimensiuneCm, { bottom: 3 }]}>30 cm</Text>
                                                        </View>
                                                        <View style={styles.produsDimensiuneDreapta}>
                                                            <Text style={styles.produsPret}>{pizza.price}</Text>
                                                            <Text style={styles.produsLei}>lei</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity activeOpacity={1} onPress={() => this.addPizzaa(_.cloneDeep(nextPizza))} style={styles.produsDimensiune}>
                                                        <View style={styles.produsDimensiuneStanga}>
                                                            <Text style={[styles.produsDimensiuneMarime, { top: 3 }]}>XXL</Text>
                                                            <Text style={[styles.produsDimensiuneCm, { bottom: 3 }]}>50 cm</Text>
                                                        </View>
                                                        <View style={styles.produsDimensiuneDreapta}>
                                                            <Text style={styles.produsPret}>{nextPizza.price}</Text>
                                                            <Text style={styles.produsLei}>lei</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity activeOpacity={1}
                                                        style={styles.produsDimensiuneCustom}
                                                        onPress={() => this.props.navigation.navigate('DetaliuPizza', { pizza: pizza, pizzaxxl: nextPizza })}>
                                                        <Text style={styles.produsDimensiuneCustomText}>Cum vrei tu</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        )
                                    }
                                })}
                        </ScrollView>
                    </View>

                    <Footer navigation={this.props.navigation} />
                </View>
            )
    }
}