import React, { createRef } from 'react';
import { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Animated from 'react-native-reanimated';

import styles from '../../app/css/commons';
import cart from '../cart'
import Close from '../../app/images/close.svg';
import Gift from '../images/gift.svg';

export default class Oferta extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ofertaVizibila: true,
        }
        this.refAnimatie = createRef();
    }

    async toggleOfertaVizibila() {
        
        cart.empty()
        await this.refAnimatie.bounceOutRight();
        this.setState({ ofertaVizibila: false });
    }

    render() {
        return (
            (this.state.ofertaVizibila &&
                (<Animatable.View ref={ref => this.refAnimatie = ref} animation={this.state.ofertaVizibila ? 'fadeInLeft' : 'fadeOutRight'} useNativeDriver style={[styles.ofertaContainer]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
                        <View style={{ flexDirection: 'row' }}>
                            <Gift width={40} height={38}></Gift>
                            <View style={styles.ofertaTextContainer}>
                                <Text style={styles.ofertaTitleIndex}>{this.props.title}</Text>
                                <Text style={styles.ofertaSubtitle}>{this.props.message}</Text>
                            </View>
                        </View>

                        <TouchableOpacity activeOpacity = {1} 
                            onPress={() => { this.toggleOfertaVizibila() }}
                            style={styles.closeOferte}>
                            <Close fill={'black'} width={16} height={16}></Close>
                        </TouchableOpacity>
                    </View>
                </Animatable.View>))
        )
    }
}