import {readObject, readObjectProp, TOKEN_KEY, USER_INFO_KEY, writeObject} from "@/util/localStorageUtils"
import {add, compare} from "@/util/dateUtils"

export default {
  state: {
    email: readObjectProp(USER_INFO_KEY, "email"),
    name: readObjectProp(USER_INFO_KEY, "name"),
    token: readObject(TOKEN_KEY) || {},
  },
  mutations: {
    setName(state, name) {
      state.name = name
      writeObject(USER_INFO_KEY, {name, email: state.email})
    },
    setEmail(state, email) {
      state.email = email
      writeObject(USER_INFO_KEY, {email, name: state.name})
    },
    setToken (state, token) {
      state.token = {...token}
      writeObject(TOKEN_KEY, state.token)
    },
  },
  getters: {
    tokenValue: (state, getters) => {
      return getters.tokenExpired ? null : state.token['token']
    },
    tokenExpired: state => {
      if(state.token['reqTime'] && state.token['expireIn']) {
        let expireTime = add(state.token["reqTime"], state.token["expireIn"], "s", null)
        return expireTime == null || compare(expireTime, Date.now()) <= 0
      }
      return true
    },
  },
  actions: {

  }
}
