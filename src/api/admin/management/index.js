import api from '../../index'

const prefix = "/management"

export const Request = (options) => {
  return api.request({
    ...options,
    url: prefix + options.url
  })
}

export default Request
