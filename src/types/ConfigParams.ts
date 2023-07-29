import { Emoji } from "./Emoji"
import { MusicProvider } from "./MusicProvider"

export type ConfigParams = {
  provider: MusicProvider
  token: string
  emoji: Emoji
}
