import axios from "axios"
import { TestRoutes } from "../../../constants/api"

export const verifyAuth = async (token: string) => {
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  try {
    const response = await axios.post(TestRoutes.auth(), undefined, options)
    return response.data.ok
  } catch (err) {
    return false
  }
}
