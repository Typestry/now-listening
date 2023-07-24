import { cache } from "../../cache/index.js"
import { UserRoutes } from "../../constants/api.js"
import { CacheKeys } from "../../constants/cache.js"
import { ProfilePartial } from "../../types/ProfilePartial.js"
import { client } from "../client.js"

export const updateStatus = async ({
  status_emoji,
  status_text,
}: ProfilePartial) => {
  const prevStatus = cache.get(CacheKeys.status())

  if (prevStatus === status_text) {
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
