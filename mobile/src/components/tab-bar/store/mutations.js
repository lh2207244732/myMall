import { CHANGE_TAB_BAR_ACTIVE } from './types'
export default {
    [CHANGE_TAB_BAR_ACTIVE](state, payload) {
        sessionStorage.setItem('tabBarActiveIndex', payload)
        state.active = parseInt(payload)
    }
}