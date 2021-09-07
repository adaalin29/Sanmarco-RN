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
import { ScrollView } from 'react-native-gesture-handler';

export default class ModalSosuri extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            padTop: 0,
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
        ingrediente.map((produs)=>{
            produs['cantitate'] = 0
            if(item.options.sos && item.options.sos.length > 0){
                item.options.sos.map((sos)=>{
                    if(produs.productId == sos.productId){
                        produs['cantitate'] = sos.cantitate
                    }
                })
            }
        })
        this.setState({ showModal: (!this.state.showModal), toppingList: ingrediente, produs: item, loading: false, index: index });
        // if(item.length <= 0){
        //     this.setState({ showModal: (!this.state.showModal), ingredienteSelectate: [], ingredienteSelectateId: [], produs: item, index: index, toppingList: [], toppingsTotal: 0, loading: false})
        // }else{
        //     this.state.loading = true
        //     console.log('modal item', item.options.extra)
        //     item.options.extra ? item.options.extra.map((item) => {
        //         this.adaugaStergeIngredient(item)
        //     }): null
        //     this.setState({ showModal: (!this.state.showModal), toppingList: ingrediente, produs:item, loading:false, index: index});
        // 
        console.log(ingrediente)
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
        var sosuri = []
        this.state.toppingList.map((sos)=>{
            if(sos.cantitate > 0){
                sosuri.push(sos)
            }
        })
        this.state.produs.options.sos = sosuri
        cart.replace(this.state.index, this.state.produs)
        // showMessage({type: 'success', message: "Cosul a fost actualizat cu successss"})
        this.toggleModal()

    }
    updateCantitate(index, cantitate){
        if(!(cantitate <= -1)){
            this.state.toppingList[index]['cantitate'] = cantitate
            this.forceUpdate()
        }
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
                <SafeAreaView style={{ flex: 1 }}>
                    <FlashMessage ref={ref => this.modalMessage = ref} position="top" duration={3000} />
                    <View style={styles.container}>
                        <TouchableOpacity activeOpacity={1}
                            onPress={() => { this.toggleModal() }}>
                            <Xsvg style={styles.xModal} width={22} height={22}></Xsvg>
                        </TouchableOpacity>
                        <Text style={[styles.oferteTitle, { alignSelf: "center", marginTop: '5%', marginBottom: '3%' }]}>Alege sosul</Text>
                        {/* <View style={styles.containerIngrediente}>
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
                        <Ingredient text="Mozzarella"></Ingredient>
                        <Ingredient text="Gorgonzola"></Ingredient> 
                    </View> */}
                        {this.state.loading ? null :
                            // <FlatList
                            //     contentContainerStyle={{backgroundColor: 'red'}}
                            //     data={this.state.toppingList}
                            //     renderItem={({ item, index }) => (
                            //         <>
                            //             <View
                            //                 style={[styles.sosElement, { borderColor: '#999' }, styles.sosElementModal]}
                            //                 onPress={() => this.adaugaStergeIngredient(item)}>
                            //                 <SvgUri
                            //                     width="44"
                            //                     height="48"
                            //                     uri={item.image}
                            //                 />
                            //             </View>
                            //             <View style={{ flexDirection: "column" }}>
                            //                 <Text style={[styles.adaugaSosText, { color: '#999', marginTop: 3 }]}>{item.name}</Text>
                            //                 <Text style={[styles.adaugaSosText, { color: '#999' }]}>({item.price} lei)</Text>
                            //             </View>
                            //         </>

                            //     )}
                            //     keyExtractor={item => item.name}
                            //     numColumns={3}
                            //     ListFooterComponent={
                            //         <View style={{ flex: 1, paddingBottom: 70 }}>
                            //             <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', margin: '2%', marginTop: '4%', marginBottom: '4%' }}>
                            //                 <Text style={styles.totalModalIngrediente}>Total</Text>
                            //                 <Text style={{ fontSize: 22, fontFamily: 'Heebo-Bold', color: '#ffd101' }}>{this.state.toppingsTotal} <Text style={{ fontSize: 13, fontFamily: 'Heebo-Regular', color: '#ffd101' }}>lei</Text> </Text>
                            //             </View>

                            //             {/* <SendButton onPress={()=> this.saveChanges()} width={'97%'} text={'Salveaza'}></SendButton> */}
                            //         </View>
                            //     }
                            // />
                            <>
                            <ScrollView centerContent={true}>
                                {this.state.toppingList.map((item, key) =>{
                                    return(
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, width: '100%' }}>
                                    <TouchableOpacity
                                        style={[styles.sosElement, { borderColor: '#999', flexShrink:0 }, styles.sosElementModal]}
                                        onPress={() => this.updateCantitate(key, item.cantitate+1)}>
                                        <SvgUri
                                            width="44"
                                            height="48"
                                            uri={item.image}
                                        />
                                    </TouchableOpacity>
                                    <View style={{ flex: 1, flexDirection: "column", marginLeft: 10, width: '100%',  }}>
                                        <View style={{ flexDirection: "row", marginTop: 10  }}>
                                            <Text style={{ color: 'white', marginTop: 3, fontSize: 20, marginBottom: 10 }}>{item.name}</Text>
                                            <Text style={{ color: 'white', marginTop: 3, fontSize: 20, color: '#FFD100', fontWeight: 'bold' }}>{' '+item.price+' lei'}</Text>
                                        </View>
                                        <View style={[styles.piceContainer, { height: 20, marginBottom: 14 }]}>
                                            <TouchableOpacity activeOpacity = {1}  onPress={() => this.updateCantitate(key, item.cantitate-1)} style={styles.countButton}><Text style={styles.countText}>-</Text></TouchableOpacity>
                                            <Text style={styles.countText}>{item.cantitate}</Text>
                                            <TouchableOpacity activeOpacity = {1}  onPress={() => this.updateCantitate(key, item.cantitate+1)} style={styles.countButton}><Text style={styles.countText}>+</Text></TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                    )
                                })}
                            </ScrollView>
                                    {/* <View style={{ flex: 1, paddingBottom: 70 }}>
                                        <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', margin: '2%', marginTop: '4%', marginBottom: '4%' }}>
                                            <Text style={styles.totalModalIngrediente}>Total</Text>
                                            <Text style={{ fontSize: 22, fontFamily: 'Heebo-Bold', color: '#ffd101' }}>{this.state.toppingsTotal} <Text style={{ fontSize: 13, fontFamily: 'Heebo-Regular', color: '#ffd101' }}>lei</Text> </Text>
                                        </View>
                                    </View> */}
                                    </>
                        }
                        <TouchableOpacity
                            onPress={() => this.saveChanges()}
                            activeOpacity={1}
                            style={[styles.adaugaCos, {marginBottom: 5, width: '97%', alignSelf: 'center' }]}>
                            <View style={[styles.adaugaCosLeft, { width: '80%' }]}>
                                <Text style={styles.adaugaCosText}>Salveaza</Text>
                            </View>

                            <BuyFinger width={75} height={75} fill={'black'}></BuyFinger>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Modal>
        )
    }
}