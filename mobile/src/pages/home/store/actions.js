import { GET_ADS } from './types'
import api from 'api'

export default {
    async [GET_ADS]({ commit }) {
        console.log(111)
        const result = await api.getPositionAds({ position: 2 })
        console.log(result)
    }
}