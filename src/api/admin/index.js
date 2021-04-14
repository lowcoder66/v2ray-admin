import api from '../index'

export const Request = (options) => {
  return api.request({
    ...options,
    url: options.url
  })
}

export default Request
