import { rest } from "msw"
import { TestRoutes, UserRoutes } from "../../constants/api"

const updateStatusMock = rest.post(
  UserRoutes.writeProfile(),
  (_req, res, ctx) => {
    return res(ctx.status(200))
  },
)

const verifyAuth = rest.post(TestRoutes.auth(), (req, res, ctx) => {
  const token = req.headers.get("Authorization")
  console.log(token)
  let ok = false
  if (token === "Bearer test_token") {
    ok = true
  }
  return res(ctx.json({ ok }))
})

export const handlers = [updateStatusMock, verifyAuth]
