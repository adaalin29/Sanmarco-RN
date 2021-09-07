import React, { Component, createRef } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Swiper from 'react-native-swiper';
import styles from '../../css/commons';
import Carousel from 'react-native-snap-carousel';
import Loading from '../Loading'
import { ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox';
import Ingredient from '../../components/Ingredient';
import Sos from '../../components/Sos_topping';
import _ from "lodash"
import api from '../../api';
import { SendButton } from '../../components/SendButton';
import RadioButtonRN from 'radio-buttons-react-native';
// Imagini
import DimensiunePizza from "../../images/dimensiunePizza.svg";
import DimensiunePizzaPressed from "../../images/dimensiunePizzaPressed.svg";
import cart from '../../cart'
import BuyFinger from "../../images/buyFinger.svg";
import { SvgUri } from 'react-native-svg';
import NextArrow from "../../images/nextArrow.svg";
import PrevArrow from "../../images/prevArrow.svg";
import ModalCantitate from '../Modals/ModalCantitate';
import { showMessage } from 'react-native-flash-message';
import Close from '../../images/close.svg';

import CloseIngredient from "../../images/closeIngredient.svg";

const windowWidth = Dimensions.get('window').width;

export default class DetaliuPizza extends Component {
    constructor(props) {
        super(props)
        this.state = {
            numarProduse: 4,
            loading: true,
            totalPriceToppings: 0,
            totalPriceSos: 0,
            smallPizzaPressed: true,
            bigPizzaPressed: false,
            warningTopping: true,
            countProduse: 1,
            toppingComponents: 0,
            removed: [],
            sosuriAdaugate: [],
            topinguriAdaugate: [],
            toateSosurile: [],
            toateTopingurile: [],
            ingredienteCePotFiScoase: [],
            selectedPizza: this.props.route.params.pizza,
        }
        this.refModalCantitate = createRef();
    }
    componentDidMount() {
        this.setState({ selectedPizza: this.props.route.params.pizza })
        this.getPizzaDetails()
    }
    getPizzaDetails() {
        this.setState({ loading: true })
        console.log("selected pizza", this.state.selectedPizza)
        api.get('/getDetaliuPizza', { id: this.state.selectedPizza.productId })
            .then(res => {
                if (!res.data.success)
                    console.log("eroare", res.data)
                else {
                    var ingrediente = []
                    var toppings = []
                    console.log("response", res.data)
                    if (res.data.ingredienteBlocate == null) {
                        ingrediente = this.state.selectedPizza.removableToppings
                    } else {
                        this.state.selectedPizza.removableToppings.map((item) => {
                            if (!res.data.ingredienteBlocate.includes(item.toppingId.toString())) {
                                ingrediente.push(item)
                            }
                        })
                    }
                    if (res.data.toppinguriBlocate == null) {
                        toppings = res.data.extraToppingsPizza
                    } else {
                        res.data.extraToppingsPizza.map((item) => {
                            if (!res.data.toppinguriBlocate.includes(item.productId.toString())) {
                                toppings.push(item)
                            }
                        })
                    }
                    if (this.state.selectedPizza.type == 1)
                        toppings.map((item) => {
                            item.price = item.price * 3
                        })

                    this.setState({ loading: false, toateTopingurile: toppings, toateSosurile: res.data.sosuri, ingredienteCePotFiScoase: ingrediente })
                }

            })
    }
    setPizzaPressed() {
        if (this.state.smallPizzaPressed) {
            this.state.sosuriAdaugate = []
            this.state.topinguriAdaugate = []
            this.state.removed = []
            this.state.totalPriceSos = 0
            this.state.totalPriceToppings = 0
            this.state.bigPizzaPressed = true
            this.state.smallPizzaPressed = false
            this.state.selectedPizza = this.props.route.params.pizzaxxl
        } else if (this.state.bigPizzaPressed) {
            this.state.sosuriAdaugate = []
            this.state.topinguriAdaugate = []
            this.state.removed = []
            this.state.totalPriceSos = 0
            this.state.totalPriceToppings = 0
            this.state.bigPizzaPressed = false
            this.state.smallPizzaPressed = true
            this.state.selectedPizza = this.props.route.params.pizza
        }
        this.getPizzaDetails()
    }
    removeIngredient(ingredient) {
        if (this.state.removed.length < 3)
            this.state.removed.push(ingredient)
        else
            showMessage({ type: 'danger', message: "Poti scoate maxim 3 ingrediente." })
        this.forceUpdate()
        console.log(this.state.removed)
    }
    addOrRemoveSos = (item) => {
        let productIndex = null
        this.state.sosuriAdaugate.map((tItem, tKey) => {
            if (tItem.productId == item.productId) {
                productIndex = tKey
            }
        })
        if (productIndex !== null) {
            this.state.sosuriAdaugate.splice(productIndex, 1)
            this.state.totalPriceSos -= item.price * item.cantitate
        } else {
            this.state.sosuriAdaugate.push(item)
            this.state.totalPriceSos += item.price * item.cantitate
        }
        console.log(this.state.sosuriAdaugate)
        this.forceUpdate()
    }
    addOrRemoveTopping(item) {
        let productIndex = null
        this.state.topinguriAdaugate.map((tItem, tKey) => {
            if (tItem.productId == item.productId) {
                productIndex = tKey
            }
        })
        if (productIndex !== null) {
            this.state.topinguriAdaugate.splice(productIndex, 1)
            this.state.totalPriceToppings -= item.price
        } else {
            if (this.state.topinguriAdaugate.length < 3) {
                this.state.topinguriAdaugate.push(item)
                this.state.totalPriceToppings += item.price
            }
            else {
                showMessage({ type: 'danger', message: "Poti adauga maxim 3 ingrediente." })
            }
        }
        console.log(item, productIndex)
        console.log(this.state.topinguriAdaugate)
        this.forceUpdate()
    }
    showSmallPizza(param) {
        return (
            <TouchableOpacity activeOpacity={1} style={[styles.dimensiunePizza, param.smallPizzaPressed ? { borderColor: '#FFD101' } : { borderColor: '#999999' }]}>
                {param.smallPizzaPressed ? <DimensiunePizzaPressed width={45} height={45}></DimensiunePizzaPressed> : <DimensiunePizza width={45} height={45}></DimensiunePizza>}
                <Text style={[styles.dimensiunePizzaText, param.smallPizzaPressed ? { color: '#FFD101' } : { color: '#999999' }]}>L (30 cm)</Text>
            </TouchableOpacity>
        );
    }
    showBigPizza(param) {
        return (
            <TouchableOpacity activeOpacity={1} style={[styles.dimensiunePizza, param.bigPizzaPressed ? { borderColor: '#FFD101' } : { borderColor: '#999999' }]}>
                {param.bigPizzaPressed ? <DimensiunePizzaPressed width={64} height={64}></DimensiunePizzaPressed> : <DimensiunePizza width={45} height={45}></DimensiunePizza>}
                <Text style={[styles.dimensiunePizzaText, param.bigPizzaPressed ? { color: '#FFD101' } : { color: '#999999' }]}>XXL (50 cm)</Text>
            </TouchableOpacity>
        );
    }
    crestePret() {
        this.setState({
            countProduse: this.state.countProduse + 1,
        });
    }
    scadePret() {
        if (this.state.countProduse > 1)
            this.setState({
                countProduse: this.state.countProduse - 1,
            });
    }
    oferta(param) {
        if (param.warningTopping == null) return null;
        return (
            <Animatable.View useNativeDriver={true} animation={param.warningTopping ? 'slideInDown' : 'slideOutDown'} style={styles.warningMessage}>
                <View style={[styles.warningMessage, { padding: 20 }]}>
                    <TouchableOpacity activeOpacity={1} onPress={() => this.ascundeOferta()}><Close fill={'white'} width={16} height={16}></Close></TouchableOpacity>
                    <Text style={{ fontSize: 13, fontFamily: 'Heebo-Regular', marginLeft: 30, color: "white" }}>!!! Atentie poti adauga maxim 3 extratopping</Text>
                </View>
            </Animatable.View>
        );
    }
    ascundeOferta() {
        this.setState({
            warningTopping: false,
        });
        setTimeout(() => {
            this.setState({
                warningTopping: null,
            });
        }, 500)
    }
    addToCart() {
        var options = _.cloneDeep(this.state.selectedPizza)
        options['removed'] = this.state.removed
        options['sos'] = this.state.sosuriAdaugate
        options['extra'] = this.state.topinguriAdaugate
        options['toppings'] = this.state.toateTopingurile
        var item = {
            id: this.state.selectedPizza.productId,
            name: this.state.selectedPizza.name,
            price: this.state.selectedPizza.price + this.state.totalPriceSos + this.state.totalPriceToppings,
            qty: this.state.countProduse,
            options: options
        }
        cart.addItem(_.cloneDeep(item))
    }
    renderItem = ({item, index}) =>{
        return (
            this.state.sosuriAdaugate.includes(item) ?
                <TouchableOpacity key={index} activeOpacity={1} onPress={() => this.addOrRemoveSos(item)}
                    style={[styles.sosElement, { borderColor: "#ffd101" }]}>
                    <SvgUri
                        width="34"
                        height="38"
                        uri={item.image}
                    />
                    <Text style={[styles.adaugaSosText, { color: "#ffd101", marginTop: 3 }]}>{item.name}</Text>

                    <Text style={[styles.adaugaSosText, { color: "#ffd101" }]}>({item.price} lei)</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity key={index} activeOpacity={1} onPress={() => this.refModalCantitate.current.showModal(item)}
                    style={[styles.sosElement, { borderColor: "#999999" }]}>
                    <SvgUri
                        width="34"
                        height="38"
                        uri={item.image}
                    />
                    <Text style={[styles.adaugaSosText, { color: "#999999", marginTop: 3 }]}>{item.name}</Text>

                    <Text style={[styles.adaugaSosText, { color: "#999999" }]}>({item.price} lei)</Text>
                </TouchableOpacity>
        )
    }
    renderItemToppings = ({item, index}) =>{
        return (
            this.state.topinguriAdaugate.includes(item) ?
                <TouchableOpacity key={index} activeOpacity={1} onPress={() => this.addOrRemoveTopping(item)}
                    style={[styles.sosElement, { borderColor: "#ffd101" }]}>
                    <SvgUri style={{ filter: "#ffd101" }}
                        width="34"
                        height="38"
                        uri={item.image}
                    />
                    <Text style={[styles.adaugaSosText, { color: "#ffd101", marginTop: 3 }]}>{item.name}</Text>

                    <Text style={[styles.adaugaSosText, { color: "#ffd101" }]}>({item.price} lei)</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity key={index} activeOpacity={1} onPress={() => this.addOrRemoveTopping(item)}
                    style={[styles.sosElement, { borderColor: "#999999" }]}>
                    <SvgUri
                        width="34"
                        height="38"
                        uri={item.image}
                    />
                    <Text style={[styles.adaugaSosText, { color: "#999999", marginTop: 3 }]}>{item.name}</Text>

                    <Text style={[styles.adaugaSosText, { color: "#999999" }]}>({item.price} lei)</Text>
                </TouchableOpacity>
        )
    }
    render() {
        var smallPizzaPressedElement = [];
        smallPizzaPressedElement.push(
            <TouchableOpacity activeOpacity={1} onPress={() => this.setPizzaPressed()} style={[styles.dimensiunePizza, this.state.smallPizzaPressed ? { borderColor: '#FFD101' } : { borderColor: '#999999' }]}>
                {this.state.smallPizzaPressed ? <DimensiunePizzaPressed width={45} height={45}></DimensiunePizzaPressed> : <DimensiunePizza width={45} height={45}></DimensiunePizza>}

                <Text style={[styles.dimensiunePizzaText, this.state.smallPizzaPressed ? { color: '#FFD101' } : { color: '#999999' }]}>L (30 cm)</Text>
            </TouchableOpacity>
        )
        var bigPizzaPressedElement = [];
        bigPizzaPressedElement.push(
            <TouchableOpacity activeOpacity={1} onPress={() => this.setPizzaPressed()} style={[styles.dimensiunePizza, this.state.bigPizzaPressed ? { borderColor: '#FFD101' } : { borderColor: '#999999' }]}>
                {this.state.bigPizzaPressed ? <DimensiunePizzaPressed width={64} height={64}></DimensiunePizzaPressed> : <DimensiunePizza width={64} height={64}></DimensiunePizza>}

                <Text style={[styles.dimensiunePizzaText, this.state.bigPizzaPressed ? { color: '#FFD101' } : { color: '#999999' }]}>XXL (50 cm)</Text>
            </TouchableOpacity>
        )

        // const sosuriComponents = this.state.sosuri.map(sos => <Sos key={sos.key} name={sos.name} text={sos.text}></Sos>);
        // const toppingComponents = this.state.toppings.map(sos => <Sos key={sos.key} name={sos.name} text={sos.text}></Sos>);
        var sosuriChunks = _.chunk(this.state.toateSosurile, 3)
        var toppingsChunks = _.chunk(this.state.toateTopingurile, 3)
        if (this.state.loading)
            return (
                <Loading></Loading>
            )
        else
            return (
                <View style={{ width: '100%', height: '100%', backgroundColor: 'black' }}>
                    <Header navigation={this.props.navigation} numarProduse={this.state.numarProduse}></Header>
                    <ModalCantitate
                        ref={this.refModalCantitate}
                        onClickYes={(sos) => { this.addOrRemoveSos(sos) }}
                        onClickCancel={() => { console.log('ON CLICK CANCEL') }}
                    />
                    <View style={[styles.container, { paddingBottom: 70 }]}>
                        <ScrollView style={styles.contentScrollView}>
                            <View style={styles.detaliuPizzaPoza}>
                                <Image style={styles.imageProdus} source={{ uri: api.img("width:400", this.state.selectedPizza.image) }} />
                            </View>
                            <Text style={styles.detaliuProdusTitle}>{this.state.selectedPizza.name}</Text>
                            <Text style={styles.ingredienteText}>Ingrediente:</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap', alignItems: 'center', marginTop: 20, }}>

                                <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start", flexWrap: "wrap" }}>
                                    {this.state.selectedPizza.removableToppings.map((item, key) => {

                                        return (
                                            this.state.ingredienteCePotFiScoase.includes(item) ? null :
                                                <TouchableOpacity key={key} activeOpacity={1} style={styles.igredient}>
                                                    <Text style={styles.ingredientText}>{item.name}</Text>
                                                </TouchableOpacity>
                                        )

                                    })}
                                    {this.state.ingredienteCePotFiScoase.map((item, key) => {
                                        return (
                                            this.state.removed.includes(item) ? null :
                                                <TouchableOpacity key={key} activeOpacity={1} onPress={() => this.removeIngredient(item)} style={styles.igredient}>
                                                    <CloseIngredient width={15} height={15}></CloseIngredient>
                                                    <Text style={styles.ingredientText}>{item.name}</Text>
                                                </TouchableOpacity>
                                        )
                                    })}

                                </View>

                            </View>
                            <Text style={styles.descreireIngrediente}>* Poti elimina maximum 3 ingrediente.</Text>
                            <Text style={styles.ingredienteText}>Alege dimensiunea:</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingBottom: 20, borderBottomWidth: 1, borderColor: '#999999', marginBottom: 20, }}>
                                {smallPizzaPressedElement}
                                {bigPizzaPressedElement}
                            </View>
                            {/* adauga sos scos temporar */}
                            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Text style={styles.ingredienteText}>Adauga sosuri:</Text>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={[styles.ofertaPret, { fontSize: 22 }]}>{this.state.totalPriceSos}</Text>
                                    <Text style={[styles.ofertaLei, { fontSize: 13 }]}>lei</Text>
                                </View>
                            </View>
                            <View style={styles.swiperSosuriContainer}>
                                {/* <Swiper style={styles.wrapper}
                                    showsButtons={true}
                                    loop={true}
                                    nextButton={
                                        <NextArrow width={11} height={20}></NextArrow>
                                    }
                                    prevButton={
                                        <PrevArrow width={11} height={20}></PrevArrow>
                                    }
                                    showsPagination={false}
                                >

                                    {sosuriChunks.map((chunk) => {
                                        return (
                                            <View style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', height: 100, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                                {chunk.map((item) => {
                                                    return (
                                                        this.state.sosuriAdaugate.includes(item) ?
                                                            <TouchableOpacity activeOpacity={1} onPress={() => this.addOrRemoveSos(item)}
                                                                style={[styles.sosElement, { borderColor: "#ffd101" }]}>
                                                                <SvgUri
                                                                    width="34"
                                                                    height="38"
                                                                    uri={item.image}
                                                                />
                                                                <Text style={[styles.adaugaSosText, { color: "#ffd101", marginTop: 3 }]}>{item.name}</Text>

                                                                <Text style={[styles.adaugaSosText, { color: "#ffd101" }]}>({item.price} lei)</Text>
                                                            </TouchableOpacity>
                                                            :
                                                            <TouchableOpacity activeOpacity={1} onPress={() => this.refModalCantitate.current.showModal(item)}
                                                                style={[styles.sosElement, { borderColor: "#999999" }]}>
                                                                <SvgUri
                                                                    width="34"
                                                                    height="38"
                                                                    uri={item.image}
                                                                />
                                                                <Text style={[styles.adaugaSosText, { color: "#999999", marginTop: 3 }]}>{item.name}</Text>

                                                                <Text style={[styles.adaugaSosText, { color: "#999999" }]}>({item.price} lei)</Text>
                                                            </TouchableOpacity>
                                                    )
                                                })}
                                            </View>
                                        )
                                    })}
                                </Swiper> */}
                                <Carousel
                                firstItem={1}
                                enableSnap={false}
                                useScrollView={false}
                                inactiveSlideScale={1}
                                shouldOptimizeUpdates={false}
                                inactiveSlideOpacity={1}
                                layout={'default'}
                                ref={ref => this.carousel = ref}
                                data={this.state.toateSosurile}
                                renderItem={this.renderItem}
                                sliderWidth={windowWidth}
                                itemWidth={100}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap', alignItems: 'center', marginTop: 20, borderBottomColor: '#999999', borderBottomWidth: 1 }}>
                                {this.state.sosuriAdaugate.map((item, key) => {
                                    return (
                                        <TouchableOpacity key={key} activeOpacity={1} onPress={() => this.addOrRemoveSos(item)} style={styles.igredient}>
                                            <CloseIngredient width={15} height={15}></CloseIngredient>
                                            <Text style={styles.ingredientText}>{item.cantitate + 'x ' + item.name}</Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20 }}>
                                <Text style={styles.ingredienteText}>Adauga topping:</Text>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={[styles.ofertaPret, { fontSize: 22 }]}>{this.state.totalPriceToppings}</Text>
                                    <Text style={[styles.ofertaLei, { fontSize: 13 }]}>lei</Text>
                                </View>
                            </View>
                            <View style={styles.swiperSosuriContainer}>
                                {/* <Swiper style={styles.wrapper}
                                    showsButtons={true}
                                    loop={true}
                                    nextButton={
                                        <NextArrow width={11} height={20}></NextArrow>
                                    }
                                    prevButton={
                                        <PrevArrow width={11} height={20}></PrevArrow>
                                    }
                                    showsPagination={false}
                                >
                                    {toppingsChunks.map((chunk) => {
                                        return (
                                            <View style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', height: 90, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                                {chunk.map((item) => {
                                                    return (
                                                        this.state.topinguriAdaugate.includes(item) ?
                                                            <TouchableOpacity activeOpacity={1} onPress={() => this.addOrRemoveTopping(item)}
                                                                style={[styles.sosElement, { borderColor: "#ffd101" }]}>
                                                                <SvgUri style={{ filter: "#ffd101" }}
                                                                    width="34"
                                                                    height="38"
                                                                    uri={item.image}
                                                                />
                                                                <Text style={[styles.adaugaSosText, { color: "#ffd101", marginTop: 3 }]}>{item.name}</Text>

                                                                <Text style={[styles.adaugaSosText, { color: "#ffd101" }]}>({item.price} lei)</Text>
                                                            </TouchableOpacity>
                                                            :
                                                            <TouchableOpacity activeOpacity={1} onPress={() => this.addOrRemoveTopping(item)}
                                                                style={[styles.sosElement, { borderColor: "#999999" }]}>
                                                                <SvgUri
                                                                    width="34"
                                                                    height="38"
                                                                    uri={item.image}
                                                                />
                                                                <Text style={[styles.adaugaSosText, { color: "#999999", marginTop: 3 }]}>{item.name}</Text>

                                                                <Text style={[styles.adaugaSosText, { color: "#999999" }]}>({item.price} lei)</Text>
                                                            </TouchableOpacity>
                                                    )
                                                })}
                                            </View>
                                        )
                                    })}
                                </Swiper> */}
                                <Carousel
                                firstItem={1}
                                enableSnap={false}
                                useScrollView={false}
                                inactiveSlideScale={1}
                                shouldOptimizeUpdates={false}
                                inactiveSlideOpacity={1}
                                layout={'default'}
                                ref={ref => this.carousel = ref}
                                data={this.state.toateTopingurile}
                                renderItem={this.renderItemToppings}
                                sliderWidth={windowWidth}
                                itemWidth={100}
                                />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap', alignItems: 'center', marginTop: 20 }}>
                                {this.state.topinguriAdaugate.map((item, key) => {
                                    return (
                                        <TouchableOpacity key={key} activeOpacity={1} onPress={() => this.addOrRemoveTopping(item)} style={styles.igredient}>
                                            <CloseIngredient width={15} height={15}></CloseIngredient>
                                            <Text style={styles.ingredientText}>{item.name}</Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>



                            <View style={styles.numberProducsContainer}>
                                <View style={styles.piceContainer}>
                                    <TouchableOpacity activeOpacity={1} onPress={() => this.scadePret()} style={styles.countButton} hitSlop={{top:10,left:10,right:10,bottom:10}}><Text style={styles.countText}>-</Text></TouchableOpacity>
                                    <Text style={styles.countText}>{this.state.countProduse}</Text>
                                    <TouchableOpacity activeOpacity={1} onPress={() => this.crestePret()} style={styles.countButton} hitSlop={{top:10,left:10,right:10,bottom:10}}><Text style={styles.countText}>+</Text></TouchableOpacity>
                                </View>
                                <View style={[styles.ofertaPretContainer, {marginLeft:10}]}>
                                    <Text style={[styles.ofertaPret, { fontSize: 31 }]}>{(this.state.selectedPizza.price + this.state.totalPriceSos + this.state.totalPriceToppings) * this.state.countProduse}</Text>
                                    <Text style={styles.ofertaLei}>lei</Text>
                                </View>
                            </View>

                            <TouchableOpacity onPress={() => this.addToCart()} activeOpacity={1} style={[styles.adaugaCos, { width: '100%' }]}>
                                <View style={[styles.adaugaCosLeft, { width: '80%' }]}>
                                    <Text style={styles.adaugaCosText}>Adauga in cos</Text>
                                </View>
                                <BuyFinger width={75} height={75} fill={'black'}></BuyFinger>
                            </TouchableOpacity>

                        </ScrollView>
                    </View>
                    <Footer navigation={this.props.navigation} />
                </View>
            )
    }
}