import { MusicProvider } from "./MusicProvider"
import { ProfilePartial } from "./ProfilePartial"

export type StatusGetter = (provider: MusicProvider) => Promise<ProfilePartial>
