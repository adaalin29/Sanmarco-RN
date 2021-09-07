import React, { Component, createRef, StyleSheet } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, FlatList, Keyboard } from 'react-native';
import Swiper from 'react-native-swiper';
import styles from '../css/commons';
import * as Animatable from 'react-native-animatable';
import DropDownPicker from 'react-native-dropdown-picker';

import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox';
import Swipeable from 'react-native-swipeable';
import emitter from 'tiny-emitter/instance';
import Ingredient from '../components/Ingredient';
import Sos from '../components/Sos_topping';
import { MainButton } from '../components/MainButton';
import { SendButton } from '../components/SendButton';
import ModalIngrediente from './Modals/ModalIngrediente';
import ModalSosuri from './Modals/ModalSosuri';
import ModalDressing from './Modals/ModalDressing';
import ModalConfirmare from './Modals/ModalConfirmare';
import ModalAdaugaAdresa from './Modals/ModalAdaugaAdresa';
import ModalPreviewComanda from './Modals/ModalPreviewComanda';
import ModalCantitate from './Modals/ModalCantitate';
import Oferta from '../components/Oferta3+1';
import CloseIngredient from "../images/closeIngredient.svg";
import { SvgUri } from 'react-native-svg';
import api from '../api';
import NextArrow from "../images/nextArrow.svg";
import PrevArrow from "../images/prevArrow.svg";
import RightArrow1 from "../images/rightArrow1.svg";
import Close from '../images/close.svg';
import Xsvg from '../images/x.svg';
import DownArrow from '../images/down_arrow.svg';
import Sad from '../images/sad.svg';
import ComandaReady from '../images/comandaReady.svg';
import Puncte from '../images/puncte.svg';
import Trash from '../images/trash.svg';
import cart from '../cart'
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import BuyFinger from "../images/buyFinger.svg";
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import { showMessage } from 'react-native-flash-message';
import _ from "lodash"

export default class Cos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: cart.data.items,
            pretTransport: 0,
            numarProduse: 0,
            pret: 0,
            pretBaza: 0,
            extraToppingsPizza: [],
            extraToppingsPaste: [],
            extraToppingsSalata: [],
            sosuri: [],

            checkedIdPayment: null,
            checkboxesPayment: [{ id: "1", text: "Numerar" }, { id: "2", text: "Plata cu cardul la livrare" }, { id: '4', text: 'Plata online' }],

            checkedDelivery: false,
            checkedTakeAway: false,

            checkedAddress: null,

            checkedIdDelivery: null,
            editableAddressId: null,
            addressToDelete: null,
            addressesDelivery: [],
            loadingStreets: true,
            strazi: [],
            nrstrada: '',
            detalii: '',
            repere: '',
            nume: '',
            prenume: '',
            email: '',
            nrtelefon: '',
            stradaSelectata: null,
            warningTelefon: null,
            mesaj: '',
            ofertaVizibil: true,

            showModalDeleteAddress: false,

            comandaFinalizata: false,

            suc1: null,
            suc2: null,
            ofertaSucuri: false,
        }
        this.refInputPhone = createRef();
        this.refModalIngrediente = createRef();
        this.refModalDressing = createRef();
        this.refModalSosuri = createRef();
        this.refModalStergereAdresa = createRef();
        this.refModalStergereProdus = createRef();
        this.refModalAdaugaAdresa = createRef();
        this.refModalPreviewComanda = createRef();
        this.refModalCantitate = createRef();
        this.refSos = [];

        this.sucuri = [
            { label: 'Pepsi', value: 'pepsi' },
            { label: 'Mirinda', value: 'mirinda' },
            { label: '7up', value: '7up' },
        ];
        // this.controller;
    }

    componentDidMount() {
        emitter.on('cart-update', () => {
            this.forceUpdate()
        })
        api.get('/getExtraToppingsPizza')
            .then(res => {
                if (!res.data.success)
                    console.log("eroare", res.data)
                else {
                    console.log("getExtraToppingsPizza", res.data)
                    this.state.extraToppingsPizza = res.data.extraToppingsPizza
                }

            })
        if (api.oauth.getAuth().user) {
            api.get('/getContAdrese', { id: api.oauth.getAuth().user.id })
                .then(res => {
                    if (!res.data.success)
                        console.log("eroare", res.data)
                    else {
                        console.log("adrese cont", res.data.adrese)
                        this.setState({ addressesDelivery: res.data.adrese })
                    }
                })
        }

        api.get('/getSosuri')
            .then(res => {
                if (!res.data.success)
                    console.log("eroare", res.data)
                else {
                    console.log("sosuri", res.data.sosuri)
                    this.setState({ sosuri: res.data.sosuri })
                }
            })
        api.get('/getExtraToppingsPaste')
            .then(res => {
                if (!res.data.success)
                    console.log("eroare", res.data)
                else {
                    console.log("getExtraToppingsPaste", res.data)
                    this.state.extraToppingsPaste = res.data.extraToppingsPaste
                }

            })
        api.get('/getExtraToppingsSalata')
            .then(res => {
                if (!res.data.success)
                    console.log("eroare", res.data)
                else {
                    console.log("getExtraToppingsSalata", res.data)
                    this.state.extraToppingsSalata = res.data.extraToppingsSalata
                }

            })
        api.get('/getStreets')
            .then(res => {
                if (!res.data.success)
                    console.log("eroare", res.data)
                else {
                    console.log("getStreets", res.data)
                    res.data.adrese.streets.map((strada) => {
                        var item = {
                            label: strada.street,
                            value: strada.id
                        }
                        this.state.strazi.push(item)
                    })
                    this.setState({ loadingStreets: false })
                    // console.log(this.state.strazi)
                }

            })

        api.get('/cart-extra-promo')
            .then(response => {
                if (response.data.free_drinks == true)
                    this.setState({ ofertaSucuri: true });
            })
    }
    componentWillUnmount() {
        // emitter.off('cart-update')
    }
    handleCheckPayment = (checkedId) => {
        this.setState({ checkedIdPayment: checkedId })
    }

    handleCheckboxDeliveryAddress(value) {
        if (value == this.state.checkedIdDelivery) {
            this.setState({ checkedIdDelivery: null })
        } else {
            this.setState({ checkedIdDelivery: value });
        }
    }
    handleCheckboxDelivery(value) {
        if (value) {
            this.setState({ checkedDelivery: false });
            this.setState({ checkedTakeAway: true });
        }
        else {
            this.setState({ checkedDelivery: true });
            this.setState({ checkedTakeAway: false })
        }
    }
    handleCheckboxTakeAway(value) {
        if (value) {
            this.setState({ checkedTakeAway: false });
            this.setState({ checkedDelivery: true });
        }
        else {
            this.setState({ checkedTakeAway: true });
            this.setState({ checkedDelivery: false });
        }
    }
    handleCheckAddresses(checkedId) {
        this.setState({ checkedAddress: checkedId })
    }

    deliveryCheckedForm(param) {
        console.log(this.state.checkedDelivery)
        if (param.checkedDelivery == null) return null;

        if (param.checkedDelivery)
            return (
                <Animatable.View useNativeDriver={true} animation={param.checkedDelivery ? 'bounceInLeft' : 'bounceOutRight'}>


                    {api.oauth.getAuth().user ? null :
                        <>

                            <View style={{ flexDirection: "row", backgroundColor: "black", marginBottom: 10 }}>
                                <TextInput
                                    style={{ paddingLeft: 10, color: '#fff', flex: 1, height: 50 }}
                                    placeholder={"Nume"}
                                    value={this.state.nume}
                                    placeholderTextColor={'#fff'}
                                    onChangeText={(value) => this.setState({ nume: value })}>
                                </TextInput>
                            </View>
                            <View style={{ flexDirection: "row", backgroundColor: "black", marginBottom: 10 }}>
                                <TextInput
                                    style={{ paddingLeft: 10, color: '#fff', flex: 1, height: 50 }}
                                    placeholder={"Prenume"}
                                    value={this.state.prenume}
                                    placeholderTextColor={'#fff'}
                                    onChangeText={(value) => this.setState({ prenume: value })}>
                                </TextInput>
                            </View>
                            <View style={{ flexDirection: "row", backgroundColor: "black", marginBottom: 10 }}>
                                <TextInput
                                    style={{ paddingLeft: 10, color: '#fff', flex: 1, height: 50 }}
                                    placeholder={"Email"}
                                    placeholderTextColor={'#fff'}
                                    value={this.state.email}
                                    onChangeText={(value) => this.setState({ email: value })}>
                                </TextInput>
                            </View>
                            <View style={{ flexDirection: "row", backgroundColor: "black", marginBottom: 10 }}>
                                <TextInput
                                    style={{ paddingLeft: 10, color: '#fff', flex: 1, height: 50 }}
                                    placeholder={"Numar de telefon"}
                                    value={this.state.nrtelefon}
                                    placeholderTextColor={'#fff'}
                                    onChangeText={(value) => this.setState({ nrtelefon: value })}>
                                </TextInput>
                            </View>
                        </>
                    }
                    {this.deliveryAddresses(param)}
                    {this.state.checkedIdDelivery == null &&
                        <>
                            <Text style={[styles.ingredienteText, { marginBottom: 10 }]}>Alta adresa:</Text>
                            {this.state.loadingStreets ? null :
                                <View
                                    style={{
                                        flexDirection: "row", marginBottom: 10,
                                        ...(Platform.OS !== 'android' && {
                                            zIndex: 10
                                        })
                                    }}

                                >
                                    {/* <RNPickerSelect
                                        placeholder={{ label: "Cauta strada...", value: null }}
                                        value={this.state.stradaSelectata}
                                        style={{ color: "white", backgroundColor: "black", height: 50 }}
                                        textInputProps={{ color: "white" }}
                                        useNativeAndroidPickerStyle={false}
                                        onValueChange={value => this.setState({ stradaSelectata: value })}
                                        items={this.state.strazi}
                                    /> */}
                                    <DropDownPicker
                                        placeholder={"Alege strada..."}
                                        searchableStyle={{ color: "white", height: 50 }}
                                        items={this.state.strazi}
                                        style={{ color: "white", backgroundColor: "black", borderColor: "black" }}
                                        arrowColor={{ color: "white" }}
                                        containerStyle={{ width: '100%', height: 50 }}
                                        globalTextStyle={{ color: "white" }}
                                        dropDownMaxHeight={200}
                                        dropDownStyle={{ backgroundColor: "black", borderColor: "grey" }}
                                        onChangeItem={item => { Keyboard.dismiss; console.log(item); this.setState({ stradaSelectata: item.value }) }}
                                        searchable
                                        searchablePlaceholder="Cauta strada..."
                                        searchablePlaceholderTextColor="white"
                                        searchableError={() => <Text>Not Found</Text>}
                                    />
                                </View>
                            }
                            <View style={{ flexDirection: "row", backgroundColor: "black", marginBottom: 10, borderRadius: 5 }}>
                                <TextInput
                                    style={{ paddingLeft: 12, color: '#fff', flex: 1, height: 50 }}
                                    placeholder={"Numarul Strazii"}
                                    placeholderTextColor={'#fff'}
                                    onChangeText={(value) => this.setState({ nrstrada: value })}>
                                </TextInput>
                            </View>

                            <View style={{ flexDirection: "row", backgroundColor: "black", marginBottom: 10, borderRadius: 5 }}>
                                <TextInput
                                    style={{ paddingLeft: 12, color: '#fff', flex: 1, height: 50 }}
                                    placeholder={'Detalii (Bloc, Scara, Etaj, Apartament)'}
                                    value={this.state.detalii}
                                    placeholderTextColor={'#fff'}
                                    onChangeText={(value) => { this.setState({ detalii: value }) }}>
                                </TextInput>
                            </View>

                            <View style={{ flexDirection: "row", backgroundColor: "black", marginBottom: 10, borderRadius: 5 }}>
                                <TextInput
                                    style={{ paddingLeft: 12, color: '#fff', flex: 1, height: 50 }}
                                    placeholder={"Repere"}
                                    value={this.state.repere}
                                    placeholderTextColor={'#fff'}
                                    onChangeText={(value) => this.setState({ repere: value })}>
                                </TextInput>
                            </View>
                        </>}
                </Animatable.View>
            );
    }
    deliveryAddresses(param) {
        if (param.checkedDelivery == null) return null;

        const adrese = param.addressesDelivery;
        console.log('afiseaza adrese')
        return (
            adrese.map(adresa => (
                <Swipeable
                    key={adresa.id}
                    style={{ alignSelf: "flex-end", marginBottom: 10, width: "90%" }}

                    rightButtonWidth={140}
                    children={
                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", backgroundColor: "black", borderRadius: 5, justifyContent: "center" }}>
                            <CircleCheckBox
                                styleCheckboxContainer={{ padding: 10 }}
                                styleLabel={[styles.ingredienteText, { marginLeft: 10 }]}
                                checked={this.state.checkedIdDelivery == adresa.id}
                                onToggle={() => this.handleCheckboxDeliveryAddress(adresa.id)}
                                outerColor={"black"}
                                innerColor={"#FFD101"}
                                innerSize={23}
                                filterColor={"gray"}
                            />
                            <TextInput
                                editable={this.state.editableAddressId == adresa.id && this.state.checkedIdDelivery == adresa.id}
                                value={adresa.strada + ', ' + adresa.numar_strada + ', ' + adresa.detalii + ', ' + adresa.reper}
                                style={{ color: "white", width: "75%", height: 50, lineHeight: 30, marginRight: 10, padding: 0 }}
                                multiline={true}
                            >
                            </TextInput>
                            {/* <RightArrow1 width={14} height={25}></RightArrow1> */}
                        </View>
                    }>
                </Swipeable>
            ))
        )
    }

    showWarningPhoneNumber(param) {
        if (param.warningTelefon == null) return null;

        return (
            <Animatable.View useNativeDriver={true} animation={param.warningTelefon ? 'bounceInLeft' : 'bounceOutRight'} style={[styles.warningMessage, { marginBottom: 10 }]}>
                <View style={[styles.warningMessage, { padding: 20 }]}>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.hideWarningPhoneNumber()}>
                        <Close fill={'white'} width={16} height={16}></Close>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 13, fontFamily: 'Heebo-Regular', marginLeft: 30, color: "white" }}>!!! Atentie, acceptam doar numere din Romania</Text>
                </View>
            </Animatable.View>
        );
    }
    hideWarningPhoneNumber() {
        this.setState({
            warningTelefon: false,
        });
        setTimeout(() => {
            this.setState({
                warningTelefon: null,
            });
        }, 500)
    }
    checkPhoneNumber() {
        if (this.state.inputPhone.toString().substring(0, 2) != "07" || this.state.inputPhone.toString().length < 10) {
            this.setState({ warningTelefon: true })
            this.refInputPhone.current.focus();
        }
        else {
            this.setState({ warningTelefon: null });
        }
    }

    showTakeAwayAdress(param) {
        if (param.checkedTakeAway == null) return null;

        const adrese = param.addressesTakeAway;
        const adresaSelectata = param.checkedAddress;

        if (param.checkedTakeAway)
            return (
                <Animatable.View useNativeDriver={true} animation={param.checkedTakeAway ? 'bounceInLeft' : 'bounceOutRight'}>
                    <View style={{ marginLeft: "9%" }}>
                        <CircleCheckBox
                            styleCheckboxContainer={styles.containerAdresa}
                            styleLabel={{ fontSize: 14, fontFamily: 'Heebo-Regular', color: "white", marginLeft: 10 }}
                            checked={1 == adresaSelectata}
                            onToggle={() => this.handleCheckAddresses(1)}
                            labelPosition={LABEL_POSITION.RIGHT}
                            label={"centru principal"}
                            outerColor={"black"}
                            innerColor={"#FFD101"}
                            innerSize={23}
                            filterColor={"#E3E3E3"}
                        />
                    </View>
                    <View style={{ marginLeft: "9%" }}>
                        <CircleCheckBox
                            styleCheckboxContainer={styles.containerAdresa}
                            styleLabel={{ fontSize: 14, fontFamily: 'Heebo-Regular', color: "white", marginLeft: 10 }}
                            checked={2 == adresaSelectata}
                            onToggle={() => this.handleCheckAddresses(2)}
                            labelPosition={LABEL_POSITION.RIGHT}
                            label={"restaurant"}
                            outerColor={"black"}
                            innerColor={"#FFD101"}
                            innerSize={23}
                            filterColor={"#E3E3E3"}
                        />
                    </View>
                    <View style={{ marginLeft: "9%" }}>
                        <CircleCheckBox
                            styleCheckboxContainer={styles.containerAdresa}
                            styleLabel={{ fontSize: 14, fontFamily: 'Heebo-Regular', color: "white", marginLeft: 10 }}
                            checked={3 == adresaSelectata}
                            onToggle={() => this.handleCheckAddresses(3)}
                            labelPosition={LABEL_POSITION.RIGHT}
                            label={"City Mall"}
                            outerColor={"black"}
                            innerColor={"#FFD101"}
                            innerSize={23}
                            filterColor={"#E3E3E3"}
                        />
                    </View>
                    {api.oauth.getAuth().user ? null :
                        <>

                            <View style={{ flexDirection: "row", backgroundColor: "black", marginBottom: 10 }}>
                                <TextInput
                                    style={{ paddingLeft: 10, color: '#fff', flex: 1, height: 50 }}
                                    placeholder={"Nume"}
                                    value={this.state.nume}
                                    placeholderTextColor={'#fff'}
                                    onChangeText={(value) => this.setState({ nume: value })}>
                                </TextInput>
                            </View>
                            <View style={{ flexDirection: "row", backgroundColor: "black", marginBottom: 10 }}>
                                <TextInput
                                    style={{ paddingLeft: 10, color: '#fff', flex: 1, height: 50 }}
                                    placeholder={"Prenume"}
                                    value={this.state.prenume}
                                    placeholderTextColor={'#fff'}
                                    onChangeText={(value) => this.setState({ prenume: value })}>
                                </TextInput>
                            </View>
                            <View style={{ flexDirection: "row", backgroundColor: "black", marginBottom: 10 }}>
                                <TextInput
                                    style={{ paddingLeft: 10, color: '#fff', flex: 1, height: 50 }}
                                    placeholder={"Email"}
                                    value={this.state.email}
                                    placeholderTextColor={'#fff'}
                                    onChangeText={(value) => this.setState({ email: value })}>
                                </TextInput>
                            </View>
                            <View style={{ flexDirection: "row", backgroundColor: "black", marginBottom: 10 }}>
                                <TextInput
                                    style={{ paddingLeft: 10, color: '#fff', flex: 1, height: 50 }}
                                    placeholder={"Numar de telefon"}
                                    value={this.state.nrtelefon}
                                    placeholderTextColor={'#fff'}
                                    onChangeText={(value) => this.setState({ nrtelefon: value })}>
                                </TextInput>
                            </View>
                        </>
                    }
                </Animatable.View>
            )
    }

    renderOfferComponent(param) {
        if (param.numarProduse == null) return null;

        if (param.numarProduse < 3)
            return (
                <Animatable.View useNativeDriver={true} animation={param.numarProduse < 3 ? 'bounceInLeft' : 'bounceOutRight'}>
                    <View style={{ marginTop: 10, marginBottom: 30, backgroundColor: "black", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                        <View style={{ paddingTop: 20, paddingBottom: 20, flexDirection: "column" }}>
                            <Text style={styles.ingredienteText}>Mai adauga o pizza pentru a beneficia de oferta</Text>
                            <Text style={styles.warningOferta}>3 + 1 Gratis.</Text>
                        </View>
                    </View>
                </Animatable.View>
            )
    }

    renderInformatiiPuncte(param) {
        if (param == null) return null;

        return (
            <>
                <Text style={styles.ingredienteText}>Foloseste punctele:</Text>
                <Text style={[styles.descreireIngrediente, { borderBottomWidth: 0, marginBottom: 0 }]}>* Ai acumulat 25 de puncte, echivalentul a 5 lei. Aceste puncte se pot folosi o singura data si nu sunt transferabile.</Text>

                <MainButton text={'foloseste'}></MainButton>
            </>
        )
    }

    renderMetodePlata(param) {
        if (param == null) return null;

        const { checkboxesPayment, checkedIdPayment } = this.state;
        return (
            <>
                <Text style={[styles.ingredienteText, { marginBottom: 10 }]}>Metoda de plata:</Text>
                <View style={{ marginBottom: 40 }}>
                    {checkboxesPayment.map(checkbox => (
                        <CircleCheckBox
                            styleCheckboxContainer={{ marginBottom: 10 }}
                            styleLabel={{ fontSize: 14, fontFamily: 'Heebo-Regular', color: "white", marginLeft: 10 }}
                            key={checkbox.id}
                            checked={checkbox.id == checkedIdPayment}
                            onToggle={() => this.handleCheckPayment(checkbox.id)}
                            labelPosition={LABEL_POSITION.RIGHT}
                            label={checkbox.text}
                            outerColor={"black"}
                            innerColor={"#FFD101"}
                            innerSize={23}
                            filterColor={"black"}
                        />
                    ))}
                </View>
            </>
        )
    }

    renderDateLivrare(param) {
        if (param == null) return null;

        return (
            <>
                <Text style={[styles.ingredienteText, { marginBottom: 10 }]}>Date de livrare:</Text>
                <View style={{ marginBottom: 10 }}>
                    <CircleCheckBox
                        styleCheckboxContainer={{ marginBottom: 10 }}
                        styleLabel={{ fontSize: 14, fontFamily: 'Heebo-Regular', color: "white", marginLeft: 10 }}
                        checked={this.state.checkedDelivery}
                        onToggle={() => this.handleCheckboxDelivery(this.state.checkedDelivery)}
                        labelPosition={LABEL_POSITION.RIGHT}
                        label={"Delivery"}
                        outerColor={"black"}
                        innerColor={"#FFD101"}
                        innerSize={23}
                        filterColor={"black"}
                    />
                </View>

                {this.deliveryCheckedForm(this.state)}

                {/* <CircleCheckBox
                    styleCheckboxContainer={{ marginBottom: 10 }}
                    styleLabel={{ fontSize: 14, fontFamily: 'Heebo-Regular', color: "white", marginLeft: 10 }}
                    checked={this.state.checkedTakeAway}
                    onToggle={() => this.handleCheckboxTakeAway(this.state.checkedTakeAway)}
                    labelPosition={LABEL_POSITION.RIGHT}
                    label={"Take away"}
                    outerColor={"black"}
                    innerColor={"#FFD101"}
                    innerSize={23}
                    filterColor={"black"}
                /> */}

                {/* <View style={{ height: this.state.heightAddresses }}>
                    {this.showTakeAwayAdress(this.state)}
                </View> */}
            </>
        )
    }

    deleteDeliveryAddress() {
        if (this.state.addressToDelete != null) {
            const copieAdrese = this.state.addressesDelivery;
            copieAdrese.splice(copieAdrese.indexOf(this.state.addressToDelete), 1);
            this.setState({ addressesDelivery: copieAdrese });
        }

        if (this.state.addressesDelivery.length) {
            const adresa = this.state.addressesDelivery[0].id;
            this.setState({ checkedIdDelivery: adresa });
        }
    }

    detaliiComanda() {
        return (
            <View style={styles.containerDetaliiComanda}>

                <View style={[styles.deliveryInfo, { paddingBottom: 10, paddingTop: 10 }]}>
                    <Text style={styles.deliveryInfo}>Sub-total:</Text>
                    <Text style={[styles.deliveryInfo, { opacity: 1 }]}>65.00 lei</Text>
                </View>

                <View style={[styles.deliveryInfo, { paddingBottom: 30 }]}>
                    <Text style={styles.deliveryInfo}>Discount puncte:</Text>
                    <Text style={[styles.deliveryInfo, { opacity: 1 }]}>0.00 lei</Text>
                </View>

                <View style={[styles.deliveryInfo, { paddingBottom: 10, paddingTop: 30, alignItems: "center", opacity: 1 }]}>
                    <Text style={styles.cosTotal}>Total {this.state.numarProduse} produse</Text>
                    <Text style={styles.cosTotalValoare}>{this.state.pret} <Text style={styles.cosTotalLei}>lei</Text></Text>
                </View>

                <SendButton onPress={() => this.setState({ comandaFinalizata: true })} sageata={75} width="100%" text={'trimite comanda'}></SendButton>
            </View>
        )
    }
    finalizareComanda() {

        // return this.props.navigation.navigate("PaymentWebView", {url: "google.com"})
        if (!Array.isArray(cart.data.items) || !cart.data.items.length)
            return showMessage({ type: 'danger', message: "Cosul este gol" })
        var custom
        var nrstrada
        var detalii
        var repere
        var strada
        var livrare
        var adresa
        var voucher = null
        var mesaj = this.state.mesaj;

        if (this.state.checkedDelivery == true) {
            livrare = true
            if (this.state.checkedIdDelivery == null) {
                custom = true
                nrstrada = this.state.nrstrada
                detalii = this.state.detalii
                repere = this.state.repere
                strada = this.state.stradaSelectata
            } else {
                custom = false
                adresa = this.state.checkedIdDelivery
            }
        } else {
            custom = false
            livrare = false
            adresa = this.state.checkedAddress
        }

        var metodaPlata = this.state.checkedIdPayment
        var puncte_folosite = false

        let params = {
            custom: custom,
            adresa: adresa,
            metodaPlata: metodaPlata,
            puncte_folosite: puncte_folosite,
            nrstrada: nrstrada,
            detalii: detalii,
            repere: repere,
            strada: strada,
            livrare: livrare,
            voucher: voucher,
            mesaj: mesaj,
            id_cont: api.oauth.getAuth().user.id,
            cart: JSON.stringify(cart.data),
        }

        if (this.state.ofertaSucuri) {
            params.oferta_bautura_1 = this.state.suc1,
                params.oferta_bautura_2 = this.state.suc2
        }

        api.post('/trimite_comanda', params)
            .then(res => {
                if (!res.data.success) {
                    console.log("eroare", res.data)

                    if (res.data.error_all) {
                        Object.keys(res.data.error_all).forEach(function (key, index) {
                            if (key == 'metodaPlata')
                                showMessage({ type: 'danger', message: "Alege o metoda de plata" })
                            if (key == 'adresa')
                                showMessage({ type: 'danger', message: "Selecteaza o adresa" })
                            showMessage({ type: 'danger', message: "Campul " + key + " este obligatoriu" })
                        });
                    } else {
                        showMessage({ type: 'danger', message: res.data.msg })
                    }
                } else {
                    if (res.data.id_comanda) {
                        console.log("trimite_comanda", res.data)
                        this.state.comandaFinalizata = true
                        cart.empty()
                        this.setState({ comandaFinalizata: true })
                    } else {
                        console.log(res.data.formular_url)
                        this.props.navigation.navigate("PaymentWebView", { url: res.data.formular_url })
                    }

                }

            })
    }

    finalizareComanda_fara_cont() {

        // return this.props.navigation.navigate("PaymentWebView", {url: "google.com"})
        if (!Array.isArray(cart.data.items) || !cart.data.items.length)
            return showMessage({ type: 'danger', message: "Cosul este gol" })
        var nrstrada
        var detalii
        var repere
        var strada
        var livrare
        var adresa = []
        var nume
        var prenume
        var nrtelefon
        var email
        var mesaj = this.state.mesaj;

        if (this.state.checkedDelivery == true) {
            livrare = true
            nume = this.state.nume
            prenume = this.state.prenume
            nrtelefon = this.state.nrtelefon
            email = this.state.email
            strada = this.state.stradaSelectata
            nrstrada = this.state.nrstrada
            detalii = this.state.detalii
            repere = this.state.repere
            adresa['strada'] = this.state.stradaSelectata
            adresa['nrstrada'] = this.state.nrstrada
            adresa['detalii'] = this.state.detalii
            adresa['repere'] = this.state.repere

        } else {
            livrare = false
            adresa = this.state.checkedAddress
            nume = this.state.nume
            prenume = this.state.prenume
            nrtelefon = this.state.nrtelefon
            email = this.state.email
        }
        var metodaPlata = this.state.checkedIdPayment
        var puncte_folosite = false
        var data = {}
        console.log(data = {
            adresa: adresa,
            nume: nume,
            prenume: prenume,
            telefon: nrtelefon,
            email: email,
            metodaPlata: metodaPlata,
            puncte_folosite: puncte_folosite,
            nrstrada: nrstrada,
            detalii: detalii,
            repere: repere,
            strada: strada,
            livrare: livrare,
            cart: JSON.stringify(cart.data)
        })

        let params = {
            custom: custom,
            adresa: adresa,
            metodaPlata: metodaPlata,
            puncte_folosite: puncte_folosite,
            nrstrada: nrstrada,
            detalii: detalii,
            repere: repere,
            strada: strada,
            livrare: livrare,
            voucher: voucher,
            mesaj: mesaj,
            id_cont: api.oauth.getAuth().user.id,
            cart: JSON.stringify(cart.data),
        }

        if (this.state.ofertaSucuri) {
            params.oferta_bautura_1 = this.state.suc1,
            params.oferta_bautura_2 = this.state.suc2
        }

        api.post('/trimite_comanda_fara_cont', params)
            .then(res => {
                if (!res.data.success) {
                    console.log("eroare", res.data)

                    if (res.data.error_all) {
                        Object.keys(res.data.error_all).forEach(function (key, index) {
                            if (key == 'metodaPlata')
                                showMessage({ type: 'danger', message: "Alege o metoda de plata" })
                            if (key == 'adresa')
                                showMessage({ type: 'danger', message: "Selecteaza o adresa" })
                            showMessage({ type: 'danger', message: "Campul " + key + " este obligatoriu" })
                        });
                    } else {
                        showMessage({ type: 'danger', message: res.data.msg })
                    }
                } else {
                    if (res.data.id_comanda) {
                        console.log("trimite_comanda", res.data)
                        cart.empty()
                        this.setState({ comandaFinalizata: true })
                    } else {
                        console.log(res.data.formular_url)
                        this.props.navigation.navigate("PaymentWebView", { url: res.data.formular_url })
                    }

                }

            })
    }

    comandaFinalizata() {
        return (
            <Animatable.View useNativeDriver={true} animation={this.state.comandaFinalizata ? 'bounceInLeft' : 'bounceOutRight'} style={{ flex: 1, backgroundColor: 'black' }}>
                <View style={{ flex: 1, backgroundColor: 'black' }}>
                    <ModalPreviewComanda ref={this.refModalPreviewComanda} />

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

                        {api.oauth.getAuth().user &&
                            <TouchableOpacity
                                onPress={() => { this.setState({ comandaFinalizata: false }); this.props.navigation.navigate('TabNavigator', { screen: 'Istoric comenzi' }) }}
                                activeOpacity={1} style={[styles.adaugaCos, { width: '100%' }]}>
                                <View style={[styles.adaugaCosLeft, { width: '80%' }]}>
                                    <Text style={styles.adaugaCosText}>Vezi comanda</Text>
                                </View>

                                <BuyFinger width={75} height={75} fill={'black'}></BuyFinger>
                            </TouchableOpacity>}


                    </ScrollView>
                </View>
            </Animatable.View>
        )
    }
    addOrRemoveSos = (item, sos, index) => {
        var produs = item
        let productIndex = null
        if (produs.options.sos) {
            produs.options.sos.map((tItem, tKey) => {
                if (tItem.productId == sos.productId) {
                    productIndex = tKey
                }
            })
            if (productIndex !== null) {
                produs.options.sos.splice(productIndex, 1)
            } else {
                produs.options.sos.push(sos)
            }
        } else {
            var sosvar = []
            sosvar.push(sos)
            produs.options.sos = sosvar

        }
        console.log('add or remove sos list', produs.options.sos)
        console.log('add or remove sos', sos)
        cart.replace(index, item)
    }
    verificaSos(lista, sos) {
        var gasit = false
        lista.map((item) => {
            if (item.productId == sos.productId) {
                gasit = true
            }
        })
        return gasit
    }
    // adaugaSos(item, sos){
    //     var pizza = item
    //     if(pizza.options.sos.length > 0){
    //         pizza.options.sos.map((sosItem)=>{
    //             if(sosItem.id == sos.id){
    //                 sosItem.cantitate = sos.cantitate
    //             }else{
    //                 pizza.options.sos.push(sos)
    //             }
    //         })
    //     }else{
    //         pizza.options.sos = []
    //         pizza.options.sos.push(sos)
    //     }
    //     console.log(pizza)
    // }
    renderProduct(row) {
        var sosuriChunks = _.chunk(this.state.sosuri, 3)
        let item = row.item
        let index = row.index
        let extraPrice = 0
        console.log(item)
        if (item.options.name.includes("PIZZA")) {
            var stringSos = 'Sosuri: '
            var arraySos = []
            var stringRemoved = 'Ingrediente scoase: '
            var arrayRemoved = []
            var stringTopinguri = 'Toppinguri extra: '
            var arrayTopinguri = []
            console.log("sos cos test", item.options.sos)
            if (item.options.sos)
                item.options.sos.map((produs) => {
                    arraySos.push(produs.cantitate + 'x ' + produs.name + ' (' + produs.price + ' lei)')
                    // extraPrice += produs.price*produs.cantitate
                })
            stringSos += arraySos.join(', ')
            if (item.options.removed)
                item.options.removed.map((produs) => {
                    arrayRemoved.push(produs.name)
                })
            stringRemoved += arrayRemoved.join(', ')
            if (item.options.extra)
                item.options.extra.map((produs) => {
                    arrayTopinguri.push(produs.name + ' (' + produs.price + ' lei)')
                    // extraPrice += produs.price
                })
            stringTopinguri += arrayTopinguri.join(', ')
            return (
                <View key={index}>
                    <ModalCantitate
                        ref={this.refModalCantitate}
                        onClickYes={(sos) => { this.addOrRemoveSos(item, sos, index) }}
                        onClickCancel={() => { console.log('ON CLICK CANCEL') }}
                    />
                    <View style={styles.containerProdus}>
                        {/* <Image source={require('../images/pizza.png')} /> */}
                        <View style={styles.produsImagine}><Image style={[styles.imageProdus, { borderRadius: 100 }]} source={{
                            uri: api.img("width:200", item.options.image)
                        }} /></View>
                        <View style={styles.containerInformatiiProdus}>
                            <Text style={styles.cosItemTitle}>{item.name}</Text>
                            {item.options.oferta ?
                                <Text style={styles.cosItemTitle}>Gratuit</Text>
                                : null}

                            {item.options.type == 0 ?
                                <Text style={styles.cosItemDetails}>L (30 cm)</Text>
                                :
                                <Text style={styles.cosItemDetails}>XXL (50 cm)</Text>
                            }
                            {item.options.sos && item.options.sos.length > 0 ?
                                <Text style={styles.cosItemDetails}>{stringSos}</Text>
                                : null}
                            {item.options.removed && item.options.removed.length > 0 ?
                                <Text style={styles.cosItemDetails}>{stringRemoved}</Text>
                                : null}
                            {item.options.extra && item.options.extra.length > 0 ?
                                <Text style={styles.cosItemDetails}>{stringTopinguri}</Text>
                                : null}
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
                        <MainButton style={{ width: '45%', height: 40 }} onPress={() => this.refModalIngrediente.current.toggleModal(item, this.state.extraToppingsPizza, index)} text={'topping'}></MainButton>
                        <MainButton style={{ width: '45%', height: 40 }} onPress={() => this.refModalSosuri.current.toggleModal(item, this.state.sosuri.products, index)} text={'sos'}></MainButton>
                    </View>
                    <View style={[styles.numberProducsContainer, { marginTop: 0 }]}>
                        <View style={styles.piceContainer}>
                            <TouchableOpacity activeOpacity={1} onPress={() => cart.updateCantitate(index, item.qty - 1)} style={styles.countButton}><Text style={styles.countText}>-</Text></TouchableOpacity>
                            <Text style={styles.countText}>{item.qty}</Text>
                            <TouchableOpacity activeOpacity={1} onPress={() => cart.updateCantitate(index, item.qty + 1)} style={styles.countButton}><Text style={styles.countText}>+</Text></TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => cart.updateCantitate(index, 0)}
                            style={{ height: 40, width: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 10, flexShrink: 0 }}
                        >
                            <Trash style={{ width: 40, height: 40, fill: '#808080' }} width={20} height={20} />
                        </TouchableOpacity>
                        <View style={styles.ofertaPretContainer}>
                            {item.options.oferta ?
                                <Text style={[styles.ofertaPret, { fontSize: 31 }]}>{item.qty * item.price}</Text>
                                :
                                <Text style={[styles.ofertaPret, { fontSize: 31 }]}>{item.qty * item.price}</Text>}
                            <Text style={styles.ofertaLei}>lei</Text>
                        </View>
                    </View>

                    <View style={styles.separator}></View>
                </View>
            )
        }
        else if (item.options.name.includes("PASTE")) {
            var stringRemoved = 'Ingrediente scoase: '
            var arrayRemoved = []
            var stringTopinguri = 'Toppinguri extra: '
            var arrayTopinguri = []
            if (item.options.removed)
                item.options.removed.map((produs) => {
                    arrayRemoved.push(produs.name)
                })
            stringRemoved += arrayRemoved.join(', ')
            if (item.options.extra)
                item.options.extra.map((produs) => {
                    arrayTopinguri.push(produs.name + ' (' + produs.price + ' lei)')
                })
            stringTopinguri += arrayTopinguri.join(', ')
            return (
                <View key={index}>
                    <View style={styles.containerProdus}>
                        <View style={styles.produsImagine}><Image style={[styles.imageProdus, { borderRadius: 100 }]} source={{
                            uri: api.img("width:200", item.options.image)
                        }} /></View>

                        <View style={styles.containerInformatiiProdus}>
                            <Text style={styles.cosItemTitle}>{item.name}</Text>
                            {item.options.tipPaste ? (
                                <Text style={styles.cosItemDetails}>Tip de paste: {item.options.tipPaste.name}</Text>
                            ) : null}
                            {item.options.removed && item.options.removed.length > 0 ?
                                <Text style={styles.cosItemDetails}>{stringRemoved}</Text>
                                : null}
                            {item.options.extra && item.options.extra.length > 0 ?
                                <Text style={styles.cosItemDetails}>{stringTopinguri}</Text>
                                : null}
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', width: '45%' }}>
                        <MainButton style={{ flex: 1, height: 40 }} onPress={() => this.refModalIngrediente.current.toggleModal(item, this.state.extraToppingsPaste, index)} text={'topping'}></MainButton>
                    </View>
                    <View style={[styles.numberProducsContainer, { marginTop: 0 }]}>
                        <View style={styles.piceContainer}>
                            <TouchableOpacity activeOpacity={1} onPress={() => cart.updateCantitate(index, item.qty - 1)} style={styles.countButton}><Text style={styles.countText}>-</Text></TouchableOpacity>
                            <Text style={styles.countText}>{item.qty}</Text>
                            <TouchableOpacity activeOpacity={1} onPress={() => cart.updateCantitate(index, item.qty + 1)} style={styles.countButton}><Text style={styles.countText}>+</Text></TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => cart.updateCantitate(index, 0)}
                            style={{ height: 40, width: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 10, flexShrink: 0 }}
                        >
                            <Trash style={{ width: 40, height: 40, fill: '#808080' }} width={20} height={20} />
                        </TouchableOpacity>
                        <View style={styles.ofertaPretContainer}>
                            <Text style={[styles.ofertaPret, { fontSize: 31 }]}>{item.qty * item.price}</Text>
                            <Text style={styles.ofertaLei}>lei</Text>
                        </View>
                    </View>

                    <View style={styles.separator}></View>
                </View>
            )
        }
        else if (item.options.name.includes("SALATA")) {
            var stringRemoved = 'Ingrediente scoase: '
            var arrayRemoved = []
            var stringTopinguri = 'Toppinguri extra: '
            var arrayTopinguri = []
            if (item.options.removed)
                item.options.removed.map((produs) => {
                    arrayRemoved.push(produs.name)
                })
            stringRemoved += arrayRemoved.join(', ')
            if (item.options.extra)
                item.options.extra.map((produs) => {
                    arrayTopinguri.push(produs.name + ' (' + produs.price + ' lei)')
                })
            stringTopinguri += arrayTopinguri.join(', ')
            return (
                <View key={index}>
                    <View style={styles.containerProdus}>
                        <View style={styles.produsImagine}><Image style={[styles.imageProdus, { borderRadius: 100 }]} source={{
                            uri: api.img("width:200", item.options.image)
                        }} /></View>

                        <View style={styles.containerInformatiiProdus}>
                            <Text style={styles.cosItemTitle}>{item.name}</Text>
                            {item.options.dressing && <Text style={styles.cosItemDetails}>Dressing: {item.options.dressing.name}</Text>}
                            {item.options.removed && item.options.removed.length > 0 ?
                                <Text style={styles.cosItemDetails}>{stringRemoved}</Text>
                                :
                                null
                            }
                            {item.options.extra && item.options.extra.length > 0 ?
                                <Text style={styles.cosItemDetails}>{stringTopinguri}</Text>
                                :
                                null
                            }
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
                        <MainButton style={{ width: '45%', height: 40 }} onPress={() => this.refModalIngrediente.current.toggleModal(item, this.state.extraToppingsPizza, index)} text={'topping'}></MainButton>
                        <MainButton style={{ width: '45%', height: 40 }} onPress={() => this.refModalDressing.current.toggleModal(item, index)} text={'+ dressing'}></MainButton>
                    </View>
                    <View style={[styles.numberProducsContainer, { marginTop: 0 }]}>
                        <View style={styles.piceContainer}>
                            <TouchableOpacity activeOpacity={1} onPress={() => cart.updateCantitate(index, item.qty - 1)}><Text style={styles.countText}>-</Text></TouchableOpacity>
                            <Text style={styles.countText}>{item.qty}</Text>
                            <TouchableOpacity activeOpacity={1} onPress={() => cart.updateCantitate(index, item.qty + 1)}><Text style={styles.countText}>+</Text></TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => cart.updateCantitate(index, 0)}
                            style={{ height: 40, width: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 10, flexShrink: 0 }}
                        >
                            <Trash style={{ width: 40, height: 40, fill: '#808080' }} width={20} height={20} />
                        </TouchableOpacity>
                        <View style={styles.ofertaPretContainer}>
                            <Text style={[styles.ofertaPret, { fontSize: 31 }]}>{item.qty * item.price}</Text>
                            <Text style={styles.ofertaLei}>lei</Text>
                        </View>
                    </View>

                    <View style={styles.separator}></View>
                </View>
            )
        }
        else if (item.options.name.includes("SANDWICH")) {
            var stringSos = 'Sosuri: '
            var arraySos = []
            var stringRemoved = 'Ingrediente scoase: '
            var arrayRemoved = []
            var stringTopinguri = 'Toppinguri extra: '
            var arrayTopinguri = []
            if (item.options.removed)
                item.options.removed.map((produs) => {
                    arrayRemoved.push(produs.name)
                })
            stringRemoved += arrayRemoved.join(', ')
            if (item.options.extra)
                item.options.extra.map((produs) => {
                    arrayTopinguri.push(produs.name + ' (' + produs.price + ' lei)')
                })
            stringTopinguri += arrayTopinguri.join(', ')
            if (item.options.sos)
                item.options.sos.map((produs) => {
                    arraySos.push(produs.cantitate + 'x ' + produs.name + ' (' + produs.price + ' lei)')
                })
            stringSos += arraySos.join(', ')
            return (
                <View key={index}>
                    <View style={styles.containerProdus}>
                        <View style={styles.produsImagine}><Image style={[styles.imageProdus, { borderRadius: 100 }]} source={{
                            uri: api.img("width:200", item.options.image)
                        }} /></View>
                        <View style={styles.containerInformatiiProdus}>
                            <Text style={styles.cosItemTitle}>{item.name}</Text>
                            {item.options.removed && item.options.removed.length > 0 ?
                                <Text style={styles.cosItemDetails}>{stringRemoved}</Text>
                                : null}
                            {item.options.extra && item.options.extra.length > 0 ?
                                <Text style={styles.cosItemDetails}>{stringTopinguri}</Text>
                                : null}
                            {item.options.sos && item.options.sos.length > 0 ?
                                <Text style={styles.cosItemDetails}>{stringSos}</Text>
                                : null}
                        </View>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
                        <MainButton style={{ width: '45%', height: 40 }} onPress={() => this.refModalIngrediente.current.toggleModal(item, this.state.extraToppingsPaste, index)} text={'topping'}></MainButton>
                        <MainButton style={{ width: '45%', height: 40 }} onPress={() => this.refModalSosuri.current.toggleModal(item, this.state.sosuri.products, index)} text={'sos'}></MainButton>
                    </View>
                    <View style={[styles.numberProducsContainer, { marginTop: 0 }]}>
                        <View style={styles.piceContainer}>
                            <TouchableOpacity activeOpacity={1} onPress={() => cart.updateCantitate(index, item.qty - 1)}><Text style={styles.countText}>-</Text></TouchableOpacity>
                            <Text style={styles.countText}>{item.qty}</Text>
                            <TouchableOpacity activeOpacity={1} onPress={() => cart.updateCantitate(index, item.qty + 1)}><Text style={styles.countText}>+</Text></TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => cart.updateCantitate(index, 0)}
                            style={{ height: 40, width: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 10, flexShrink: 0 }}
                        >
                            <Trash style={{ width: 40, height: 40, fill: '#808080' }} width={20} height={20} />
                        </TouchableOpacity>
                        <View style={styles.ofertaPretContainer}>
                            <Text style={[styles.ofertaPret, { fontSize: 31 }]}>{item.qty * item.price}</Text>
                            <Text style={styles.ofertaLei}>lei</Text>
                        </View>
                    </View>
                    <View style={styles.separator}></View>
                </View>
            )

        }
        else {
            return (
                <View key={index}>
                    <View style={styles.containerProdus}>
                        <View style={styles.produsImagine}><Image style={[styles.imageProdus, { borderRadius: 100 }]} source={{
                            uri: api.img("width:200", item.options.image)
                        }} /></View>

                        <View style={styles.containerInformatiiProdus}>
                            <Text style={styles.cosItemTitle}>{item.name}</Text>
                        </View>
                    </View>
                    <View style={[styles.numberProducsContainer, { marginTop: 0 }]}>
                        <View style={styles.piceContainer}>
                            <TouchableOpacity activeOpacity={1} onPress={() => cart.updateCantitate(index, item.qty - 1)}><Text style={styles.countText}>-</Text></TouchableOpacity>
                            <Text style={styles.countText}>{item.qty}</Text>
                            <TouchableOpacity activeOpacity={1} onPress={() => cart.updateCantitate(index, item.qty + 1)}><Text style={styles.countText}>+</Text></TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => cart.updateCantitate(index, 0)}
                            style={{ height: 40, width: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 10, flexShrink: 0 }}
                        >
                            <Trash style={{ width: 40, height: 40, fill: '#808080' }} width={20} height={20} />
                        </TouchableOpacity>
                        <View style={styles.ofertaPretContainer}>
                            <Text style={[styles.ofertaPret, { fontSize: 31 }]}>{item.qty * item.price}</Text>
                            <Text style={styles.ofertaLei}>lei</Text>
                        </View>
                    </View>

                    <View style={styles.separator}></View>
                </View>
            )
        }
    }

    renderOfertaSucuri() {
        return (
            <View>
                <View style={{ flex: 1, height: 50, justifyContent: 'center', backgroundColor: 'black', paddingLeft: 5, borderRadius: 5, marginBottom: 15 }}>
                    <RNPickerSelect
                        placeholder={{ label: "Alege prima bautura gratuita", value: null }}
                        value={this.state.suc1}
                        style={{ color: "white", backgroundColor: "black", height: 50 }}
                        textInputProps={{ color: "white" }}
                        useNativeAndroidPickerStyle={false}
                        onValueChange={value => { this.setState({ suc1: value }) }}
                        items={this.sucuri}
                    />
                    <DownArrow style={{ position: 'absolute', right: 10, top: 17 }} />
                </View>
                <View style={{ flex: 1, height: 50, justifyContent: 'center', backgroundColor: 'black', paddingLeft: 5, borderRadius: 5, marginBottom: 5 }}>
                    <RNPickerSelect
                        placeholder={{ label: "Alege a doua bautura gratuita", value: null }}
                        value={this.state.suc2}
                        style={{ color: "white", backgroundColor: "black", height: 50 }}
                        textInputProps={{ color: "white" }}
                        useNativeAndroidPickerStyle={false}
                        onValueChange={value => { this.setState({ suc2: value }) }}
                        items={this.sucuri}
                    />
                    <DownArrow style={{ position: 'absolute', right: 10, top: 17 }} />
                </View>
                <View style={styles.separator}></View>
            </View>
        )
    }

    render() {
        return (
            <>
                <Header navigation={this.props.navigation}></Header>
                {this.state.comandaFinalizata ?
                    this.comandaFinalizata() :
                    cart.data.items?.length > 0 ?
                        <View style={{ flex: 1, backgroundColor: 'black' }}>
                            <ScrollView style={styles.contentScrollView} keyboardShouldPersistTaps="handled">
                                <ModalIngrediente ref={this.refModalIngrediente}></ModalIngrediente>
                                <ModalSosuri ref={this.refModalSosuri}></ModalSosuri>
                                <ModalDressing ref={this.refModalDressing}></ModalDressing>

                                <ModalConfirmare
                                    ref={this.refModalStergereAdresa}
                                    message={'Esti sigur ca vrei sa stergi adresa de livrare?'}
                                    onClickYes={() => this.deleteDeliveryAddress()}
                                />

                                <ModalConfirmare
                                    ref={this.refModalStergereProdus}
                                    message={'Esti sigur ca vrei sa stergi produsul din cos?'}
                                    onClickYes={() => { console.log('STERGE PRODUS COS') }}
                                />

                                <ModalAdaugaAdresa
                                    ref={this.refModalAdaugaAdresa}
                                    onSaveAddress={() => {
                                        const copie = this.state.addressesDelivery;
                                        const adresa = this.refModalAdaugaAdresa.current.getAdresaAdaugata();
                                        const ultimulId = this.state.addressesDelivery[copie.length - 1].id
                                        copie.push({ id: ultimulId + 1, text: adresa.adresa + ', ' + adresa.judet + ', ' + adresa.oras });
                                        this.setState({ addressesDelivery: copie });
                                    }}
                                />

                                <View style={[styles.container, { paddingBottom: 50 }]}>
                                    <FlatList
                                        initialNumToRender={1}
                                        maxToRenderPerBatch={2}
                                        style={{ flex: 1 }}
                                        data={cart.data.items}
                                        renderItem={(item) => this.renderProduct(item)}
                                        ListFooterComponent={this.state.ofertaSucuri ? this.renderOfertaSucuri() : null}
                                    />

                                    {api.oauth.getAuth().user ?
                                        <>
                                            {this.renderMetodePlata(this.state)}

                                            {this.renderDateLivrare(this.state)}
                                            <View style={{ flexDirection: "row", backgroundColor: "black", marginTop: 20, borderRadius: 5, zIndex: -1 }}>
                                                <TextInput
                                                    style={{ paddingLeft: 12, color: '#fff', flex: 1, textAlignVertical: 'top', height: 150 }}
                                                    placeholderTextColor={'#fff'}
                                                    multiline={true}
                                                    numberOfLines={5}
                                                    placeholder={'Mesaj'}
                                                    onChangeText={(text) => this.setState({ mesaj: text })}
                                                    value={this.state.mesaj} />
                                            </View>
                                        </>
                                        :
                                        <>
                                            <Text style={[styles.ingredienteText, { marginBottom: 10 }]}>Pentru a plasa o comanda te rugam sa te inregistrezi.</Text>
                                            <TouchableOpacity
                                                onPress={() => this.props.navigation.navigate('ContNou')}
                                                activeOpacity={1} style={[styles.adaugaCos, { width: '100%' }]}>
                                                <View style={[styles.adaugaCosLeft, { width: '80%' }]}>
                                                    <Text style={styles.adaugaCosText}>{'Inregistrare'}</Text>
                                                </View>

                                                <BuyFinger width={75} height={75} fill={'black'}></BuyFinger>
                                            </TouchableOpacity>
                                        </>}
                                </View>

                                <View style={styles.containerDetaliiComanda}>
                                    {/* <View style={[styles.deliveryInfo, { paddingTop: 30 }]}>
                                <Text style={styles.deliveryInfo}>Transport:</Text>
                                <Text style={[styles.deliveryInfo, { opacity: 1 }]}>{this.state.pretTransport} lei</Text>
                            </View> */}

                                    <View style={[styles.deliveryInfo, { paddingBottom: 10, paddingTop: 10 }]}>
                                        <Text style={styles.deliveryInfo}>Sub-total:</Text>
                                        <Text style={[styles.deliveryInfo, { opacity: 1 }]}>{cart.data.total} lei</Text>
                                    </View>

                                    {/* <View style={[styles.deliveryInfo, { paddingBottom: 30 }]}>
                                <Text style={styles.deliveryInfo}>Discount puncte:</Text>
                                <Text style={[styles.deliveryInfo, { opacity: 1 }]}>0.00 lei</Text>
                            </View> */}

                                    <View style={[styles.deliveryInfo, { paddingBottom: 10, paddingTop: 30, alignItems: "center", opacity: 1 }]}>
                                        <Text style={styles.cosTotal}>Total {cart.data.totalProduse} produse</Text>
                                        <Text style={styles.cosTotalValoare}>{cart.data.total} <Text style={styles.cosTotalLei}>lei</Text></Text>
                                    </View>

                                    {/* <SendButton onPress={() => this.setState({ comandaFinalizata: true })} sageata={75} text={'trimite comanda'} /> */}
                                    {api.oauth.getAuth().user &&
                                        <TouchableOpacity
                                            onPress={() => this.finalizareComanda()}
                                            activeOpacity={1} style={[styles.adaugaCos, { width: '100%' }]}>
                                            <View style={[styles.adaugaCosLeft, { width: '80%' }]}>
                                                <Text style={styles.adaugaCosText}>{'trimite comanda'}</Text>
                                            </View>

                                            <BuyFinger width={75} height={75} fill={'black'}></BuyFinger>
                                        </TouchableOpacity>}
                                </View>

                            </ScrollView>
                        </View>
                        :
                        <View style={{ flex: 1, backgroundColor: '#232323' }}>
                            <View style={styles.container}>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
                                    <Sad width={150} height={150}></Sad>
                                    <Text style={[styles.termsTitle, { marginTop: "8%", marginBottom: "3%" }]}>NE PARE RAU!</Text>
                                    <Text style={[styles.ofertaDescriere, { width: "80%" }]}>Nu ai nici un produs in cos. Alege din Produse tipul de mancare pe care doresti sa o servesti acasa sau la birou.</Text>
                                </View>
                            </View>
                        </View>

                }

                <Footer navigation={this.props.navigation} />
            </>
        )
    }
}