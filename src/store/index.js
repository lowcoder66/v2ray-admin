import Vue from "vue";
import Vuex from "vuex";
import UserModule from "./modules/user"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    alerts: [],
    navDrawer: true,
  },
  getters: {

  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading
    },
    addAlert(state, alert) {
      let def = {
        uid: state.alerts.length + "_" + Date.now(),
        live: 1500,
        type: 'info'
      }
      if (typeof alert === "string") {
        state.alerts.splice(0, 0, {...def, message: alert})
      } else if(typeof alert === "object") {
        state.alerts.splice(0, 0, Object.assign(def, alert))
      }
    },
    errAlert(state, alert) {
      if (typeof alert === "string") {
        this.commit('addAlert', {type: 'error', message: alert})
      } else if(typeof alert === "object") {
        this.commit('addAlert', {...alert, type: 'error'})
      }
    },
    successAlert(state, alert) {
      if (typeof alert === "string") {
        this.commit('addAlert', {type: 'success', message: alert})
      } else if(typeof alert === "object") {
        this.commit('addAlert', {...alert, type: 'success'})
      }
    },
    removeAlert(state, uid) {
      let index = state.alerts.findIndex(a => a.uid === uid)
      if (index > -1) {
        state.alerts.splice(index, 1)
      }
    },
    openNavDrawer(state, open) {
      state.navDrawer = open
    },
  },
  actions: {},
  modules: {
    user: UserModule
  },
});
