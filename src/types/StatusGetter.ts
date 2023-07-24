import { MusicProvider } from "./MusicProvider.js"
import { ProfilePartial } from "./ProfilePartial.js"

export type StatusGetter = (provider: MusicProvider) => Promise<ProfilePartial>
