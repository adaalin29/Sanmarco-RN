import React, { Component, createRef } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';
import styles from '../css/commons';
import * as Animatable from 'react-native-animatable';

import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox';
import Swipeable from 'react-native-swipeable';

import Ingredient from '../components/Ingredient';
import Sos from '../components/Sos_topping';
import { MainButton } from '../components/MainButton';
import { SendButton } from '../components/SendButton';
import ModalIngrediente from './Modals/ModalIngrediente';
import ModalConfirmare from './Modals/ModalConfirmare';
import ModalAdaugaAdresa from './Modals/ModalAdaugaAdresa';
import ModalPreviewComanda from './Modals/ModalPreviewComanda';
import ModalCantitate from './Modals/ModalCantitate';
import Oferta from '../components/Oferta3+1';

import NextArrow from "../images/nextArrow.svg";
import PrevArrow from "../images/prevArrow.svg";
import RightArrow1 from "../images/rightArrow1.svg";
import Close from '../images/close.svg';
import Xsvg from '../images/x.svg';
import Sad from '../images/sad.svg';
import ComandaReady from '../images/comandaReady.svg';
import Puncte from '../images/puncte.svg';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { showMessage } from 'react-native-flash-message';

export default class Cos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numarProduse: 4,
            pret: 22.50,
            pretBaza: 22.50,

            sosuri: [
                { id: 0, name: 'tomato', text: 'Dulce', cantitate: 0 },
                { id: 1, name: 'chili', text: 'Iute', cantitate: 0 },
                { id: 2, name: 'aurora', text: 'Aurora', cantitate: 0 },
                { id: 3, name: 'barbeque', text: 'Barbeque', cantitate: 0 },
                { id: 4, name: 'mayo', text: 'Maioneza', cantitate: 0 }
            ],

            checkedIdPayment: "numerar",
            checkboxesPayment: [{ id: "numerar", text: "Numerar" }, { id: "cardLivrare", text: "Plata cu cardul la livrare" }, { id: 'online', text: 'Plata online' }],

            checkedDelivery: true,
            checkedTakeAway: false,

            checkedAddress: 0,
            addressesTakeAway: [
                { id: 0, text: "I. C. Bratianu nr. 48, Constanta" },
                { id: 1, text: "A. Lapusneanu nr. 116 C, City Mall, Constanta" }
            ],

            checkedIdDelivery: 0,
            editableAddressId: null,
            addressToDelete: null,
            addressesDelivery: [
                { id: 0, text: "B-dul Mamaia nr. 1, bl. 1A, sc. A, et. 2, ap. 3" },
                { id: 1, text: "B-dul Mamaia nr. 2, bl. 2A, sc. A, et. 3, ap. 5" }
            ],

            inputName: "",
            inputAdress: "",
            inputPhone: "",
            inputEmail: "",
            warningTelefon: null,

            ofertaVizibil: true,

            showModalDeleteAddress: false,

            comandaFinalizata: false,
        }
        this.refInputPhone = createRef();
        this.refModalIngrediente = createRef();
        this.refModalStergereAdresa = createRef();
        this.refModalStergereProdus = createRef();
        this.refModalAdaugaAdresa = createRef();
        this.refModalPreviewComanda = createRef();
        this.refModalCantitate = createRef();
        this.refSos = [];
    }

    crestePret() {
        this.setState({
            numarProduse: this.state.numarProduse + 1,
            pret: this.state.pret + this.state.pretBaza,
        });
    }
    scadePret() {
        this.setState({
            numarProduse: this.state.numarProduse - 1,
            pret: this.state.pret - this.state.pretBaza,
        });
    }

    handleCheckPayment = (checkedId) => {
        this.setState({ checkedIdPayment: checkedId })
    }

    handleCheckboxDeliveryAddress(value) {
        this.setState({ checkedIdDelivery: value });
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
        if (param.checkedDelivery == null) return null;

        if (param.checkedDelivery)
            return (
                <Animatable.View useNativeDriver={true} animation={param.checkedDelivery ? 'bounceInLeft' : 'bounceOutRight'}>
                    <View style={{ flexDirection: "row", backgroundColor: "black", marginBottom: 10 }}>
                        <TextInput
                            style={{ paddingLeft: 10, color: '#fff', flex: 1 }}
                            placeholder={"Nume"}
                            placeholderTextColor={"rgba(100, 100, 100, 50)"}
                            onChangeText={(value) => this.setState({ inputName: value })}>
                        </TextInput>
                    </View>

                    <View style={{ flexDirection: "row", backgroundColor: "black", marginBottom: 10 }}>
                        <TextInput
                            style={{ paddingLeft: 10, color: '#fff', flex: 1 }}
                            placeholder={"Adresa"}
                            placeholderTextColor={"rgba(100, 100, 100, 50)"}
                            onChangeText={(value) => this.setState({ inputAdress: value })}>
                        </TextInput>
                    </View>

                    <View style={{ flexDirection: "row", backgroundColor: "black", marginBottom: 10 }}>
                        <TextInput
                            ref={this.refInputPhone}
                            style={{ paddingLeft: 10, color: '#fff', flex: 1 }}
                            placeholder={'Numar telefon'}
                            placeholderTextColor={"rgba(100, 100, 100, 50)"}
                            keyboardType={"number-pad"}
                            maxLength={10}
                            onChangeText={text => { this.setState({ inputPhone: text }) }}
                            onEndEditing={() => this.checkPhoneNumber()}>
                        </TextInput>
                    </View>

                    {this.showWarningPhoneNumber(this.state)}

                    <View style={{ flexDirection: "row", backgroundColor: "black", marginBottom: 10 }}>
                        <TextInput
                            style={{ paddingLeft: 10, color: '#fff', flex: 1 }}
                            placeholder={"Email"}
                            placeholderTextColor={"rgba(100, 100, 100, 50)"}
                            onChangeText={(value) => this.setState({ inputEmail: value })}>
                        </TextInput>
                    </View>

                    <View style={{ flexDirection: "row", backgroundColor: "black", marginBottom: 20 }}>
                        <TextInput
                            numberOfLines={4}
                            style={{ paddingLeft: 10, color: '#fff', flex: 1 }}
                            placeholder={"Mesaj"}
                            placeholderTextColor={"rgba(100, 100, 100, 50)"}
                            onChangeText={(value) => this.setState({ inputEmail: value })}>
                        </TextInput>
                    </View>

                    {this.deliveryAddresses(param)}

                    <MainButton onPress={() => { this.refModalAdaugaAdresa.current.toggleModal() }} text={'adauga adresa'}></MainButton>
                </Animatable.View>
            );
    }
    deliveryAddresses(param) {
        if (param.checkedDelivery == null) return null;

        const adrese = param.addressesDelivery;

        return (
            adrese.map(adresa => (
                <Swipeable
                    key={adresa.id}
                    style={{ alignSelf: "flex-end", marginBottom: 10, width: "90%" }}
                    rightButtons={[
                        <TouchableOpacity activeOpacity = {1}  style={[styles.leftSwipeItem, { marginLeft: 50 }]} onPress={() => { this.setState({ editableAddressId: adresa.id, checkedIdDelivery: adresa.id }) }}>
                            <Text style={[styles.btnEdit]}>EDITEAZA</Text>
                        </TouchableOpacity>,
                        <TouchableOpacity activeOpacity = {1} 
                            style={[styles.rightSwipeItem, { marginLeft: 20 }]}
                            onPress={() => { this.refModalStergereAdresa.current.toggleModal(); this.setState({ addressToDelete: adresa }) }}>

                            <Xsvg width={21} height={21}></Xsvg>
                        </TouchableOpacity>
                    ]}
                    rightButtonWidth={140}
                    children={
                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", backgroundColor: "black" }}>
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
                                value={adresa.text}
                                style={{ color: "white", width: "75%", marginRight: 10 }}
                                multiline={true}
                                onChangeText={text => {
                                    const copie = this.state.addressesDelivery;
                                    copie[adresa.id].text = text;
                                    this.setState({ addressesDelivery: copie });
                                }}>
                            </TextInput>
                            <RightArrow1 width={14} height={25}></RightArrow1>
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
                    <TouchableOpacity activeOpacity = {1}  onPress={() => this.hideWarningPhoneNumber()}>
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
                adrese.map(adresa => (
                    <Animatable.View useNativeDriver={true} animation={param.checkedTakeAway ? 'bounceInLeft' : 'bounceOutRight'}>
                        <View style={{ marginLeft: "9%" }}>
                            <CircleCheckBox
                                key={adresa.id}
                                styleCheckboxContainer={styles.containerAdresa}
                                styleLabel={{ fontSize: 14, fontFamily: 'Heebo-Regular', color: "white", marginLeft: 10 }}
                                checked={adresa.id == adresaSelectata}
                                onToggle={() => this.handleCheckAddresses(adresa.id)}
                                labelPosition={LABEL_POSITION.RIGHT}
                                label={adresa.text}
                                outerColor={"black"}
                                innerColor={"#FFD101"}
                                innerSize={23}
                                filterColor={"#E3E3E3"}
                            />
                        </View>
                    </Animatable.View>
                ))
            )
    }

    renderProdusComponent(param) {
        if (param == null) return null;

        const sosuriComponents = param.sosuri.map(
            sos =>
                <Sos
                    ref={ref => this.refSos[sos.id] = ref}
                    onPress={() => { this.refModalCantitate.current.toggleModal(); this.sosSelectat = this.refSos[sos.id] }}
                    key={sos.id}
                    name={sos.name}
                    text={sos.text}>
                </Sos>
        );

        return (
            <>
                <ModalCantitate
                    ref={this.refModalCantitate}
                    onClickYes={() => { console.log('ON CLICK YES', 'sosulet: ', this.sosulet, 'refSos: ', this.refSos); }}
                    onClickCancel={() => { console.log('ON CLICK CANCEL') }}
                />

                <View style={styles.containerProdus}>
                    <Image source={require('../images/pizza.png')} />

                    <View style={styles.containerInformatiiProdus}>
                        <Text style={styles.cosItemTitle}>Pizza Rustica</Text>
                        <Text style={styles.cosItemDetails}>L (30 cm) | Sos: Dulce</Text>
                        <Text style={styles.cosItemDetails}>Topping: Mozzarella (3 lei), Ciuperci (2.5 lei),</Text>
                        <Text style={styles.cosItemDetails}>Bacon (2.5 lei), Ardei (2.5 lei), Rosii (2 lei)</Text>
                    </View>
                </View>

                <Text style={[styles.ingredienteText, { marginTop: 20 }]}>Adauga sos:</Text>

                <View style={styles.swiperSosuriContainer}>
                    <Swiper style={styles.wrapper}
                        showsButtons={true}
                        loop={true}
                        nextButton={<NextArrow width={11} height={20}></NextArrow>}
                        prevButton={<PrevArrow width={11} height={20}></PrevArrow>}
                        showsPagination={false}>
                        <View style={styles.containerSlide1}>
                            {sosuriComponents.slice(0, 3)}
                        </View>
                        <View style={styles.containerSlide1}>
                            {sosuriComponents.slice(3, 5)}
                        </View>
                    </Swiper>
                </View>

                <View style={styles.containerIngrediente}>
                    <Ingredient text="2x Dulce"></Ingredient>
                    <Ingredient text="Picant"></Ingredient>
                </View>

                <MainButton onPress={() => this.refModalIngrediente.current.toggleModal()} text={'adauga topping'} ></MainButton>

                <View style={[styles.numberProducsContainer, { marginTop: 0 }]}>
                    <View style={styles.piceContainer}>
                        <TouchableOpacity activeOpacity = {1}  onPress={() => this.scadePret()} style={styles.countButton}><Text style={styles.countText}>-</Text></TouchableOpacity>
                        <Text style={styles.countText}>{param.numarProduse}</Text>
                        <TouchableOpacity activeOpacity = {1}  onPress={() => this.crestePret()} style={styles.countButton}><Text style={styles.countText}>+</Text></TouchableOpacity>
                    </View>
                    <View style={styles.ofertaPretContainer}>
                        <Text style={[styles.ofertaPret, { fontSize: 31 }]}>{param.pret}</Text>
                        <Text style={styles.ofertaLei}>lei</Text>
                    </View>
                </View>

                <View style={styles.separator}></View>
            </>
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

                <CircleCheckBox
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
                />

                <View style={{ height: this.state.heightAddresses }}>
                    {this.showTakeAwayAdress(this.state)}
                </View>
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
                <View style={[styles.deliveryInfo, { paddingTop: 30 }]}>
                    <Text style={styles.deliveryInfo}>Transport:</Text>
                    <Text style={[styles.deliveryInfo, { opacity: 1 }]}>5.00 lei</Text>
                </View>

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

                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%', marginBottom: '10%' }}>
                            <Puncte width={54} height={54}></Puncte>
                            <Text style={[styles.textComandaFinalizata, { paddingLeft: '10%', flexWrap: 'wrap', width: '80%' }]}>Pentru aceasta comanda ai adunat 2 puncte. </Text>
                        </View>

                        <View style={{ width: '80%', paddingBottom: 70 }}>
                            <SendButton onPress={() => this.refModalPreviewComanda.current.toggleModal()} sageata={65} text={'vezi comanda'}></SendButton>
                        </View>

                    </ScrollView>
                </View>
            </Animatable.View>
        )
    }

    main() {
        return (
            this.state.numarProduse ?
                <View style={{ flex: 1, backgroundColor: 'black' }}>
                    <ScrollView style={styles.contentScrollView}>
                        <ModalIngrediente ref={this.refModalIngrediente}></ModalIngrediente>

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
                            {this.renderProdusComponent(this.state)}

                            {this.renderProdusComponent(this.state)}

                            {this.renderProdusComponent(this.state)}

                            {this.renderOfferComponent(this.state)}

                            {this.renderInformatiiPuncte(this.state)}

                            {this.renderMetodePlata(this.state)}

                            {this.renderDateLivrare(this.state)}
                        </View>

                        <View style={styles.containerDetaliiComanda}>
                            <View style={[styles.deliveryInfo, { paddingTop: 30 }]}>
                                <Text style={styles.deliveryInfo}>Transport:</Text>
                                <Text style={[styles.deliveryInfo, { opacity: 1 }]}>5.00 lei</Text>
                            </View>

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

                            <SendButton onPress={() => this.setState({ comandaFinalizata: true })} sageata={75} text={'trimite comanda'} />
                        </View>
                    </ScrollView>
                </View>
                :
                <>
                    <View style={{ flex: 1, backgroundColor: '#232323' }}>
                        <Oferta title={'NU UITA DE OFERTA PIZZA 3 + 1 GRATIS'} message={'Valabil doar pentru pizza L (30 cm)'} />
                        <View style={styles.container}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
                                <Sad width={150} height={150}></Sad>
                                <Text style={[styles.termsTitle, { marginTop: "8%", marginBottom: "3%" }]}>NE PARE RAU!</Text>
                                <Text style={[styles.ofertaDescriere, { width: "80%" }]}>Nu ai nici un produs in cos. Alege din Produse tipul de mancare pe care doresti sa o servesti acasa sau la birou.</Text>
                            </View>
                        </View>
                    </View>
                </>
        )
    }

    render() {
        return (
            <>
                <Header navigation={this.props.navigation} numarProduse={this.state.numarProduse}></Header>
                {this.state.comandaFinalizata ?
                    this.comandaFinalizata()
                    :
                    this.main()
                }
                <Footer navigation={this.props.navigation} />
            </>
        )
    }
}