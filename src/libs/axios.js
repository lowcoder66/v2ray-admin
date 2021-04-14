import axios from 'axios'
import store from '@/store'
import router from '@/router'

const defaultErrorHandler = (error) => {
  let errMsg = null
  if (error && error.response) {
    if (error.response.data && error.response.data.message) {
      errMsg = error.response.data.message
    } else if (error.message) {
      errMsg = error.message
    }

    // 401 to login
    if (error.response.status === 401) {
      router.push({
        name: "login"
      }, null, null)
    }
  } else if(error && error.message) {
    store.commit("errAlert", error.message)
  }

  if (errMsg) {
    store.commit("errAlert", errMsg)
  }

  return error
}

const successAlert = (response) => {
  if (response && response.data && response.data.message) {
    store.commit("successAlert", response.data.message)
  }
}

class HttpRequest {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    return {
      baseURL: this.baseUrl,
      headers: {
        //
      },
      requireAuth: true, // 默认需要认证
      errorHandler: defaultErrorHandler
    }
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      setTimeout(() => {store.commit('setLoading', false)}, 500)
    }
  }
  interceptors (instance, url) {
    instance.interceptors.request.use(config => {
      if (!Object.keys(this.queue).length) {
        store.commit('setLoading', true)
      }
      this.queue[url] = true

      // 认证信息
      if (config['requireAuth']) {
        let token = store.getters.tokenValue
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }

      return config
    }, error => {
      let errorHandler = error.config.errorHandler || null
      return Promise.reject(errorHandler ? errorHandler(error) : error)
    })

    // 响应拦截
    instance.interceptors.response.use(resp => {
      this.destroy(url)

      new Promise(() => {
        successAlert(resp)
      }).then(() => {});

      return resp
    }, error => {
      this.destroy(url)

      let errorHandler = error.config.errorHandler || null
      return Promise.reject(errorHandler ? errorHandler(error) : error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export default HttpRequest
