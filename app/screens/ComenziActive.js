import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';

import styles from '../css/commons';

import Progress0 from '../images/progress0.svg';
import Progress1 from '../images/progress1.svg';
import Progress2 from '../images/progress2.svg';
import Progress3 from '../images/progress3.svg';
import ProgressFull from '../images/progressFull.svg';

import Preluat0 from '../images/preluat0.svg';
import Preluat1 from '../images/preluat1.svg';

import SePrepara0 from '../images/sePrepara0.svg';
import SePrepara1 from '../images/sePrepara1.svg';

import SeLivreaza0 from '../images/seLivreaza0.svg';
import SeLivreaza1 from '../images/seLivreaza1.svg';

import Finalizat0 from '../images/finalizat0.svg';
import Finalizat1 from '../images/finalizat1.svg';

import PizzaComanda from '../images/pizzaComanda.svg';
import SalataComanda from '../images/salateComanda.svg';
import Cola from '../images/cola.svg';
import moment from 'moment';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import config from '../config'
export default class ComenziActive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            preluat: false,
            sePrerara: false,
            seLivreaza: false,
            finalizat: true,
            comanda: this.props.route.params.comanda,
            numarProduse: 3,
            pret: 22.50,
            puncteAcumulate: 2,
        }
    }

    progressBar() {
        if (this.state.preluat == null) {
            return (<Progress0 width={30} height={348} fill={'#000'} />)
        }
        if (this.state.preluat) {
            return (<Progress1 width={30} height={348} fill={'#000'} />)
        }
        else if (this.state.sePrerara) {
            return (<Progress2 width={30} height={348} fill={'#000'} />)
        }
        else if (this.state.seLivreaza) {
            return (<Progress3 width={30} height={348} fill={'#000'} />)
        }
        else if (this.state.finalizat) {
            return (<ProgressFull width={30} height={348} fill={'#000'} />)
        }
    }
    progressIcons() {
        if (this.state.preluat == null)
            return (
                <View style={{ flex: 1, justifyContent: 'space-between', marginTop: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Preluat0 />
                        <View style={{ marginLeft: 5 }}>
                            <Text style={styles.textStareComanda}>In curs de preluare</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <SePrepara0 />
                        <View>
                            <Text style={styles.textStareComanda}>Se prepara</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <SeLivreaza0 />
                        <View>
                            <Text style={styles.textStareComanda}>Se livreaza</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Finalizat0 />
                        <View>
                            <Text style={styles.textStareComanda}>Finalizat</Text>
                        </View>
                    </View>
                </View>
            )
        else if (this.state.preluat)
            return (
                <View style={{ flex: 1, justifyContent: 'space-between', marginTop: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Preluat1 />
                        <View style={{ marginLeft: 5 }}>
                            <Text style={styles.textStareComanda}>Preluat</Text>
                            <Text style={styles.procesLivrare}>09:00</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <SePrepara1 />
                        <View>
                            <Text style={styles.textStareComanda}>Se prepara</Text>
                            <Text style={styles.procesLivrare}>In proces</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <SeLivreaza0 />
                        <View>
                            <Text style={styles.textStareComanda}>Se livreaza</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Finalizat0 />
                        <View>
                            <Text style={styles.textStareComanda}>Finalizat</Text>
                        </View>
                    </View>
                </View>
            )
        else if (this.state.sePrerara)
            return (
                <View style={{ flex: 1, justifyContent: 'space-between', marginTop: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Preluat1 />
                        <View style={{ marginLeft: 5 }}>
                            <Text style={styles.textStareComanda}>Preluat</Text>
                            <Text style={styles.procesLivrare}>09:00</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5 }}>
                        <SePrepara1 />
                        <View>
                            <Text style={styles.textStareComanda}>Se prepara</Text>
                            <Text style={styles.procesLivrare}>Preparat</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 5 }}>
                        <SeLivreaza1 />
                        <View>
                            <Text style={styles.textStareComanda}>Se livreaza</Text>
                            <Text style={styles.procesLivrare}>In proces</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 20 }}>
                        <Finalizat0 />
                        <View>
                            <Text style={styles.textStareComanda}>Finalizat</Text>
                        </View>
                    </View>
                </View>
            )
        else if (this.state.seLivreaza)
            return (
                <View style={{ flex: 1, justifyContent: 'space-between', marginTop: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Preluat1 />
                        <View style={{ marginLeft: 5 }}>
                            <Text style={styles.textStareComanda}>Preluat</Text>
                            <Text style={styles.procesLivrare}>09:00</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <SePrepara1 />
                        <View>
                            <Text style={styles.textStareComanda}>Se prepara</Text>
                            <Text style={styles.procesLivrare}>Preparat</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 0 }}>
                        <SeLivreaza1 />
                        <View>
                            <Text style={styles.textStareComanda}>Se livreaza</Text>
                            <Text style={styles.procesLivrare}>Livrat</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 16 }}>
                        <Finalizat0 />
                        <View>
                            <Text style={styles.textStareComanda}>Finalizat</Text>
                            <Text style={styles.procesLivrare}>In curs de finalizare</Text>
                        </View>
                    </View>
                </View>
            )
        else if (this.state.finalizat)
            return (
                <View style={{ flex: 1, justifyContent: 'space-between', marginTop: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Preluat1 />
                        <View style={{ marginLeft: 5 }}>
                            <Text style={styles.textStareComanda}>Preluat</Text>
                            <Text style={styles.procesLivrare}>09:00</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <SePrepara1 />
                        <View>
                            <Text style={styles.textStareComanda}>Se prepara</Text>
                            <Text style={styles.procesLivrare}>Preparat</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <SeLivreaza1 />
                        <View>
                            <Text style={styles.textStareComanda}>Se livreaza</Text>
                            <Text style={styles.procesLivrare}>Livrat</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Finalizat1 />
                        <View>
                            <Text style={styles.textStareComanda}>Finalizat</Text>
                        </View>
                    </View>
                </View>
            )
    }

    render() {
        var nrProduse = 0
        return (
            <>
                <Header navigation={this.props.navigation}></Header>
                <View style={[styles.container, { paddingBottom: 70 }]}>
                    <ScrollView>
                        {/* <View style={{ backgroundColor: '#000', marginBottom: 40 }}>
                        <Text style={styles.oraLivrare}>Ora estimata de livrare:</Text>
                        <Text style={[styles.oraLivrare, { color: '#ffd101' }]}>09:30 AM</Text>

                        <View style={{ width: '100%', height: 200, padding: 0 }}>
                            <Image style={styles.fullWidth} source={require('../images/map.png')} />
                        </View>

                        <View style={{ flex: 1, paddingLeft: 25, paddingTop: 30, paddingBottom: 30 }}>
                            <View style={{ flexDirection: 'row' }}>
                                {this.progressBar()}

                                <View style={{ flexDirection: 'column', marginLeft: 25 }}>
                                    {this.progressIcons()}
                                </View>
                            </View>
                        </View>
                    </View> */}

                        <View style={{ backgroundColor: '#000', borderRadius: 5 }}>
                            <View style={styles.center}>
                                <Text style={[styles.oferteTitle, { marginTop: '5%', marginBottom: 0 }]}>comanda: {this.state.comanda?.api_id}</Text>
                                <Text style={[styles.mesajModal, { marginBottom: 10 }]}>{moment(this.state.comanda?.created_at).format('DD.MM.YYYY')}</Text>

                                {this.state.comanda.produse.map((item, index) => {
                                    const options = JSON.parse(item.options)
                                    nrProduse += parseInt(item.cantitate)

                                    console.log(options)
                                        if(options.imageProdus) options.image = options.imageProdus
                                        return (
                                        
                                            <View style={[styles.produsPreviewComanda, { borderBottomWidth: index < this.state.comanda.produse.length - 1 ? 0.3 : 0, borderBottomColor: '#878787', marginBottom: '3%' }]}>
                                                <View style={{ marginBottom: '5%', }}>
                                                    {options.image != null && options.image.indexOf('http') === -1 ?
                                                        <Image style={{ width: 100, height: 100 }} source={{ uri: config.storage_url + options.image }} /> :
                                                        <Image style={{ width: 100, height: 100 }} source={{ uri: options.image }} />}
                                                </View>

                                                <View style={{ flexDirection: 'column', width: '80%', marginLeft: '10%' }}>
                                                    <Text style={[styles.produsComanda, { fontSize: 16 }]}>{item.nume}</Text>
                                                    {item.nume.includes('PIZZA') &&
                                                        <>
                                                            <Text style={[styles.descriereProdusComanda, { fontSize: 12 }]}>{options.type == 0 ? <>L(30 cm)</> : <>XXL(50 cm)</>}</Text>
                                                            
                                                            {/* {options.sos &&
                                                                <Text style={styles.descriereProdusComanda}>Sos extra:
                                                                {options.sos.map((sos) => {
                                                                    return (
                                                                        " " + sos.cantitate + "x " + sos.name + " " + sos.price + " lei,"
                                                                    )
                                                                })}
                                                                </Text>} */}
                                                        </>
                                                    }
                                                    {item.nume.includes('PASTE') &&
                                                        <>
                                                            <Text style={styles.descriereProdusComanda}>Tipul de paste: {options.optionals.name}</Text>
                                                        </>
                                                    }
                                                    {item.nume.includes('SALATA') &&
                                                        <>
                                                            {options.dressing && <Text style={styles.descriereProdusComanda}>Dressing: {options.dressing.name}</Text>}
                                                        </>
                                                    }
                                                    {options.extra && options.extra.length > 0 &&
                                                        <Text style={styles.descriereProdusComanda}>Topping extra:
                                                            {options.extra.map((extra) => {
                                                            console.log(extra)
                                                            if (options.type == 1)
                                                                return (
                                                                    " " + extra.name + " " + extra.price * 3 + " lei,"
                                                                )
                                                            else
                                                                return (
                                                                    " " + extra.name + " " + extra.price + " lei,"
                                                                )
                                                        })}
                                                        </Text>}
                                                    {options.removed && options.removed.length > 0 &&
                                                        <Text style={styles.descriereProdusComanda}>Ingrediente scoase:
                                                            {options.removed.map((removed) => {
                                                            return (
                                                                " " + removed.name + ","
                                                            )
                                                        })}
                                                        </Text>}
                                                    <Text style={[styles.cantitateComanda]}>x{item.cantitate} {item.total} lei</Text>
                                                </View>
                                            </View>
                                        )
                                })}
                            </View>
                        </View>

                        <View style={[styles.containerDetaliiComanda, { paddingBottom: 0, backgroundColor: '#232323' }]}>
                            <View style={{ width: '90%', alignSelf: 'center' }}>
                                {/* <View style={[styles.deliveryInfo, { paddingTop: 20, opacity: 1 }]}>
                                <Text style={[styles.deliveryInfo, { opacity: 1 }]}>Transport:</Text>
                                <Text style={[styles.deliveryInfo, { opacity: 1 }]}>5.00 lei</Text>
                            </View> */}

                                <View style={[styles.deliveryInfo, { paddingBottom: 5, paddingTop: 5, opacity: 1 }]}>
                                    <Text style={[styles.deliveryInfo, { opacity: 1 }]}>Sub-total:</Text>
                                    <Text style={[styles.deliveryInfo, { opacity: 1 }]}>{this.state.comanda?.sub_total} lei</Text>
                                </View>

                                {/* <View style={[styles.deliveryInfo, { opacity: 1, paddingBottom: 30 }]}>
                                <Text style={[styles.deliveryInfo, , { opacity: 1 }]}>Discount puncte:</Text>
                                <Text style={[styles.deliveryInfo, { opacity: 1 }]}>0.00 lei</Text>
                            </View> */}

                                {/* <Text style={[styles.puncteModalComanda, { color: '#ffd101', marginBottom: 0 }]}>Puncte acumulate: {this.state.puncteAcumulate}</Text> */}

                                <View style={[styles.deliveryInfo, { alignItems: "center", opacity: 1, padding: 0, margin: 0 }]}>
                                    <Text style={[styles.totalModalComanda, { color: '#ffd101' }]}>Total: {nrProduse} produse</Text>
                                    <Text style={[styles.totalModalComanda, { color: '#ffd101', fontSize: 34 }]}>{this.state.comanda.total} <Text style={[styles.cosTotalLei, { color: '#ffd101' }]}>lei</Text></Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <Footer navigation={this.props.navigation} />
            </>
        )
    }
}