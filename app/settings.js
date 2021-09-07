import _ from 'lodash'
import api from './api'

var settings = {}


settings.init=()=>{
    api.get('/getSettings')
    .then(res => {
        if (!res.data.success)
            console.log("eroare")
        else {
            settings.data = res.data.settings
        }
    })
}
settings.get = (key) =>{
    var item
    settings.data.map((setting)=>{
        if(setting.key == key){
            item = setting.value
        }
    })
    return item
}


export default settings;