import { Message } from 'element-ui';

export default {
        components: {
        Message
    },
    state: {
        warning: null,
        error: null,
        success: null
    },
    mutations: {
        setError (state, payload) {
            state.error = payload

            Message({
                showClose: true,
                message: payload,
                type: 'error'
            });
        },
        setSuccess (state, payload) {
            state.success = payload

            Message({
                showClose: true,
                message: payload,
                type: 'success'
            });
        },
        setWarning (state, payload) {
            state.warning = payload

            Message({
                showClose: true,
                message: payload,
                type: 'warning'
            });
        },
    },
    actions: {
        setError ({commit}, payload) {
            console.log('commit' + commit)
            console.log('payload' + payload)
            commit('setError', payload)
        },
        setSuccess ({commit}, payload) {
            console.log('commit' + commit)
            console.log('payload' + payload)
            commit('setSuccess', payload)
        },
        setWarning ({commit}, payload) {
            console.log('commit' + commit)
            console.log('payload' + payload)
            commit('setWarning', payload)
        },
    },
}
