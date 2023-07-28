import { rest } from "msw"
import { TestRoutes, UserRoutes } from "../../constants/api"
import { ProfilePartial } from "../../types/ProfilePartial"

const updateStatus = rest.post(
  UserRoutes.writeProfile(),
  async (req, res, ctx) => {
    const { profile }: { profile: ProfilePartial } = await req.json()

    if (profile.status_emoji && profile.status_text) {
      return res(ctx.status(200))
    } else {
      return res(ctx.status(500))
    }
  },
)

const verifyAuth = rest.post(TestRoutes.auth(), (req, res, ctx) => {
  const token = req.headers.get("Authorization")
  let ok = false
  if (token === "Bearer test_token") {
    ok = true
  }

  return res(ctx.json({ ok }))
})

export const handlers = [updateStatus, verifyAuth]
