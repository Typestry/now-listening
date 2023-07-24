import { MusicProviders } from "../constants/musicProviders.js"

export type MusicProvider = (typeof MusicProviders)[keyof typeof MusicProviders]
