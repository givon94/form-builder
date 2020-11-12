import  Vue from 'vue'
import  Vuex from 'vuex'
import shared from './shared'
import save from './save'

Vue.use(Vuex)





export default new Vuex.Store({
    modules: {
        shared,
        save
    }
})
