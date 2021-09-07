import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, SafeAreaView } from 'react-native';

import styles from '../css/commons';
// Imagini
import Logo from '../images/logo.svg';
import Close from '../images/closeGri.svg';

import MenuPizza from '../images/menuPizza.svg';
import MenuBacanie from '../images/menuBacanie.svg';
import MenuBauturi from '../images/menuBauturi.svg';
import MenuBurgers from '../images/menuBurgers.svg';
import MenuDeserturi from '../images/menuDeserturi.svg';
import MenuPaste from '../images/menuPaste.svg';
import MenuSalate from '../images/menuSalate.svg';
import MenuSandwish from '../images/menuSandwish.svg';
import Wraps from '../images/wraps.svg';
import Extra from '../images/extra.svg';

// imagini black
import MenuPizzaBlack from '../images/menuPizzaBlack.svg';
import MenuBacanieBlack from '../images/menuBacanieBlack.svg';
import MenuBauturiBlack from '../images/menuBauturiBlack.svg';
import MenuBurgersBlack from '../images/menuBurgersBlack.svg';
import MenuDeserturiBlack from '../images/menuDeserturiBlack.svg';
import MenuPasteBlack from '../images/menuPasteBlack.svg';
import MenuSalateBlack from '../images/menuSalateBlack.svg';
import MenuSandwishBlack from '../images/menuSandwishBlack.svg';
import WrapsBlack from '../images/wrapsBlack.svg';
import ExtraBlack from '../images/extraBlack.svg';

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: null,
        }
    }
    
    isActive = screen => {
        return global.selectedCategory == screen ? true : false;
    }

    render() {
        // if (!this.state.showModal) return null
        return (

            <Modal

                animationType="slide"
                visible={this.state.showModal}
                transparent={false}
                onRequestClose={() => { this.props.toggleMenu() }}>
                <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
                    <View style={[styles.container, { height: '100%', backgroundColor: 'black' }]}>
                        
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: 20, position: 'absolute', right: 20, top: 10, }}>
                            <TouchableOpacity activeOpacity={1}
                                onPress={() => this.props.toggleMenu()}
                                style={{ width: 15, height: 15, padding: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Close width={15} height={15}></Close>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: 50, marginBottom: 20 }}>
                            <Logo width={100} height={65} />
                        </View>
                        
                        <View style={{ width: '100%', height: '100%', flex: 1, flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                            <View style={[styles.menuElement, this.isActive('pizza')?{ backgroundColor: '#FFD101' }:{}]}>
                                <TouchableOpacity activeOpacity={1}
                                    style={styles.menuElementButton}
                                    onPress={() => { this.props.navigation.navigate('ListarePizza'); this.props.toggleMenu() }}>
                                    <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                                        {this.isActive('pizza') ? <MenuPizzaBlack width={68} height={38} /> : <MenuPizza width={68} height={38} />}
                                    </View>
                                    <Text style={[styles.menuText, this.isActive('pizza')?{ color: 'black' }:{}]}>Pizza</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.menuElement, this.isActive('paste')?{ backgroundColor: '#FFD101' }:{}]}>
                                <TouchableOpacity activeOpacity={1}
                                    style={styles.menuElementButton}
                                    onPress={() => { this.props.navigation.navigate('ListarePaste'); this.props.toggleMenu() }}>
                                    <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                                        {this.isActive('paste') ? <MenuPasteBlack width={68} height={38} /> : <MenuPaste width={68} height={38} />}
                                    </View>
                                    <Text style={[styles.menuText, this.isActive('paste')?{ color: 'black' }:{}]}>Paste</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.menuElement, this.isActive('salate')?{ backgroundColor: '#FFD101' }:{}]}>
                                <TouchableOpacity activeOpacity={1}
                                    style={styles.menuElementButton}
                                    onPress={() => { this.props.navigation.navigate('ListareSalate'); this.props.toggleMenu() }}>
                                    <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                                        {this.isActive('salate') ? <MenuSalateBlack width={68} height={38} /> : <MenuSalate width={68} height={38} />}
                                    </View>
                                    <Text style={[styles.menuText, this.isActive('salate')?{ color: 'black' }:{}]}>Salate</Text>
                                </TouchableOpacity>
                            </View>
                            {/* <View style={[styles.menuElement, this.isActive('burgers')?{ backgroundColor: '#FFD101' }:{}]}>
                                <TouchableOpacity activeOpacity = {1}  style={styles.menuElementButton}>
                                    <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                                        {this.isActive('burgers') ? <MenuBurgersBlack width={68} height={38} /> : <MenuBurgers width={68} height={38} />}
                                    </View>
                                    <Text style={[styles.menuText, this.isActive('burgers')?{ color: 'black' }:{}]}>Burgers</Text>
                                </TouchableOpacity>
                            </View> */}
                            <View style={[styles.menuElement, this.isActive('sandwichuri')?{ backgroundColor: '#FFD101' }:{}]}>
                                <TouchableOpacity activeOpacity={1}
                                    style={styles.menuElementButton}
                                    onPress={() => {this.props.navigation.navigate('ListareSandwichuri'); this.props.toggleMenu()}}>
                                    <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                                        {this.isActive('sandwichuri') ? <MenuSandwishBlack width={72} height={46} /> : <MenuSandwish width={72} height={46} />}
                                    </View>
                                    <Text style={[styles.menuText, this.isActive('sandwichuri')?{ color: 'black' }:{}]}>Sandwichuri</Text>
                                </TouchableOpacity>
                            </View>
                            {/* <View style={[styles.menuElement, this.isActive('bacanie')?{ backgroundColor: '#FFD101' }:{}]}>
                                <TouchableOpacity activeOpacity = {1}  
                                style={styles.menuElementButton}
                                onPress={() => this.props.navigation.navigate('ListareBacanie')}>
                                    <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                                        {this.isActive('bacanie') ? <MenuBacanieBlack width={68} height={38} /> : <MenuBacanie width={68} height={38} />}
                                    </View>
                                    <Text style={[styles.menuText, this.isActive('bacanie')?{ color: 'black' }:{}]}>Bacanie</Text>
                                </TouchableOpacity>
                            </View> */}
                            <View style={[styles.menuElement, this.isActive('deserturi')?{ backgroundColor: '#FFD101' }:{}]}>
                                <TouchableOpacity activeOpacity={1}
                                    style={styles.menuElementButton}
                                    onPress={() => { this.props.navigation.navigate('ListareDeserturi'); this.props.toggleMenu() }}>
                                    <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                                        {this.isActive('deserturi') ? <MenuDeserturiBlack width={68} height={38} /> : <MenuDeserturi width={68} height={38} />}
                                    </View>
                                    <Text style={[styles.menuText, this.isActive('deserturi')?{ color: 'black' }:{}]}>Deserturi</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.menuElement, this.isActive('bauturi')?{ backgroundColor: '#FFD101' }:{}]}>
                                <TouchableOpacity activeOpacity={1}
                                    style={styles.menuElementButton}
                                    onPress={() => { this.props.navigation.navigate('ListareBauturi'); this.props.toggleMenu() }}>
                                    <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                                        {this.isActive('bauturi') ? <MenuBauturiBlack width={68} height={38} /> : <MenuBauturi width={68} height={38} />}
                                    </View>
                                    <Text style={[styles.menuText, this.isActive('bauturi')?{ color: 'black' }:{}]}>Bauturi</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.menuElement, this.isActive('wraps')?{ backgroundColor: '#FFD101' }:{}]}>
                                <TouchableOpacity activeOpacity={1}
                                    style={styles.menuElementButton}
                                    onPress={() => { this.props.navigation.navigate('ListareBurgeriWraps'); this.props.toggleMenu() }}>
                                    <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                                        {this.isActive('wraps') ? <WrapsBlack width={68} height={38} /> : <Wraps width={68} height={38} />}
                                    </View>
                                    <Text style={[styles.menuText, this.isActive('wraps')?{ color: 'black' }:{}]}>Burgeri & Wraps</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.menuElement, this.isActive('extra')?{ backgroundColor: '#FFD101' }:{}]}>
                                <TouchableOpacity activeOpacity={1}
                                    style={styles.menuElementButton}
                                    onPress={() => { this.props.navigation.navigate('ListareExtra'); this.props.toggleMenu() }}>
                                    <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                                        {this.isActive('extra') ? <ExtraBlack width={68} height={38} /> : <Extra width={68} height={38} />}
                                    </View>
                                    <Text style={[styles.menuText, this.isActive('extra')?{ color: 'black' }:{}]}>EXTRA</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                    </View>
                </SafeAreaView>
            </Modal>

        )
    }
}