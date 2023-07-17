const BASE_URL = "https://slack.com/api"

export const UserRoutes = {
  writeProfile: () => `${BASE_URL}/users.profile.set` as const,
}

export const TestRoutes = {
  auth: () => `${BASE_URL}/auth.test` as const,
}
