import axios from "axios"
import { TestRoutes } from "../../constants/api"

export const verifyAuth = async (token: string) => {
  const options = {
    method: "POST",
    url: TestRoutes.auth(),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  try {
    const response = await axios.request(options)
    return response.data.ok
  } catch (err) {
    return false
  }
}
