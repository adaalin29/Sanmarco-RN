import emitter from 'tiny-emitter/instance';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'lodash'
import {showMessage} from 'react-native-flash-message';

var cart = {}

cart.data = {
    items: [],
    total: 0,
    totalProduse: 0,
}

cart.get=()=>{
    return new Promise((resolve, reject)=>{
        AsyncStorage.getItem('cart_data')
        .then(cart_data => {
            if (!cart_data) return resolve(null);
            cart_data = JSON.parse(cart_data);
            if (!cart_data) return resolve(null);
            resolve(cart_data)
        })
        .catch(e => {
            return resolve(null);
        });
    })
}

cart.save=()=>{
    AsyncStorage.setItem('cart_data', JSON.stringify(cart.data))
    .then(() => {
        resolve()
    })
}

cart.refresh=()=>{
    cart.data.total=0
    cart.data.totalProduse=0
    var pizzaMici = []
    cart.data.items?.map((produs)=>{
        var produsTotalCuToppings = 0
        if(produs.options.extra && produs.options.extra.length > 0){
            if(produs.options.type ==  1){
                produs.options.extra.map((topping)=>{
                    produsTotalCuToppings += topping.price*3;
                })
            }else{
                produs.options.extra.map((topping)=>{
                    produsTotalCuToppings += topping.price;
                })
            }
        }
        produs.price = produs.options.price + produsTotalCuToppings;
    })


    cart.data.items = cart.data.items.filter((produs)=>{
        if(produs.name.includes("PIZZA") && produs.options.type == 0){
            for(i = 1; i <= parseInt(produs.qty); i++){
                if(produs.options.type == 1)
                    return
                else
                    pizzaMici.push(_.cloneDeep(produs))
            }
            return false
        }
        return true
    })

    var numarPizzaFreeMici = parseInt(pizzaMici.length/4)
    var pizzaSortateMici = _.orderBy(pizzaMici, ['price']);
    pizzaSortateMici.map((item)=>{
        if(item.options.sos && item.options.sos.length > 0){
            item.options.sos.map((sos)=>{
                item.price += sos.price*sos.cantitate
            })
        }
        item.options.oferta = false
        item.qty = 1
        if(numarPizzaFreeMici > 0){
            item.options.oferta = true
            item.price = 0
            if(item.options.sos && item.options.sos.length > 0){
                item.options.sos.map((sos)=>{
                    item.price += sos.price*sos.cantitate
                })
            }
            numarPizzaFreeMici= numarPizzaFreeMici-1
            
        }
    })
    let uniqueMici = pizzaSortateMici.filter((item, i, ar) => ar.indexOf(item) === i);
    console.log("unique", uniqueMici);
    console.log("pizza sortate", pizzaSortateMici)
    pizzaSortateMici.map((item)=>{
        cart.data.items.push(_.cloneDeep(item))
    })


    var test = []
    console.log("iteme inainte",cart.data.items)
    cart.data.items.map((item)=>{
        var gasit = false
        var cheie = 0
        var itemClonat = _.cloneDeep(item)
        delete itemClonat.qty
        var hash = JSON.stringify(_(itemClonat).toPairs().sortBy(0).fromPairs().value())
        console.log("hash1",hash)
        test.map((item2, index)=>{
            var item2Clonat = _.cloneDeep(item2)
            delete item2Clonat.qty
            var hash2 = JSON.stringify(_(item2Clonat).toPairs().sortBy(0).fromPairs().value())
            if(hash == hash2){
                gasit = true
                cheie = index
            }
        })
        if(gasit == true){
            test[cheie].qty +=1
        }else{
            test.push(_.cloneDeep(item))
        }
    })
    console.log("iteme adunate", test)
    cart.data.items = test

    cart.data.items.map((item)=>{
        cart.data.total+=item.price*item.qty
        cart.data.totalProduse+=item.qty
    })
    cart.save()
    emitter.emit("cart-update")
}

cart.addItem=(item)=>{

    cart.data.items.push(_.cloneDeep(item))
    showMessage({type: 'success', message: "Produsul a fost adaugat in cos"})
    cart.refresh()
}

cart.updateCantitate=(index, cantitate)=>{
        cantitate = parseInt(cantitate)
        if(cantitate <= 0){
            cart.data.items.splice(index, 1)
            showMessage({type: 'success', message: "Produsul a fost sters din cos"})
        }
        if(cantitate > 0){
            cart.data.items[index].qty = cantitate
            showMessage({type: 'success', message: "Cantitatea a fost salvata"})
        }
    cart.refresh()
}

cart.remove=(id)=>{
    cart.data.items.map((item, index)=>{
        if(item.id == id){
            cart.data.items.splice(index, 1)
            showMessage({type: 'success', message: "Produsul a fost sters din cos"})
        }
    })
    cart.refresh()
}
cart.replace=(index, produs)=>{
    cart.data.items.splice(index, 1)
    cart.data.items.push(produs)
    cart.refresh()
}

cart.empty=()=>{
    cart.data = {
        items: [],
        total: 0,
        totalProduse: 0,
    }
    cart.refresh()
    // emitter.emit("cart-update")
}
cart.init=()=>{
    cart.get().then((cart_data)=>{
        if(cart_data)cart.data = cart_data
    })
}

export default cart;