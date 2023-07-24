import { MusicProvider } from "../types/MusicProvider.js"
import { ProfilePartial } from "../types/ProfilePartial.js"

export const getStatusWindows = async (
  provider: MusicProvider,
): Promise<ProfilePartial> => {
  return { status_emoji: "", status_text: "" }
}
