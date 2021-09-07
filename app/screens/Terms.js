import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import HTML from "react-native-render-html";
import styles from '../css/commons';
// Imagini
import api from '../api'
import Logo from '../images/logo.svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import settings from '../settings';

export default class Terms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            termsText: settings.get('site.policy'),
        };
    }
    componentDidMount(){
    }
    
    render() {
        return (
            <View style={[styles.container, { backgroundColor: 'black' }]}>
                <ScrollView style={{ width: '100%', height: '100%', backgroundColor: 'black' }}>
                    <TouchableOpacity
                        onPress={() => { this.props.navigation.goBack() }}
                        style={{ position: 'absolute', top: 30, left: 5, flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name={'chevron-back'} size={25} color={'#ffd101'} />
                        <Text style={{ fontSize: 16, fontFamily: 'Heebo-Regular', color: '#ffd101', left: 3 }}>Inapoi</Text>
                    </TouchableOpacity>

                    <View style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 70, marginBottom: 20, }}>
                        <Logo width={120} height={84}></Logo>
                    </View>
                    <Text style={styles.termsTitle}>termeni si conditii</Text>
                    {/* <Text style={[styles.termsText, { paddingHorizontal: 10, textAlign: 'center' }]}>{this.state.termsText}</Text> */}
                    <HTML style={[styles.termsText, { paddingHorizontal: 10, textAlign: 'center' }]} source={{ html: this.state.termsText }} tagsStyles={tagsStyles} />
                </ScrollView>
            </View>
        )
    }
}

const tagsStyles = {
    div: { color: '#ffffff' },
    p: { color: '#ffffff',marginTop:12 },
    a: { color: '#ffffff' },
    h1: { color: '#ffffff' },
    h2: { color: '#ffffff' },
    h3: { color: '#ffffff' },
    h4: { color: '#ffffff' },
    h5: { color: '#ffffff' },
    h6: { color: '#ffffff' },
    li: { color: '#ffffff' },
    b: { color: '#ffffff' },
    s: { color: '#ffffff' },
    i: { color: '#ffffff' },
    strong: { color: '#ffffff' },
    blockquote: { color: '#ffffff' },
    pre: { color: '#ffffff' },
    sub: { color: '#ffffff' },
    sup: { color: '#ffffff' },
    em: { color: '#ffffff' },
    // div: { color: '#ffffff' },
    // div: { color: '#ffffff' },
}