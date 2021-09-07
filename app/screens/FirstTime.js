import React, { Component } from 'react';
import { View,Text,TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';
import styles from '../css/commons';
// Imagini
import FirstTime1 from '../images/firstTime1.svg';
import FirstTime2 from '../images/firstTime2.svg';
import FirstTime3 from '../images/firstTime3.svg';


export default class FirstTime extends Component {

    constructor(props){
        super(props)
        this.state = {
            title1: 'Alege produsele',
            description1:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ',
            title2: 'Introdu adresa ta',
            description2:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ',
            title3: 'Livrare rapida',
            description3:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ',
        };
    }
    render() {
        return (
            <View style = {[styles.container, {flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'black'}]}>
                 <View style = {styles.swiperContainer}>
                    <Swiper style={styles.wrapper}
                    showsButtons={false}
                    loop = {false}
                    dot = {<View style={{backgroundColor:'rgba(255,255,255, 0.5)', width: 19, height: 19,borderRadius: 100, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
                    activeDot = {<View style={{backgroundColor: 'white', width: 19, height: 19, borderRadius: 100, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
                    >
                        <View style={styles.firstTimeSlide}>
                            <FirstTime1 width = {246} height = {297}></FirstTime1>
                            <Text style = {styles.slideTitle}>{this.state.title1}</Text>
                            <Text style = {styles.slideDescription}>{this.state.description1}</Text>
                        </View>
                        <View style={styles.firstTimeSlide}>
                            <FirstTime2 width = {246} height = {297}></FirstTime2>
                            <Text style = {styles.slideTitle}>{this.state.title2}</Text>
                            <Text style = {styles.slideDescription}>{this.state.description2}</Text>
                        </View>
                        <View style={styles.firstTimeSlide}>
                            <FirstTime3 width = {246} height = {297}></FirstTime3>
                            <Text style = {styles.slideTitle}>{this.state.title3}</Text>
                            <Text style = {styles.slideDescription}>{this.state.description3}</Text>
                        </View>
                    </Swiper>
                 </View>
                <TouchableOpacity activeOpacity = {1}  style = {styles.treciPesteButon}><Text style = {styles.treciPesteButonText}>Treci peste explicatii</Text></TouchableOpacity>
            </View>
        )
    }
}