import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, Image, SafeAreaView } from 'react-native';
import styles from '../../css/commons';


import { SvgUri } from 'react-native-svg';
import Tomato from '../../images/tomato.svg';
import TomatoPressed from '../../images/tomatoPressed.svg';
import CloseIngredient from "../../images/closeIngredient.svg";
import Xsvg from '../../images/x.svg';
import Ingredient from '../../components/Ingredient';
import Sos from '../../components/Sos_topping';
import { SendButton } from '../../components/SendButton';
import _ from 'lodash'
import BuyFinger from "../../images/buyFinger.svg";
import cart from '../../cart'
import FlashMessage from 'react-native-flash-message';

export default class ModalIngrediente extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            padTop: 0,
            ingredienteModal: [
                { name: 'mozzarella', text: 'Mozzarella', pret: 3 },
                { name: 'gorgonzola', text: 'Gorgonzola', pret: 3 },
                { name: 'bacon', text: 'Bacon', pret: 2 },
                { name: 'salami', text: 'Salam uscat', pret: 2 },
                { name: 'sunca', text: 'Sunca', pret: 2 },
                { name: 'ciuperci', text: 'Ciuperci', pret: 2 },
                { name: 'porumb', text: 'Porumb', pret: 2 },
                { name: 'ardei', text: 'Ardei', pret: 2 },
                { name: 'tomato', text: 'Rosii', pret: 2 },
                { name: 'salamChorizo', text: 'Salam Chorizo', pret: 2 },
                { name: 'ceapa', text: 'Ceapa', pret: 2 },
                { name: 'carnaciori', text: 'Carnaciori', pret: 2 },
                { name: 'pui', text: 'Pui', pret: 2 },
                { name: 'ardeiIute', text: 'Ardei iute', pret: 2 },
                { name: 'prosciuto', text: 'Prosciuto crudo', pret: 2 },
                { name: 'masline', text: 'Masline', pret: 2 },
                { name: 'babic', text: 'Babic', pret: 2 },
                { name: 'branzaFeta', text: 'Branza Feta', pret: 2 },
                { name: 'fileDeAnsoa', text: 'File de ansoa', pret: 2 },
                { name: 'fileDeSomon', text: 'File de somon afumat', pret: 2 },
                { name: 'lamaie', text: 'Lamaie', pret: 2 },
                { name: 'ou', text: 'Ou', pret: 2 },
                { name: 'parmezan', text: 'Parmezan', pret: 2 },
                { name: 'rucola', text: 'Rucola', pret: 2 },
                { name: 'pesto', text: 'Pesto', pret: 2 },
                { name: 'ton', text: 'Ton', pret: 2 },
                { name: 'spanac', text: 'Spanac', pret: 2 },
            ],

            ingredienteSelectate: [],
            ingredienteSelectateId: [],
            produs: [],
            toppingList: [],
            loading: true,
            toppingsTotal: 0,
            index: null,
        }
    }
    modalMessage = null

    toggleModal(item = [], ingrediente = [], index) {
        console.log(item)
        console.log(ingrediente)
        if(item.length <= 0){
            this.setState({ showModal: (!this.state.showModal), ingredienteSelectate: [], ingredienteSelectateId: [], produs: item, index: index, toppingList: [], toppingsTotal: 0, loading: false})
        }else{
            this.state.loading = true
            console.log('modal item', item.options.extra)
            item.options.extra ? item.options.extra.map((item) => {
                this.adaugaStergeIngredient(item)
            }): null
            this.setState({ showModal: (!this.state.showModal), toppingList: ingrediente, produs:item, loading:false, index: index});
        }

    }

    adaugaStergeIngredient(ingredient) {
        var { ingredienteSelectate } = this.state;

        if (ingredienteSelectate.indexOf(ingredient) == -1) {
            if (this.state.ingredienteSelectate.length < 3) {

                ingredienteSelectate.push(ingredient);
                this.state.ingredienteSelectateId.push(ingredient.productId);
                this.state.toppingsTotal += ingredient.price
            } else {
                if (this.modalMessage) this.modalMessage.showMessage({ type: 'danger', message: "Poti scoate maxim 3 ingrediente." })
            }
        }
        else {
            ingredienteSelectate.splice(ingredienteSelectate.indexOf(ingredient), 1);
            this.state.ingredienteSelectateId.splice(this.state.ingredienteSelectateId.indexOf(ingredient.productId), 1);
            this.state.toppingsTotal -= ingredient.price
        }

        this.setState({ ingredienteSelectate: ingredienteSelectate });


    }
    saveChanges() {
        console.log("saved")
        this.state.produs.options.extra = this.state.ingredienteSelectate
        console.log("modal", this.state.index)
        cart.replace(this.state.index, this.state.produs)
        // showMessage({type: 'success', message: "Cosul a fost actualizat cu successss"})
        this.toggleModal()

    }
    getIngredienteSelectate() {
        return this.state.ingredienteSelectate
    }
    imageSize() {
        return ({
            width: 50,
            height: 52,
        })
    }

    render() {
        return (
            <Modal
                animationType={"slide"}
                visible={this.state.showModal}
                onRequestClose={() => this.toggleModal()}>
                    <SafeAreaView style={{flex: 1}}>
                   <FlashMessage ref = {ref => this.modalMessage = ref} position="top" duration={3000} />
                <View style={styles.container}>
                    <TouchableOpacity activeOpacity = {1} 
                        onPress={() => { this.toggleModal() }}>
                        <Xsvg style={styles.xModal} width={22} height={22}></Xsvg>
                    </TouchableOpacity>
                    <Text style={[styles.oferteTitle, { alignSelf: "center", marginTop: '5%', marginBottom: '3%' }]}>Alege topping-ul</Text>

                    <View style={styles.containerIngrediente}>
                        {this.state.loading ? null : this.state.ingredienteSelectate.map((ingredient) => {
                            return (
                                <View style={this.props.styleContainer}>
                                    <TouchableOpacity activeOpacity={1}
                                        activeOpacity={1} style={styles.igredient} onPress={() => this.adaugaStergeIngredient(ingredient)}>
                                        <CloseIngredient width={15} height={15}></CloseIngredient>
                                        <Text style={styles.ingredientText}>{ingredient.name}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })}
                        {/* <Ingredient text="Mozzarella"></Ingredient>
                        <Ingredient text="Gorgonzola"></Ingredient> */}
                    </View>
                    {this.state.loading ? null :
                    <>
                        <FlatList
                            data={this.state.toppingList}
                            renderItem={({ item, index }) => (
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: '1.5%', marginBottom: '1.5%' }}>
                                    {this.state.ingredienteSelectateId.includes(item.productId) ?
                                        <View style={styles.sosElementModal}>
                                            <TouchableOpacity activeOpacity={1}
                                                activeOpacity={1}
                                                style={[styles.sosElement, { borderColor: '#ffd101' }, styles.sosElementModal]}
                                            // onPress={() => this.adaugaStergeIngredient(item)}
                                            >
                                                {/* <TomatoPressed width={this.imageSize().width} height={this.imageSize().height}></TomatoPressed> */}
                                                <SvgUri
                                                    width="44"
                                                    height="48"
                                                    uri={item.image}
                                                />
                                                <Text style={[styles.adaugaSosText, { color: '#ffd101', marginTop: 3 }]}>{item.name}</Text>
                                                <Text style={[styles.adaugaSosText, { color: '#ffd101' }]}>({item.price} lei)</Text>
                                            </TouchableOpacity>
                                        </View>
                                        :
                                        <View style={styles.sosElementModal}>


                                            <TouchableOpacity activeOpacity={1}
                                                activeOpacity={1}
                                                style={[styles.sosElement, { borderColor: '#999' }, styles.sosElementModal]}
                                                onPress={() => this.adaugaStergeIngredient(item)}>

                                                {/* <Tomato width={this.imageSize().width} height={this.imageSize().height}></Tomato> */}
                                                <SvgUri
                                                    width="44"
                                                    height="48"
                                                    uri={item.image}
                                                />
                                                <Text style={[styles.adaugaSosText, { color: '#999', marginTop: 3 }]}>{item.name}</Text>
                                                <Text style={[styles.adaugaSosText, { color: '#999' }]}>({item.price} lei)</Text>


                                            </TouchableOpacity>
                                        </View>
                                    }
                                </View>
                            )}
                            keyExtractor={item => item.name}
                            numColumns={3}
                            
                        />
                        <View style={{justifyContent: 'space-between', flexDirection: 'row', marginTop: 10, marginBottom: 5,width: '97%', alignSelf: 'center'}}>
                                        <Text style={styles.totalModalIngrediente}>Total</Text>
                                        <Text style={{ fontSize: 22, fontFamily: 'Heebo-Bold', color: '#ffd101' }}>{this.state.toppingsTotal} <Text style={{ fontSize: 13, fontFamily: 'Heebo-Regular', color: '#ffd101' }}>lei</Text> </Text>
                        </View>
                    <TouchableOpacity
                        onPress={() => this.saveChanges()}
                        activeOpacity={1}
                        style={[styles.adaugaCos, { marginBottom: 5, width: '97%', alignSelf: 'center' }]}>
                        <View style={[styles.adaugaCosLeft, { width: '80%' }]}>
                            <Text style={styles.adaugaCosText}>Salveaza</Text>
                        </View>

                        <BuyFinger width={75} height={75} fill={'black'}></BuyFinger>
                    </TouchableOpacity>
                    </>}
                </View>
                </SafeAreaView>
            </Modal>
        )
    }
}