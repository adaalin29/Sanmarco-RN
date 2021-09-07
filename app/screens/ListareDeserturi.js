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

export default class ListarePizza extends Component {

    constructor(props) {
        super(props)
        this.state = {
            numarProduse: 4,
            deserturi: [],
            loading: true,
        };
    }
    componentDidMount(){
        api.get('/getDeserturi')
        .then(res => {
            if(!res.data.success)
                console.log("eroare")
            else{
                this.setState({deserturi: res.data.deserturi, loading: false})
                console.log(res.data)
            }
            
        })
    }
    addDesert(desert){
        var options = desert
        options['categoryId'] = this.state.deserturi.categoryId
        var produs = {
            id: desert.productId.toString(),
            name: desert.name,
            qty: 1,
            price: desert.price,
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
                        {this.state.loading ? null : this.state.deserturi.products.map((desert)=>{
                            return(
                            <View style={styles.produsContainer}>
                                <View style={styles.produsImagine}><Image style={styles.imageProdus} source={{uri: api.img("width:200",desert.image)}} /></View>
                                <View style={styles.produsTextContainer}>
                                    <Text style={styles.produsTitle}>{desert.name}</Text>
                                    <Text style={styles.produsDescriere}>
                                        {desert.description} 
                                    </Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        {desert.taguri?.map((tag)=>{
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
                                    <TouchableOpacity activeOpacity = {1} onPress={()=> this.addDesert(desert)} style={styles.produsDimensiune}>
                                        <View style={styles.produsDimensiuneStanga}>
                                            {/* <Text style={styles.produsDimensiuneMarime}>Pene</Text> */}
                                            <Text style={styles.produsDimensiuneCm}>{desert.gramaj}g</Text>
                                        </View>
                                        <View style={styles.produsDimensiuneDreapta}>
                                            <Text style={styles.produsPret}>{desert.price}</Text>
                                            <Text style={styles.produsLei}>lei</Text>
                                        </View>
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