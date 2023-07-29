import { Emojis } from "../constants/emojis"

export type Emoji = (typeof Emojis)[keyof typeof Emojis]
export type EmojiName = keyof typeof Emojis
