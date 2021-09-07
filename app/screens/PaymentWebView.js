import React, { Component } from 'react';
import { View,Text,TouchableOpacity,Image, ScrollView} from 'react-native';
import styles from '../css/commons';
import { WebView } from 'react-native-webview';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ComandaReady from '../images/comandaReady.svg';
import * as Animatable from 'react-native-animatable';
import { SendButton } from '../components/SendButton';
// Imagini
import CartImage from "../images/cartImage.svg";
import BuyFinger from "../images/buyFinger.svg";
import cart from '../cart'

export default class PaymentWebView extends Component {

    constructor(props){
        super(props)
        this.state = {
            url: props.route.params.url,
            returned: false,
            success: false,
        };
    }
    componentDidMount(){
        console.log("webview", this.props)
    }
    comandaSuccess(){
        cart.empty()
        return(
            <Animatable.View useNativeDriver={true} style={{ flex: 1, backgroundColor: 'black' }}>
                <View style={{ flex: 1, backgroundColor: 'black' }}>

                    <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={{ backgroundColor: '#232323' }}>
                        <View style={{ width: '60%' }}>
                            <Text style={[styles.comandaFinalizata, { marginTop: '15%' }]}>MULTUMIM PENTRU COMANDA</Text>
                        </View>

                        <ComandaReady style={{ marginTop: '4%', marginBottom: '4%' }} width={118} height={85} ></ComandaReady>

                        <Text style={[styles.textComandaFinalizata, { width: '80%', textAlign: 'center', marginTop: '5%', marginBottom: '10%' }]}>
                            In cel mai scurt timp vei fi contactat de un operator pentru confirmarea comenzii. Iti reamintim ca timpul mediu de preparare si livrare este de 45 de minute.
                        </Text>

                        {/* <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%', marginBottom: '10%' }}>
                            <Puncte width={54} height={54}></Puncte>
                            <Text style={[styles.textComandaFinalizata, { paddingLeft: '10%', flexWrap: 'wrap', width: '80%' }]}>Pentru aceasta comanda ai adunat 2 puncte. </Text>
                        </View> */}

                        
                            <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('TabNavigator', { screen: 'Istoric comenzi' })}
                            activeOpacity = {1}  style={[styles.adaugaCos,  { width: '100%' }]}>
                                <View style={[styles.adaugaCosLeft, { width: '80%' }]}>
                                    <Text style={styles.adaugaCosText}>Vezi comanda</Text>
                                </View>

                                <BuyFinger width={75} height={75} fill={'black'}></BuyFinger>
                            </TouchableOpacity>
                        

                    </ScrollView>
                </View>
            </Animatable.View>
        )
    }
    comandaFail(){
        return(
            <Animatable.View useNativeDriver={true} style={{ flex: 1, backgroundColor: 'black' }}>
                <View style={{ flex: 1, backgroundColor: 'black' }}>

                    <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={{ backgroundColor: '#232323' }}>
                        <View style={{ width: '60%' }}>
                            <Text style={[styles.comandaFinalizata, { marginTop: '15%' }]}>MULTUMIM PENTRU COMANDA fail</Text>
                        </View>

                        <ComandaReady style={{ marginTop: '4%', marginBottom: '4%' }} width={118} height={85} ></ComandaReady>

                        <Text style={[styles.textComandaFinalizata, { width: '80%', textAlign: 'center', marginTop: '5%', marginBottom: '10%' }]}>
                            In cel mai scurt timp vei fi contactat de un operator pentru confirmarea comenzii. Iti reamintim ca timpul mediu de preparare si livrare este de 45 de minute.
                        </Text>

                        {/* <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%', marginBottom: '10%' }}>
                            <Puncte width={54} height={54}></Puncte>
                            <Text style={[styles.textComandaFinalizata, { paddingLeft: '10%', flexWrap: 'wrap', width: '80%' }]}>Pentru aceasta comanda ai adunat 2 puncte. </Text>
                        </View> */}

                        
                            <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate("Cos")}
                            activeOpacity = {1}  style={[styles.adaugaCos, {width: '100%'}]}>
                                <View style={[styles.adaugaCosLeft, { width: '80%' }]}>
                                    <Text style={styles.adaugaCosText}>Inapoi la cos</Text>
                                </View>

                                <BuyFinger width={75} height={75} fill={'black'}></BuyFinger>
                            </TouchableOpacity>
                        

                    </ScrollView>
                </View>
            </Animatable.View>
        )
    }
    render() {
        return (
            <View style = {{width:'100%',height:'100%',backgroundColor:'black'}}>
                <Header navigation = {this.props.navigation}></Header>
                <View style = {[styles.container,{paddingBottom:70}]}>
                    {this.state.returned ? 
                    this.state.success ? this.comandaSuccess() : this.comandaFail()
                    :
                <WebView
                    onMessage = {(event)=>{
                        console.log(event.nativeEvent.data)
                        if(event.nativeEvent.data == "success"){
                            this.setState({returned: true, success: true})
                        }else{
                            this.setState({returned: true, success: false})
                        }
                    }}
                    originWhitelist={['*']}
                    source={{ uri: this.state.url }}
                    style={{ marginTop: 20, flex: 1}}
                />}
                </View>
                <Footer navigation={this.props.navigation}></Footer>
            </View>
        )
    }
}