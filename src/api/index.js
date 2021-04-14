import HttpRequest from '../libs/axios'

let baseUrl = process.env.VUE_APP_API_BASE || "http://localhost:8080"

const api = new HttpRequest(baseUrl)
export default api
