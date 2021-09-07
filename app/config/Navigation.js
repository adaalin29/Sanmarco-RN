import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import React, { Component } from 'react';
import { ImageBackground, Text, View, Image, StatusBar, KeyboardAvoidingView, Platform, PlatformColor} from 'react-native';
import styles from '../css/commons';

import Onboarding from '../screens/Onboarding';
import ContUtilizator from '../screens/ContUtilizator';
import PuncteleMele from '../screens/PuncteleMele';
import AdreseLivrare from '../screens/AdreseLivrare';
import IstoricComenzi from '../screens/IstoricComenzi';
import ComenziActive from '../screens/ComenziActive';
import Login from '../screens/Login';
import api from '../api';
import settings from '../settings';
import emitter from 'tiny-emitter/instance'
import Homepage from '../screens/Homepage';
import ListarePaste from '../screens/ListarePaste';
import ListareExtra from '../screens/ListareExtra';
import ListareBurgeriWraps from '../screens/ListareBurgeriWraps';
import ListarePizza from '../screens/ListarePizza';
import ListareDeserturi from '../screens/ListareDeserturi';
import ListareBauturi from '../screens/ListareBauturi';
import ListareSalate from '../screens/ListareSalate';
import ListareSandwichuri from '../screens/ListareSandwichuri';
import ContNou from '../screens/ContNou';
import Terms from '../screens/Terms';
import Politica from '../screens/Terms';
import Contact from '../screens/Contact';
import AsyncStorage from '@react-native-community/async-storage';
import Oferte from '../screens/Oferte';
import Cos from '../screens/Cos';
import Loading from '../screens/Loading';
import DetaliuPizza from '../screens/Detaliu/DetaliuPizza';
import DetaliuExtra from '../screens/Detaliu/DetaliuExtra';
import DetaliuBurger from '../screens/Detaliu/DetaliuBurger';
import DetaliuWrap from '../screens/Detaliu/DetaliuWrap';
import DetaliuPaste from '../screens/Detaliu/DetaliuPaste';
import DetaliuSalata from '../screens/Detaliu/DetaliuSalata';
import DetaliuSandwich from '../screens/Detaliu/DetaliuSandwich';
import PaymentWebView from '../screens/PaymentWebView';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

import UserLogo from '../images/user.svg';
import UserLogoLoggedIn from '../images/userLogged.svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import OneSignal from 'react-native-onesignal';

const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
var _navigate = React.createRef();
export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: null,
        }
    }
    componentDidMount() {
        settings.init()
        AsyncStorage.getItem('didOnboard')
        .then((res)=>{
            console.log(res)
            var firstTime = true
            if(res != null && res == "true"){
                firstTime = false
            }
            if(firstTime == true)_navigate.current?.navigate('Home', {screen: 'Onboarding'})
        }).catch((res)=>{
            console.log(res)
            _navigate.current?.navigate('Home', {screen: 'Onboarding'})
        })
        api.oauth.check().then(auth => {
            console.log(auth)
            this.setState({ logged: auth.logged });
            this.initOneSignal(auth)
        })
        emitter.on('auth', () => {
            let auth = api.oauth.getAuth();
            this.setState({ logged: auth.logged });
            if(auth.logged && auth.user){
                OneSignal.sendTag("user_id", ''+auth.user.id)
            }else{
                OneSignal.deleteTag("user_id")
            }
        });
        
    }
    
    initOneSignal(auth){
        OneSignal.setAppId("5c4b6aea-34ce-4978-b419-9438ddc022be");
        OneSignal.setLogLevel(6, 0);
        OneSignal.setRequiresUserPrivacyConsent(false);
        OneSignal.setNotificationOpenedHandler(notification => {
            console.log("OneSignal: notification opened:", notification);
            _navigate.current?.navigate('Home', {screen: 'TabNavigator', params: { screen: 'Istoric comenzi' }})
        });
        if(auth.logged && auth.user){
            OneSignal.sendTag("user_id", ''+auth.user.id)
        }else{
            OneSignal.deleteTag("user_id")
        }
    }
    
    onRouteChange = (state) => {
        let mainRoute = state.routes[state.index]
        let mainState = mainRoute.state
        let activeRoute = null
        global.selectedCategory = '';
        if (mainState.routes.length > 0) {
            activeRoute = mainState.routes[mainState.index].name
            console.log('RUTA ACTIVA: ', activeRoute)
            if (activeRoute == 'ListarePizza' || activeRoute == 'DetaliuPizza') {
                global.selectedCategory = 'pizza'
            }
            if (activeRoute == 'ListarePaste' || activeRoute == 'DetaliuPaste') {
                global.selectedCategory = 'paste'
            }
            if (activeRoute == 'ListareSalate' || activeRoute == 'DetaliuSalata') {
                global.selectedCategory = 'salate'
            }
            if (activeRoute == 'ListareSandwichuri' || activeRoute == 'DetaliuSandwich') {
                global.selectedCategory = 'sandwichuri';
            }
            if (activeRoute == 'ListareDeserturi') {
                global.selectedCategory = 'deserturi'
            }
            if (activeRoute == 'ListareBauturi') {
                global.selectedCategory = 'bauturi'
            }
            if (activeRoute == 'ListareBurgeriWraps' || activeRoute == 'DetaliuWrap' || activeRoute == 'DetaliuBurger') {
                global.selectedCategory = 'wraps'
            }
            if (activeRoute == 'ListareExtra' || activeRoute == 'DetaliuExtra') {
                global.selectedCategory = 'extra'
            }
        }
    }
    
    render() {
        return (
            <NavigationContainer
                ref={_navigate}
                onStateChange={this.onRouteChange}
            >
                <Drawer.Navigator
                    key={this.state.logged}
                    drawerStyle={{ backgroundColor: '#232323' }}
                    drawerContent={(props) => <DrawerNavigationContent {...props} logged={this.state.logged} />}
                    drawerType={'slide'}
                    edgeWidth={this.state.logged ? 80 : 0}>
                    <Drawer.Screen name={'Home'}>{props => (<StackScreen {...props} key={this.state.logged} logged={this.state.logged} />)}</Drawer.Screen>
                </Drawer.Navigator>
            </NavigationContainer>
        )
    }
}

class StackScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: props.logged,
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
                <KeyboardAvoidingView 
                behavior={Platform.OS =="ios" ? "padding" : null}
                style={{flex:1}}>
                <StatusBar barStyle="light-content" />
                <Stack.Navigator
                    headerMode={'none'}>
                    {this.state.logged === null ? <>
                        <Drawer.Screen name={'Loading'} component={Loading} /></> :
                        <>
                            <Drawer.Screen name={'ListarePizza'} component={ListarePizza} />
                            <Drawer.Screen name={'ListareExtra'} component={ListareExtra} />
                            <Drawer.Screen name={'ListareBurgeriWraps'} component={ListareBurgeriWraps} />
                            <Drawer.Screen name={'ComenziActive'} component={ComenziActive} />
                            <Drawer.Screen name={'ContNou'} component={ContNou} />
                            <Drawer.Screen name={'Login'} component={Login} />
                            <Drawer.Screen name={'DetaliuPizza'} component={DetaliuPizza} />
                            <Drawer.Screen name={'DetaliuPaste'} component={DetaliuPaste} />
                            <Drawer.Screen name={'DetaliuSandwich'} component={DetaliuSandwich} />
                            <Drawer.Screen name={'DetaliuSalata'} component={DetaliuSalata} />
                            <Drawer.Screen name={'DetaliuWrap'} component={DetaliuWrap} />
                            <Drawer.Screen name={'DetaliuBurger'} component={DetaliuBurger} />
                            <Drawer.Screen name={'DetaliuExtra'} component={DetaliuExtra} />
                            <Drawer.Screen name={'ListarePaste'} component={ListarePaste} />
                            <Drawer.Screen name={'ListareDeserturi'} component={ListareDeserturi} />
                            <Drawer.Screen name={'ListareBauturi'} component={ListareBauturi} />
                            <Drawer.Screen name={'ListareSalate'} component={ListareSalate} />
                            <Drawer.Screen name={'ListareSandwichuri'} component={ListareSandwichuri} />
                            <Drawer.Screen name={'Loading'} component={Loading} />
                            <Drawer.Screen name={'PaymentWebView'} component={PaymentWebView} />
                            <Drawer.Screen name={'Inregistrare'} component={ContNou} />
                            <Drawer.Screen name={'Termeni si conditii'} component={Terms} />
                            <Drawer.Screen name={'Politica de confidentialitate'} component={Politica} />
                            <Drawer.Screen name={'Contact'} component={Contact} />
                            <Drawer.Screen name={'TabNavigator'} component={TabNavigationCont} />
                            <Drawer.Screen name={'Oferte'} component={Oferte} />
                            <Drawer.Screen name={'Cos'} component={Cos} />
                        </>
                    }
                    <Drawer.Screen name={'Onboarding'} component={Onboarding} />
                </Stack.Navigator>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}

function TabNavigationCont(props) {
    return (
        <>
            <Header navigation={props.navigation}></Header>
            <Tab.Navigator tabBarOptions={{ style: { backgroundColor: '#000' }, scrollEnabled: true, allowFontScaling: true, labelStyle: { color: '#ffd101' }, indicatorStyle: { backgroundColor: '#ffd101' } }}>
                <Tab.Screen name="Date personale" component={ContUtilizator} />
                {/* <Tab.Screen name="Punctele mele" component={PuncteleMele} /> */}
                <Tab.Screen name="Adrese de livrare" component={AdreseLivrare} />
                <Tab.Screen name="Istoric comenzi" component={IstoricComenzi} />
                {/* <Tab.Screen name="Comenzi active" component={ComenziActive} /> */}
            </Tab.Navigator>
            <Footer navigation={props.navigation} />
        </>
    )
}

function DrawerNavigationContent(props) {
    // if (props.logged != true) return null
    // const [loggedIn, setLoggedIn] = React.useState(true);

    return (
        <DrawerContentScrollView
            style={{ backgroundColor: '#000' }}
            {...props}>
            {/* <ImageBackground source={require('../images/backgroundPizza.png')} style={{zIndex: 10, resizeMode: 'cover', flex: 1, }}> */}
            <View style={{ flex: 1, paddingBottom: '125%' }}>
                <Image source={require('../images/backgroundPizza.png')} style={{ position: 'absolute', left: -450, top: 0, resizeMode: 'cover' }} />
                {props.logged ?
                    (
                        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20, paddingBottom: 30 }}>
                            <UserLogoLoggedIn width={65} height={65} />
                            <View style={{ flexDirection: 'column', paddingLeft: 10 }}>
                                <Text style={[styles.salutUser, { color: '#999' }]}>Salut,</Text>
                                <Text style={styles.salutUser}>{api.oauth.getAuth().user?.nume + " " + api.oauth.getAuth().user?.prenume}</Text>
                            </View>
                        </View>
                    )
                    :
                    (
                        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20, paddingBottom: 30 }}>
                            <UserLogo width={65} height={65} />
                        </View>
                    )
                }

                {props.logged ?
                    (<>
                        {/* <DrawerItem labelStyle={styles.drawerLabel} label="Comenzi active" onPress={() => props.navigation.navigate('TabNavigator', { screen: 'Comenzi active' })} /> */}
                        <DrawerItem labelStyle={styles.drawerLabel} label="Date personale" onPress={() => props.navigation.navigate('TabNavigator', { screen: 'Date personale' })} />
                        {/* <DrawerItem labelStyle={styles.drawerLabel} label="Punctele mele" onPress={() => props.navigation.navigate('TabNavigator', { screen: 'Punctele mele' })} /> */}
                        <DrawerItem labelStyle={styles.drawerLabel} label="Adrese de livrare" onPress={() => props.navigation.navigate('TabNavigator', { screen: 'Adrese de livrare' })} />
                        <DrawerItem labelStyle={styles.drawerLabel} label="Istoric comenzi" onPress={() => props.navigation.navigate('TabNavigator', { screen: 'Istoric comenzi' })} />
                        <View style={{ paddingTop: 30 }}></View>

                        <DrawerItem labelStyle={styles.drawerLabel} label="Termeni si conditii" onPress={() => props.navigation.navigate('Termeni si conditii')} />
                        <DrawerItem labelStyle={styles.drawerLabel} label="Politica de confidentialitate" onPress={() => props.navigation.navigate('Politica de confidentialitate')} />
                        <DrawerItem labelStyle={styles.drawerLabel} label="Contact" onPress={() => props.navigation.navigate('Contact')} />
                        <DrawerItem labelStyle={[styles.drawerLabel, { opacity: 0.5 }]} label="Logout" onPress={() => {props.navigation.toggleDrawer(); api.oauth.logout() }} />
                    </>)
                    :
                    (<>
                        <DrawerItem labelStyle={styles.drawerLabel} label="Inregistrare" onPress={() => props.navigation.navigate('Inregistrare')} />
                        <DrawerItem labelStyle={styles.drawerLabel} label="Autentificare" onPress={() => { props.navigation.navigate('Login') }} onLoginPress={() => { }} />
                        <View style={{ paddingTop: 30 }}></View>

                        <DrawerItem labelStyle={styles.drawerLabel} label="Termeni si conditii" onPress={() => props.navigation.navigate('Termeni si conditii')} />
                        <DrawerItem labelStyle={styles.drawerLabel} label="Politica de confidentialitate" onPress={() => props.navigation.navigate('Politica de confidentialitate')} />
                        <DrawerItem labelStyle={styles.drawerLabel} label="Contact" onPress={() => props.navigation.navigate('Contact')} />
                    </>)
                }
            </View>
            {/* </ImageBackground> */}
        </DrawerContentScrollView>
    );
}