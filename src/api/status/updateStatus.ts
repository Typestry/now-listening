import { UserRoutes } from "../../constants/api.js"
import { ProfilePartial } from "../../types/ProfilePartial.js"
import { client } from "../client.js"

export const updateStatus = async ({
  status_emoji,
  status_text,
}: ProfilePartial) => {
  await client
    .post(UserRoutes.writeProfile(), { profile: { status_emoji, status_text } })
    .then(function () {
      console.log(
        `Successfully updated status with: ${status_emoji} ${status_text}`,
      )
    })
    .catch(function (error) {
      console.error(error)
    })
}
