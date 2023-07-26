import { cache } from "../../../cache/index"
import { UserRoutes } from "../../../constants/api"
import { CacheKeys } from "../../../constants/cache"
import { ProfilePartial } from "../../../types/ProfilePartial"
import { client } from "../../client"

export const updateStatus = async (payload: ProfilePartial | null) => {
  if (payload === null) {
    return
  }

  const { status_text, status_emoji } = payload
  const prevStatus = cache.get(CacheKeys.status())

  if (prevStatus === payload.status_text) {
    return
  }

  await client
    .post(UserRoutes.writeProfile(), { profile: { status_emoji, status_text } })
    .then(() => {
      cache.set(CacheKeys.status(), status_text)
      console.log(
        `Successfully updated status with: ${status_emoji} ${status_text}`,
      )
    })
    .catch(function (error) {
      console.error(error)
    })
}
