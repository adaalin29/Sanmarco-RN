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

import Caesar from "../../images/caesar.svg";
import Vinegreta from "../../images/vinegreta.svg";
import FaraDressing from "../../images/faraDressing.svg";
import CaesarPressed from "../../images/caesarPressed.svg";
import VinegretaPressed from "../../images/vinegretaPressed.svg";
import FaraDressingPressed from "../../images/faraDressingPressed.svg";

export default class ModalDressing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            padTop: 0,
            ingredienteSelectate: [],
            ingredienteSelectateId: [],
            caesarPressed:false,
            vinegretaPressed:false,
            iaurtPressed: false,
            noDressingPressed:false,
            produs: {},
            toppingList: [],
            loading: true,
            toppingsTotal: 0,
            index: null,
            dressingSelectat: {},
        }
    }
    modalMessage = null

    toggleModal(item = [], index) {
        console.log(item)
        this.state.produs = item
        this.setState({ showModal: (!this.state.showModal), produs: item, loading: false, index: index});
    }

    setCaesar(){
        this.setState({
            dressingSelectat: this.state.produs.options.optionals[0].optionalsContent[0],
            caesarPressed:true,
            vinegretaPressed:false,
            noDressingPressed:false,
            iaurtPressed:false,
        })
    }
    setVinegreta(){
        this.setState({
            dressingSelectat: this.state.produs.options.optionals[0].optionalsContent[2],
            vinegretaPressed:true,
            caesarPressed:false,
            noDressingPressed:false,
            iaurtPressed:false,
        })
    }
    setIaurt(){
        this.setState({
            dressingSelectat: this.state.produs.options.optionals[0].optionalsContent[1],
            noDressingPressed:false,
            iaurtPressed:true,
            vinegretaPressed:false,
            caesarPressed:false,
        })
    }
    setNoDressing(){
        this.setState({
            dressingSelectat: this.state.produs.options.optionals[0].optionalsContent[3],
            noDressingPressed:true,
            vinegretaPressed:false,
            iaurtPressed:false,
            caesarPressed:false,
        })
    }
    saveChanges() {
        this.state.produs.options['dressing'] = this.state.dressingSelectat
        cart.replace(this.state.index, this.state.produs)
        this.state.caesarPressed=false
        this.state.vinegretaPressed=false
        this.state.iaurtPressed= false
        this.state.noDressingPressed=false
        this.state.dressingSelectat={}
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
                <SafeAreaView style={{ flex: 1 }}>
                    <FlashMessage ref={ref => this.modalMessage = ref} position="top" duration={3000} />
                    <View style={styles.container}>
                        <TouchableOpacity activeOpacity={1}
                            onPress={() => { this.toggleModal() }}>
                            <Xsvg style={styles.xModal} width={22} height={22}></Xsvg>
                        </TouchableOpacity>
                        <Text style={[styles.oferteTitle, { alignSelf: "center", marginTop: '5%', marginBottom: '3%' }]}>Alege Dressingul</Text>
                        {this.state.loading ? null :
                            <>
                            <View style={{alignItems: 'center'}}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                <TouchableOpacity activeOpacity = {1}  onPress = {()=>this.setCaesar()}  activeOpacity = {0.7} style = {[styles.dimensiunePizza, this.state.caesarPressed ? {borderColor:'#FFD101',width:100,height:100, marginLeft: 20} : {borderColor:'#999999',width:100,height:100, marginLeft: 20}]}>
                                    {this.state.caesarPressed ? <CaesarPressed width = {26} height = {51}></CaesarPressed> : <Caesar width = {26} height = {51}></Caesar>}
                                    <Text style = {[styles.dimensiunePizzaText,{fontSize:11},this.state.caesarPressed ? {color:'#FFD101'} : {color:'#999999'}]}>Caesar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity activeOpacity = {1}  onPress = {()=>this.setIaurt()}  activeOpacity = {0.7} style = {[styles.dimensiunePizza, this.state.iaurtPressed ? {borderColor:'#FFD101',width:100,height:100, marginLeft: 20} : {borderColor:'#999999',width:100,height:100, marginLeft: 20}]}>
                                        {this.state.iaurtPressed ? <VinegretaPressed width = {29} height = {51}></VinegretaPressed> : <Vinegreta width = {29} height = {51}></Vinegreta>}
                                        
                                        <Text style = {[styles.dimensiunePizzaText,{fontSize:11},this.state.iaurtPressed ? {color:'#FFD101'} : {color:'#999999'}]}>Iaurt</Text>
                                </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                    <TouchableOpacity activeOpacity = {1}  onPress = {()=>this.setVinegreta()}  activeOpacity = {0.7} style = {[styles.dimensiunePizza, this.state.vinegretaPressed ? {borderColor:'#FFD101',width:100,height:100, marginLeft: 20} : {borderColor:'#999999',width:100,height:100, marginLeft: 20}]}>
                                        {this.state.vinegretaPressed ? <VinegretaPressed width = {29} height = {51}></VinegretaPressed> : <Vinegreta width = {29} height = {51}></Vinegreta>}
                                        
                                        <Text style = {[styles.dimensiunePizzaText,{fontSize:11},this.state.vinegretaPressed ? {color:'#FFD101'} : {color:'#999999'}]}>Vinegreta</Text>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity activeOpacity = {1}  onPress = {()=>this.setNoDressing()}  activeOpacity = {0.7} style = {[styles.dimensiunePizza, this.state.noDressingPressed ? {borderColor:'#FFD101',width:100,height:100, marginLeft: 20} : {borderColor:'#999999',width:100,height:100, marginLeft: 20}]}>
                                        {this.state.noDressingPressed ? <FaraDressingPressed width = {56} height = {56}></FaraDressingPressed> : <FaraDressing width = {56} height = {56}></FaraDressing>}
                                        
                                        <Text style = {[styles.dimensiunePizzaText,{fontSize:11},this.state.noDressingPressed ? {color:'#FFD101'} : {color:'#999999'}]}>Fara dressing</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
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