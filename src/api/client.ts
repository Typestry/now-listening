import axios from "axios"
import { getConfig } from "../utils/getConfig"

export const client = axios.create({})

client.interceptors.request.use((config) => {
  const { token } = getConfig()
  config.headers = {
    Authorization: `Bearer ${token}`,
  }
  return config
})
