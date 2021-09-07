import React from 'react';
import styles from '../css/commons';
import { TouchableOpacity, Text, View } from 'react-native';

import CloseIngredient from "../images/closeIngredient.svg";

export default class Ingredient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vizibil: true,
        }
    }

    changeColor() {
        this.state.vizibil ?
            this.setState({
                vizibil: false,
            })
            :
            this.setState({
                vizibil: true,
            })
    }

    render() {
        return (
            this.state.vizibil ?
                <View style={this.props.styleContainer}>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.changeColor()} style={styles.igredient}>
                        <CloseIngredient width={13} height={13}></CloseIngredient>
                        <Text style={styles.ingredientText}>{this.props.text}</Text>
                    </TouchableOpacity>
                </View>
                :
                null
        )
    }
};


