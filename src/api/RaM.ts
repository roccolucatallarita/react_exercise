import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
const BASE_URL = 'https://rickandmortyapi.com/api'

export const get = (endpoint: string, params?: Object): Promise<Info> => {
  return new Promise((resolve) => {
    const url = `${BASE_URL}/${endpoint}`
    params = params || {}
    axios.get(url, params).then((response: AxiosResponse) => {
      if (response.status && response.status >= 200 && response.status < 300) {
        const data = response.data

        resolve(data)
      }
    })
  })
}
export const getCharacters = (
  endpoint: string,
  params?: AxiosRequestConfig<any>
): Promise<Info> => {
  return new Promise((resolve) => {
    const url = `${BASE_URL}/${endpoint}`
    params = params || {}
    axios.get(url, params).then(
      (response: AxiosResponse) => {
        if (
          response.status &&
          response.status >= 200 &&
          response.status < 300
        ) {
          const data = response.data
          resolve(data)
        } else {
          resolve({})
        }
      },
      () => {
        resolve({})
      }
    )
  })
}
