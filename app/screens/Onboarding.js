import React, { Component } from 'react';
import { Text, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-community/async-storage';
import Onb1 from '../images/onb1.svg';
import Onb2 from '../images/onb2.svg';

export default class OnboardingScreens extends Component {
    constructor(props) {
        super();
        this.state = {
            padTop: 0,
        }
        this.refSwiper = React.createRef();
    }

    slide1() {
        return (
            <ScrollView
                contentContainerStyle={{ alignItems: 'center', paddingTop: '20%' }}
                centerContent={true}>
                <Onb1 />
                <Text style={{ fontSize: 25, fontFamily: 'Heebo-Bold', color: '#fff', textTransform: 'uppercase', marginTop: '20%' }}>ALEGE PRODUSELE</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: 16, fontFamily: 'Heebo-Regular', color: '#fff', marginTop: '5%' }}>
                    Iti poti configura o gama intreaba de produse, dupa bunul plac.
                </Text>
            </ScrollView>
        )
    }

    slide2() {
        return (
            <ScrollView
                contentContainerStyle={{ alignItems: 'center', paddingTop: '20%' }}
                centerContent={true}>
                <Onb2 />
                <Text style={{ fontSize: 25, fontFamily: 'Heebo-Bold', color: '#fff', textTransform: 'uppercase', marginTop: '20%' }}>Livrare rapida</Text>
                <Text style={{ width: '50%', textAlign: 'center', fontSize: 16, fontFamily: 'Heebo-Regular', color: '#fff', marginTop: '5%' }}>
                    Iti livram rapid comanda cu propriul serviciu.
                </Text>
            </ScrollView>
        )
    }
    skip(){
        AsyncStorage.setItem("didOnboard", "true")
        this.props.navigation.replace('ListarePizza')
    }
    render() {
        return (
            <>
                <Swiper
                    ref={this.refSwiper}
                    style={styles.wrapper}
                    loop={false}
                    dotStyle={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#707070' }}
                    activeDotStyle={{ width: 20, height: 20, borderRadius: 15, backgroundColor: '#fff' }}>
                    {this.slide1()}
                    {this.slide2()}
                </Swiper>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => { this.skip() }}
                    style={{ alignSelf: 'center', backgroundColor: '#000', width: '100%', alignItems: 'center', paddingBottom: '10%' }}>
                    <Text style={{ textTransform: 'uppercase', fontSize: 18, fontFamily: 'Heebo-Regular', color: '#E3051B' }}>Treci peste explicatii</Text>
                </TouchableOpacity>
            </>
        )
    }
}

var styles = {
    wrapper: {
        backgroundColor: '#000'
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
}