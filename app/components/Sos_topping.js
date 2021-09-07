import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from '../css/commons';
import { SvgUri } from 'react-native-svg';
import Tomato from '../images/tomato.svg';
import TomatoPressed from '../images/tomatoPressed.svg';

import Chili from "../images/chili.svg";
import ChiliPressed from "../images/chiliPressed.svg";

import Aurora from "../images/aurora.svg";
import AuroraPressed from "../images/auroraPressed.svg";

import Barbeque from "../images/barbeque.svg";
import BarbequePressed from "../images/barbequePressed.svg";

import Mayo from "../images/mayo.svg";
import MayoPressed from "../images/mayoPressed.svg";

import Mozzarella from "../images/mozzarella.svg";
import MozzarellaPressed from "../images/mozzarellaPressed.svg";

import Gorgonzola from "../images/gorgonzola.svg";
import GorgonzolaPressed from "../images/gorgonzolaPressed.svg";

import Bacon from "../images/bacon.svg";
import BaconPressed from "../images/baconPressed.svg";

import Salami from "../images/salami.svg";
import SalamiPressed from "../images/salamiPressed.svg";

import Sunca from '../images/sunca.svg';
import SuncaPressed from '../images/suncaYellow.svg';

import Ciuperci from '../images/ciuperci.svg';
import CiuperciPressed from '../images/ciuperciYellow.svg';

import Porumb from '../images/porumb.svg';
import PorumbPressed from '../images/porumbYellow.svg';

import Ardei from '../images/ardei.svg';
import ArdeiPressed from '../images/ardeiYellow.svg';

import SalamChorizo from '../images/salamChorizo.svg';
import SalamChorizoPressed from '../images/salamChorizoYellow.svg';

import Ceapa from '../images/ceapa.svg';
import CeapaPressed from '../images/ceapaYellow.svg';

import Carnaciori from '../images/carnaciori.svg';
import CarnacioriPressed from '../images/carnacioriYellow.svg';

import Pui from '../images/pui.svg';
import PuiPressed from '../images/puiYellow.svg';

import ArdeiIute from '../images/ardeiIute.svg';
import ArdeiIutePressed from '../images/ardeiIuteYellow.svg';

import Prosciuto from '../images/prosciuto.svg';
import ProsciutoPressed from '../images/prosciutoYellow.svg';

import Masline from '../images/masline.svg';
import MaslinePressed from '../images/maslineYellow.svg';

import Babic from '../images/babic.svg';
import BabicPressed from '../images/babicYellow.svg';

import BranzaFeta from '../images/branzaFeta.svg';
import BranzaFetaPressed from '../images/branzaFetaYellow.svg';

import FileDeAnsoa from '../images/fileDeAnsoa.svg';
import FileDeAnsoaPressed from '../images/fileDeAnsoaYellow.svg';

import FileDeSomon from '../images/fileSomon.svg';
import FileDeSomonPressed from '../images/fileSomonYellow.svg';

import Lamaie from '../images/lamaie.svg';
import LamaiePressed from '../images/lamaieYellow.svg';

import Ou from '../images/ou.svg';
import OuPressed from '../images/ouYellow.svg';

import Parmezan from '../images/parmezan.svg';
import ParmezanPressed from '../images/parmezanYellow.svg';

import Rucola from '../images/rucola.svg';
import RucolaPressed from '../images/rucolaYellow.svg';

import Pesto from '../images/pesto.svg';
import PestoPressed from '../images/pestoYellow.svg';

import Ton from '../images/ton.svg';
import TonPressed from '../images/tonYellow.svg';

import Spanac from '../images/spanac.svg';
import SpanacPressed from '../images/spanacYellow.svg';

export default class Sos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            culoare: '#999999',
            pressed: false,
        }
    }

    getPressed() {
        return this.state.pressed;
    }

    setPressed(value) {
        this.setState({ pressed: value });
        console.log('SET PRESSED', value);
    }

    onPress() {
        this.state.pressed ?
            this.setState({ culoare: '#999', pressed: false })
            :
            this.setState({ culoare: '#ffd101', pressed: true })

    }

    imageSize() {
        if (this.props.size == 'large') {
            return ({
                width: 50,
                height: 52,
            })
        }
        else {
            return ({
                width: 36,
                height: 40,
            })
        }
    }

    whichElement(name, pressed) {
        if (pressed) {
            if (name == 'tomato')
                return <TomatoPressed width={this.imageSize().width} height={this.imageSize().height}></TomatoPressed>
            if (name == 'chili')
                return <ChiliPressed width={this.imageSize().width} height={this.imageSize().height}></ChiliPressed>
            if (name == 'aurora')
                return <AuroraPressed width={this.imageSize().width} height={this.imageSize().height}></AuroraPressed>
            if (name == 'barbeque')
                return <BarbequePressed width={this.imageSize().width} height={this.imageSize().height}></BarbequePressed>
            if (name == 'mayo')
                return <MayoPressed width={this.imageSize().width} height={this.imageSize().height}></MayoPressed>

            //TOPINGURI

            if (name == 'mozzarella')
                return <MozzarellaPressed width={this.imageSize().width} height={this.imageSize().height}></MozzarellaPressed>
            if (name == 'gorgonzola')
                return <GorgonzolaPressed width={this.imageSize().width} height={this.imageSize().height}></GorgonzolaPressed>
            if (name == 'bacon')
                return <BaconPressed width={this.imageSize().width} height={this.imageSize().height}></BaconPressed>
            if (name == 'salami')
                return <SalamiPressed width={this.imageSize().width} height={this.imageSize().height}></SalamiPressed>

            //MODAL INGREDIENTE
            if (name == 'sunca')
                return <SuncaPressed width={this.imageSize().width} height={this.imageSize().height}></SuncaPressed>
            if (name == 'ciuperci')
                return <CiuperciPressed width={this.imageSize().width} height={this.imageSize().height}></CiuperciPressed>
            if (name == 'porumb')
                return <PorumbPressed width={this.imageSize().width} height={this.imageSize().height}></PorumbPressed>
            if (name == 'ardei')
                return <ArdeiPressed width={this.imageSize().width} height={this.imageSize().height}></ArdeiPressed>
            if (name == 'tomato')
                return <TomatoPressed width={this.imageSize().width} height={this.imageSize().height}></TomatoPressed>
            if (name == 'salamChorizo')
                return <SalamChorizoPressed width={this.imageSize().width} height={this.imageSize().height}></SalamChorizoPressed>
            if (name == 'ceapa')
                return <CeapaPressed width={this.imageSize().width} height={this.imageSize().height}></CeapaPressed>
            if (name == 'carnaciori')
                return <CarnacioriPressed width={this.imageSize().width} height={this.imageSize().height}></CarnacioriPressed>
            if (name == 'pui')
                return <PuiPressed width={this.imageSize().width} height={this.imageSize().height}></PuiPressed>
            if (name == 'ardeiIute')
                return <ArdeiIutePressed width={this.imageSize().width} height={this.imageSize().height}></ArdeiIutePressed>
            if (name == 'prosciuto')
                return <ProsciutoPressed width={this.imageSize().width} height={this.imageSize().height}></ProsciutoPressed>
            if (name == 'masline')
                return <MaslinePressed width={this.imageSize().width} height={this.imageSize().height}></MaslinePressed>
            if (name == 'babic')
                return <BabicPressed width={this.imageSize().width} height={this.imageSize().height}></BabicPressed>
            if (name == 'branzaFeta')
                return <BranzaFetaPressed width={this.imageSize().width} height={this.imageSize().height}></BranzaFetaPressed>
            if (name == 'fileDeAnsoa')
                return <FileDeAnsoaPressed width={this.imageSize().width} height={this.imageSize().height}></FileDeAnsoaPressed>
            if (name == 'fileDeSomon')
                return <FileDeSomonPressed width={this.imageSize().width} height={this.imageSize().height}></FileDeSomonPressed>
            if (name == 'lamaie')
                return <LamaiePressed width={this.imageSize().width} height={this.imageSize().height}></LamaiePressed>
            if (name == 'ou')
                return <OuPressed width={this.imageSize().width} height={this.imageSize().height}></OuPressed>
            if (name == 'parmezan')
                return <ParmezanPressed width={this.imageSize().width} height={this.imageSize().height}></ParmezanPressed>
            if (name == 'rucola')
                return <RucolaPressed width={this.imageSize().width} height={this.imageSize().height}></RucolaPressed>
            if (name == 'pesto')
                return <PestoPressed width={this.imageSize().width} height={this.imageSize().height}></PestoPressed>
            if (name == 'ton')
                return <TonPressed width={this.imageSize().width} height={this.imageSize().height}></TonPressed>
            if (name == 'spanac')
                return <SpanacPressed width={this.imageSize().width} height={this.imageSize().height}></SpanacPressed>
        }
        else {
            if (name == 'tomato')
                return <Tomato width={this.imageSize().width} height={this.imageSize().height}></Tomato>
            if (name == 'chili')
                return <Chili width={this.imageSize().width} height={this.imageSize().height}></Chili>
            if (name == 'aurora')
                return <Aurora width={this.imageSize().width} height={this.imageSize().height}></Aurora>
            if (name == 'barbeque')
                return <Barbeque width={this.imageSize().width} height={this.imageSize().height}></Barbeque>
            if (name == 'mayo')
                return <Mayo width={this.imageSize().width} height={this.imageSize().height}></Mayo>

            //TOPINGURI
            if (name == 'mozzarella')
                return <Mozzarella width={this.imageSize().width} height={this.imageSize().height}></Mozzarella>
            if (name == 'gorgonzola')
                return <Gorgonzola width={this.imageSize().width} height={this.imageSize().height}></Gorgonzola>
            if (name == 'bacon')
                return <Bacon width={this.imageSize().width} height={this.imageSize().height}></Bacon>
            if (name == 'salami')
                return <Salami width={this.imageSize().width} height={this.imageSize().height}></Salami>

            //MODAL INGREDIENTE
            if (name == 'sunca')
                return <Sunca width={this.imageSize().width} height={this.imageSize().height}></Sunca>
            if (name == 'ciuperci')
                return <Ciuperci width={this.imageSize().width} height={this.imageSize().height}></Ciuperci>
            if (name == 'porumb')
                return <Porumb width={this.imageSize().width} height={this.imageSize().height}></Porumb>
            if (name == 'ardei')
                return <Ardei width={this.imageSize().width} height={this.imageSize().height}></Ardei>
            if (name == 'tomato')
                return <Tomato width={this.imageSize().width} height={this.imageSize().height}></Tomato>
            if (name == 'salamChorizo')
                return <SalamChorizo width={this.imageSize().width} height={this.imageSize().height}></SalamChorizo>
            if (name == 'ceapa')
                return <Ceapa width={this.imageSize().width} height={this.imageSize().height}></Ceapa>
            if (name == 'carnaciori')
                return <Carnaciori width={this.imageSize().width} height={this.imageSize().height}></Carnaciori>
            if (name == 'pui')
                return <Pui width={this.imageSize().width} height={this.imageSize().height}></Pui>
            if (name == 'ardeiIute')
                return <ArdeiIute width={this.imageSize().width} height={this.imageSize().height}></ArdeiIute>
            if (name == 'prosciuto')
                return <Prosciuto width={this.imageSize().width} height={this.imageSize().height}></Prosciuto>
            if (name == 'masline')
                return <Masline width={this.imageSize().width} height={this.imageSize().height}></Masline>
            if (name == 'babic')
                return <Babic width={this.imageSize().width} height={this.imageSize().height}></Babic>
            if (name == 'branzaFeta')
                return <BranzaFeta width={this.imageSize().width} height={this.imageSize().height}></BranzaFeta>
            if (name == 'fileDeAnsoa')
                return <FileDeAnsoa width={this.imageSize().width} height={this.imageSize().height}></FileDeAnsoa>
            if (name == 'fileDeSomon')
                return <FileDeSomon width={this.imageSize().width} height={this.imageSize().height}></FileDeSomon>
            if (name == 'lamaie')
                return <Lamaie width={this.imageSize().width} height={this.imageSize().height}></Lamaie>
            if (name == 'ou')
                return <Ou width={this.imageSize().width} height={this.imageSize().height}></Ou>
            if (name == 'parmezan')
                return <Parmezan width={this.imageSize().width} height={this.imageSize().height}></Parmezan>
            if (name == 'rucola')
                return <Rucola width={this.imageSize().width} height={this.imageSize().height}></Rucola>
            if (name == 'pesto')
                return <Pesto width={this.imageSize().width} height={this.imageSize().height}></Pesto>
            if (name == 'ton')
                return <Ton width={this.imageSize().width} height={this.imageSize().height}></Ton>
            if (name == 'spanac')
                return <Spanac width={this.imageSize().width} height={this.imageSize().height}></Spanac>
        }
    }

    hasPrice() {
        if (this.props.pret == null) return null;

        return (
            <Text style={[styles.adaugaSosText, { color: this.state.culoare }]}>({this.props.pret} lei)</Text>
        )

    }

    render() {
        console.log(this.props)
        return (
            <TouchableOpacity activeOpacity = {1} 
                style={[styles.sosElement, { borderColor: this.state.culoare }, this.props.style]}
                onPress={() => { [this.props.onPress(), this.onPress()] }}>

                                    <SvgUri
                                        width="44"
                                        height="48"
                                        uri={this.props.image}
                                    />

                <Text style={[styles.adaugaSosText, { color: this.state.culoare }]}>{this.props.name}</Text>

                <Text style={[styles.adaugaSosText, { color: this.state.culoare }]}>({this.props.price} lei)</Text>
            </TouchableOpacity>
        )
    }
}

