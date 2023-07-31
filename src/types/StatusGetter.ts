import { Emoji } from "./Emoji"
import { MusicProvider } from "./MusicProvider"
import { ProfilePartial } from "./ProfilePartial"

export type StatusGetter = (
  provider: MusicProvider,
  emoji?: Emoji,
) => Promise<ProfilePartial | null>
