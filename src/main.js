import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(VueAxios, axios)
Vue.use(Vuetify)
Vue.config.productionTip = false

new Vue({
    render: (h) => h(App),
}).$mount('#app')
