import axios from "axios"
import { getCredentials } from "../utils/getCredentials.js"

export const client = axios.create({})

client.interceptors.request.use((config) => {
  const { token } = getCredentials()
  config.headers = {
    Authorization: `Bearer ${token}`,
  }
  return config
})
